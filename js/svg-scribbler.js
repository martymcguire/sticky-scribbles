import {svg} from './svgHelper.js';

customElements.define('svg-scribbler', class extends HTMLElement
  {
    connectedCallback () {
      this.eventSource = document.querySelector(this.attributes['event-source'].value);
      this.outputTarget = document.querySelector(this.attributes['output-target'].value);
      if (this.eventSource === null || this.outputTarget === null) { return; }

      this.currentPath = null;
      this.pointerDown = false;
      this.thisScribble = null;

      this.eventSource.addEventListener('pointerdown', this);
      this.eventSource.addEventListener('pointerup', this);
      this.eventSource.addEventListener('pointermove', this);
    }

    handleEvent (evt) {
      switch(evt.type) {
        case 'pointerdown':
          this.drawStart(evt);
          break;
        case 'pointerup':
          this.drawEnd(evt);
          break;
        case 'pointermove':
          this.drawMove(event);
          break;
      }
    }

    drawStart (evt) {
      evt.preventDefault();

      this.pointerDown = true;
      this.thisScribble = [];

      this.currentPath = svg.path(this.outputTarget, { d: "" });
    }

    drawEnd (evt) {
      evt.preventDefault();

      this.pointerDown = false;
      this.currentPath = null;
    }

    drawMove (evt) {
      evt.preventDefault();
      if(this.pointerDown){
        // need to transform new point's coordinate into drawing space.
        // (the inverse of the transform displayed over the sticky note)
        // https://stackoverflow.com/a/33579846
        // https://stackoverflow.com/a/64984121
        const svgElem = this.eventSource;
        const wrapper = svgElem.children[0];

        // get current transformation matrix
        const matrix = wrapper.getCTM();
        const p = svgElem.createSVGPoint();
        p.x = evt.offsetX;
        p.y = evt.offsetY;
        const newp = p.matrixTransform(matrix.inverse());

        this.thisScribble.push([newp.x.toFixed(3), newp.y.toFixed(3)]);
        this.currentPath.setAttribute('d', this.pathForScribble(this.thisScribble));
      }
    }

    pathForScribble (scribble) {
      var sep = "";
      var segstr = "";
      if(scribble && (scribble.length > 0)){
        var orig = scribble[0];
        segstr += sep + "M " + orig[0] + " " + orig[1];
        var tscrib = scribble.slice(1,scribble.length);
        tscrib.forEach(function(pt){
          segstr += " L " + pt[0] + " " + pt[1];
        });
        sep = " ";
      }
      return segstr;
    }
  }
);
