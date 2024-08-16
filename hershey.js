/**
 * Copyright 2011 Marty McGuire https://martymcgui.re/
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
Hershey = function(fontName){
  scope = this;

  this.chars = [];
  this.data;
  this.fontName = fontName;

  this.initFont = function(){
    $.get('hershey/' + scope.fontName + '.jhf')
      .success(function(data){
        scope.data = data;
        scope.chars = scope.parse_hershey_data(data);
      })
      .error(function(data){
        scope.data = data;
        scope.chars = scope.parse_hershey_data(data.responseText);
      });
  }

  this.parse_glyph = function(data, num_points){
    var segments = [];
    var points = [];
    var orig_data = data;

    var wh = data.slice(0,2);
    data = data.slice(2,data.length);
    var min_x = wh.charCodeAt(0) - 'R'.charCodeAt(0);
    var max_x = wh.charCodeAt(1) - 'R'.charCodeAt(0);

    while(data){
      var xy = data.slice(0,2);
      data = data.slice(2,data.length);
      if(xy == null || xy == '')
        continue;

      if(xy == ' R'){
        segments.push(points);
        points = [];
      } else {
        x = xy.charCodeAt(0) - 'R'.charCodeAt(0);
        y = xy.charCodeAt(1) - 'R'.charCodeAt(0);
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

  this.parse_hershey_data = function(data){
    var glyphs = [];
    while(data){
      var id = data.slice(0,5);
      var num_points = data.slice(5,8);
      if(id == null || num_points == null)
        continue;

      id = 1*id;
      num_points = 1 * num_points;
      var to_read = 2 * num_points;
      if(num_points > 32)
        to_read += Math.ceil((num_points - 32) / 36);
      var points = data.slice(8, 8+to_read);
      var len = 9 + points.length;
      data = data.slice(len,data.length);
      points = points.replace(/[\n\r]/g,"");
      glyphs.push(scope.parse_glyph(points, num_points));
    }
    return glyphs;
  }

  this.glyphForChar = function(ascchr){
    return scope.chars[ascchr.charCodeAt(0) - 32];
  }

  this.pathForChar = function(ascchr){
    var glyph = scope.glyphForChar(ascchr);
    var pathstr = '';
    var sep = '';
    if(glyph !== undefined){
      $(glyph['paths']).each(function(j,seg){
       pathstr += sep + scope.pathForSegment(seg);
       sep = ' ';
     });
    }
    return pathstr;
  }

  this.pathForSegment = function(seg){
    var segstr = '';
    if(seg.length == 0)
      return segstr;
    var orig = seg[0];
    segstr += 'M ' + orig[0] + ' ' + orig[1];
    var tseg = seg.slice(1, seg.length);
    $(tseg).each(function(k, pt){
      segstr += ' L ' + pt[0] + ' ' + pt[1];
    });
    return segstr;
  }

  this.boundsForChar = function(ascchr){
    var glyph = scope.glyphForChar(ascchr);
    if(glyph === undefined)
      return {'left': 0, 'right': 0};

    var left = glyph.bounds[0];
    var right = glyph.bounds[1];
    return {'left': left, 'right': right};
  }

  this.heightForChar = function(ascchr){
    var min_y = 0;
    var max_y = 0;
    var glyph = scope.glyphForChar(ascchr);
    if(glyph === undefined)
      return 0;

    $(glyph['paths']).each(function(j,seg){
      if(seg.length != 0){
        $(seg).each(function(k, pt){
          var y = pt[1];
          if(y > max_y)
            max_y = y;
          else if(y < min_y)
            min_y = y;
        });
      }
    });

    return max_y - min_y;
  }


  /**
   * Array of Path hashes:
   * [ {'translate': [x,y], 'segments': [[[x,y],...], ...] }
   */
  this.pathValuesForText = function(text){
    var w = 0;
    var paths = [];
    for(var i = 0; i < text.length; i++){
      var ascchr = text.charAt(i);
      var path = { 'segments': scope.pathValuesForChar(ascchr) };
      var bounds = scope.boundsForChar(ascchr);
      w += Math.abs(bounds.left);
      if(w > 0){
        path['translate'] = [w,0]
      }
      if(path.segments != [])
        paths.push(path);
      w += bounds.right;
    }
    return paths;
  }

  this.pathValuesForChar = function(ascchr){
    var glyph = scope.glyphForChar(ascchr);
    var segments = [];
    if(glyph !== undefined){
      segments = $(glyph['paths'])
    }
    return segments;
  }

  /**
   * Array of Path hashes:
   * [ { 'transform': 'translate(x,y)', 'd': '...' } ]
   */
  this.pathsForText = function(text){
    var w = 0;
    var paths = [];
    for(var i = 0; i < text.length; i++){
      var ascchr = text.charAt(i);
      var path = { 'd': scope.pathForChar(ascchr) };
      var bounds = scope.boundsForChar(ascchr);
      w += Math.abs(bounds.left);
      if(w > 0){
        path['translate'] = [w,0];
      }
      if(path.d !== '')
        paths.push(path);
      w += bounds.right;
    }
    return paths;
  }

  /**
   * TODO: Ugh, clean this up!
   * { 'w': ..., 'h': ... }
   */
  this.boundsForText = function(text){
    var w = 0;
    var h = 0;
    for(var i = 0; i < text.length; i++){
      var ascchr = text[i];
      var bounds = scope.boundsForChar(ascchr);
      var height = scope.heightForChar(ascchr);
      w += Math.abs(bounds.left) + bounds.right;
      if(height > h)
        h = height;
    }
    return {'w': w, 'h': h};
  }
}
