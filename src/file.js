const header = require('./header');
const chunk = require('./chunk');
const Reader = require('./reader');
const readFileSync = require('fs').readFileSync;

class File extends Reader {

  constructor(name) {
    super(null);
    this._name = name;
    this.refresh();
  }

  refresh() {
    this._buffer = readFileSync(this._name);
    this._position = 0;
    this._header = null;
    this._chunks = [];
    return this;
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