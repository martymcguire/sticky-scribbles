/**
 * Quick and dirty helper for making SVG elements
 */
const svg = {
  group: function(parentElem, attrs) {
    return this.createElement('g', parentElem, attrs);
  },

  path: function(parentElem, attrs) {
    return this.createElement('path', parentElem, attrs);
  },

  createElement: function(name, parentElem, attrs) {
    const ns = "http://www.w3.org/2000/svg"
    const el = document.createElementNS(ns, name);
    for (const attr in attrs) {
      el.setAttribute(attr, attrs[attr]);
    }
    parentElem.appendChild(el);
    return el;
  }
}

export { svg };
