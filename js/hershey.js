/**
 * Copyright 2024 Marty McGuire https://martymcgui.re/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @module hershey */

/** Class representing a Hershey vector font */
export default class Hershey
{

  constructor()
  {
    this.chars = [];
    this.data = [];
  }

  /**
   * @async
   * @param {string} fontPath - URL or path to .jhf file
   * @return {Promise<Hershey>}
   */
  async loadFont(fontPath)
  {
    try {
      const response = await fetch(fontPath);
      const data = await response.text();
      this.data = data;
      this.chars = this.parse_hershey_data(data);
    } catch (err) {
      console.log(err);
    }
    return this;
  }

  /**
   * Extract glyph path data, bounds, etc.
   * @param {string} data
   * @param {number} number of points expected
   * @return {object}
   */
  parse_glyph(data, num_points)
  {
    const segments = [];
    let points = [];
    const orig_data = data;

    const wh = data.slice(0,2);
    data = data.slice(2,data.length);

    const min_x = wh.charCodeAt(0) - 'R'.charCodeAt(0);
    const max_x = wh.charCodeAt(1) - 'R'.charCodeAt(0);

    while(data)
    {
      const xy = data.slice(0,2);
      data = data.slice(2,data.length);
      if(xy == null || xy == '')
      {
        continue;
      }

      if(xy == ' R')
      {
        segments.push(points);
        points = [];
      } else {
        const x = xy.charCodeAt(0) - 'R'.charCodeAt(0);
        const y = xy.charCodeAt(1) - 'R'.charCodeAt(0);
        points.push([x,y]);
      }
    }
    segments.push(points);

    return {
      'paths': segments,
      'bounds': [min_x,max_x],
      'num_points': num_points,
      'data': orig_data
    };
  }

  /**
   * Parse the contents of a .jhf file.
   * @param {string} data - JHF file body
   * @return {Array<object>} glyph data as returned by parse_glyph
   */
  parse_hershey_data(data)
  {
    const glyphs = [];

    while(data){
      const id = data.slice(0,5);
      const num_points = data.slice(5,8);
      if(id == null || num_points == null){ continue; }

      let to_read = 2 * num_points;
      if(num_points > 32)
      {
        to_read += Math.ceil((num_points - 32) / 36);
      }

      let points = data.slice(8, 8 + to_read);
      const len = 9 + points.length;
      data = data.slice(len, data.length);
      points = points.replace(/[\n\r]/g, "");

      glyphs.push(this.parse_glyph(points, num_points));
    }
    return glyphs;
  }

  /**
   * Using a naive mapping of this font's glyphs to ASCII characters,
   * return the glyph info for a given ASCII char.
   * @param {string} ascchr - Single ASCII character.
   * @return {object} with e.g. `{ 'paths': [ ... ] }`
   */
  glyphForChar(ascchr)
  {
    return this.chars[ascchr.charCodeAt(0) - 32];
  }

  /**
   * @param {string} ascchr - Single ASCII character
   * @return {string} SVG path syntax representation of the glyph
   */
  pathForChar(ascchr)
  {
    const glyph = this.glyphForChar(ascchr);
    let pathstr = '';
    let sep = '';
    if(glyph === undefined) { return pathstr; }

    for(const seg of glyph['paths'])
    {
      pathstr += sep + this.pathForSegment(seg);
      sep = ' ';
    }
    return pathstr;
  }

  /**
   * @param {Array<Array>} seg - an array of 2D points as `[[x0,y0],...]`.
   * @return {string} SVG path syntax representation.
   */
  pathForSegment(seg)
  {
    let segstr = '';
    if(seg.length == 0){ return segstr; }

    const orig = seg[0];
    segstr += 'M ' + orig[0] + ' ' + orig[1];

    const tseg = seg.slice(1, seg.length);
    for(const pt of tseg) {
      segstr += ' L ' + pt[0] + ' ' + pt[1];
    }

    return segstr;
  }

  /**
   * Return the glyph's horizontal bounds for a given character.
   * @param {string} ascchr - Single ASCII character
   * @return {object} `{'left': left, 'right': right}`
   */
  boundsForChar(ascchr)
  {
    const glyph = this.glyphForChar(ascchr);
    if(glyph === undefined) { return {'left': 0, 'right': 0}; }

    const left = glyph.bounds[0];
    const right = glyph.bounds[1];
    return {left, right};
  }

  /**
   * Return the glyph height for a given character.
   * @param {string} ascchr - Single ASCII character
   * @return {number} glyph height
   */
  heightForChar(ascchr){
    let min_y = 0;
    let max_y = 0;
    const glyph = this.glyphForChar(ascchr);
    if(glyph === undefined){ return 0; }

    for(const seg of glyph['paths']) {
      if(seg.length != 0) {
        for(const pt of seg) {
          var y = pt[1];
          if(y > max_y) {
            max_y = y;
          } else if(y < min_y) {
            min_y = y;
          }
        }
      }
    }

    return max_y - min_y;
  }

  /**
   * Given a string, return the attributes needed for SVG `<path>` elements.
   * @param {string} text - Text for which to compute paths.
   * @return {Array<object>} array of path object attributes:
   * `[ { 'transform': 'translate(x,y)', 'd': '...' } ]`
   */
  pathsForText(text)
  {
    let w = 0;
    const paths = [];
    for(let i = 0; i < text.length; i++)
    {
      const ascchr = text.charAt(i);
      const path = { 'd': this.pathForChar(ascchr) };
      const bounds = this.boundsForChar(ascchr);
      w += Math.abs(bounds.left);
      if(w > 0){
        path['translate'] = [w,0];
      }
      if(path.d !== ''){
        paths.push(path);
      }
      w += bounds.right;
    }
    return paths;
  }

  /**
   * Given a string, compute the 2D bounding box.
   * @param {string} text - Text for which to compute bounds.
   * @return {object} of the form `{ 'w': ..., 'h': ... }`
   */
  boundsForText(text){
    let w = 0;
    let h = 0;
    for(let i = 0; i < text.length; i++)
    {
      const ascchr = text[i];
      const bounds = this.boundsForChar(ascchr);
      const height = this.heightForChar(ascchr);
      w += Math.abs(bounds.left) + bounds.right;
      if(height > h){
        h = height;
      }
    }
    return {'w': w, 'h': h};
  }
}
