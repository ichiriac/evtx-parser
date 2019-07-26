const header = require('./header');
const chunk = require('./chunk');
const Reader = require('./reader');
const fs = require('fs');
const child_process = require('child_process');

class File extends Reader {

  constructor(name) {
    super(null);
    this._name = name;
    this.refresh();
  }

  refresh() {
    /*let stat = fs.statSync(this._name);
    if (this._header) {
      // check for changes
      if (
        stat.atimeMs == this._stat.atimeMs
        && stat.mtimeMs == this._stat.mtimeMs
        && stat.ctimeMs == this._stat.ctimeMs
      ) return false;
    } 
    this._stat = stat;*/
    //const target = __dirname + '\\cache' + (new Date()).getTime() + '.evtx';
    //child_process.execSync('copy /B /Y ' + this._name + ' ' + target );
    this._buffer = fs.readFileSync(this._name, {"flag": 0 | 0x08000000 | 0x02000000 });
    // fs.unlinkSync(target);
    this._position = 0;
    this._header = null;
    this._chunks = [];   
    return true;
  }

  header() {
    if (!this._header) {
      this._header = new header(this);
    }
    return this._header;
  }
  size() {
    if (this.header().fileFlag == 1) {
      // file is dirty
      for(let i = this.header().chunkCount; i < 99999; i++) {
        try {
          this.chunk(i);
        } catch(e) {
          this.header().chunkCount = i;
          break;
        }
      }
    }
    return this.header().chunkCount;
  }
  chunk(index = 0) {
    if (this._chunks.length <= index) {
      this._chunks[index] = new chunk(this, index);
    }
    if (!this._chunks[index]) {
      this._chunks[index] = new chunk(this, index);
    }
    return this._chunks[index];
  }
}

module.exports = File;