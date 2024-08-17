import {svg} from './svgHelper.js';
customElements.define('svg-hersheytext', class extends HTMLElement
  {

    constructor () {
      super();

      this.line_height = 35; // 🪄✨ magic number?
      this.font = null;

      window.addEventListener('HersheyFont:updated', this);
    }

    connectedCallback () {
      this.eventSource = document.querySelector(this.attributes['event-source'].value);
      this.outputTarget = document.querySelector(this.attributes['output-target'].value);
      this.max_w = this.attributes['width'].value;
      this.max_h = this.attributes['height'].value;
      if (
        this.eventSource === null ||
        this.outputTarget === null ||
        this.max_w === null ||
        this.max_h === null
      ) { return; }

      this.eventSource.addEventListener('keyup', this);
    }

    handleEvent (evt) {
      switch(evt.type) {
        case 'HersheyFont:updated':
          this.font = evt.detail;
          break;
      }
      this.displayTextboxContent();
    }

    displayTextboxContent(){
      const scale = 1.0;

      // First, split long lines.
      const lines = this.eventSource.value.split('\n');
      const wrapped_lines = this.wrapLines(lines, this.max_w, this.max_h, scale);

      const textgrp = this.outputTarget;
      textgrp.innerHTML = '';
      textgrp.setAttribute('transform','scale(' + wrapped_lines.scale + ')');

      for(let i = 0; i < wrapped_lines.lines.length; i++){
        this.displayText(textgrp, wrapped_lines.lines[i], 5, (this.line_height / 2) + (this.line_height * i));
      }
    }

    wrapLines(lines, max_w, max_h, scale){
      // TODO: split on last char if unbroken by whitespace.
      let wrapped_lines = [];
      let done = false;

      while(!done){
        const scaled_h = max_h / scale;
        const scaled_w = max_w / scale;
        for(let i = 0; i < lines.length; i++){
          const line = lines[i];
          let newline = "";
          let line_w = 0;
          let sep = "";
          const words = line.split(' '); // TODO: on any whitespace
          for(let j = 0; j < words.length; j++){
            const word = words[j];
            const w = this.font.boundsForText(word).w;
            const sep_w = this.font.boundsForText(sep).w;
            const new_w = line_w + sep_w + w;
            if(new_w < scaled_w){
              newline += sep + word;
              line_w += sep_w + w;
              sep = " ";
            } else {
              wrapped_lines.push(newline);
              newline = word;
              line_w = w;
            }
          }
          if(newline != "") {
            wrapped_lines.push(newline);
          }
        }
        if(wrapped_lines.length * this.line_height > scaled_h){
          scale *= 0.9;
          wrapped_lines = [];
        } else {
          done = true;
        }
      }
      return {'lines':wrapped_lines, 'scale':scale};
    }

    displayText(grp,text,x,y) {
      const paths = this.font.pathsForText(text);
      const tg = svg.group(grp, {'transform': 'translate(' + x + ',' + y + ')'});
      paths.forEach(function(path){
        if(path.d != []){
          const attrs = { d: path.d };
          if(path.translate !== undefined) {
            attrs['transform'] = 'translate(' + path.translate[0] + ',' + path.translate[1] + ')';
          }
          svg.path(tg, attrs);
        }
      });
    }

  }
);
