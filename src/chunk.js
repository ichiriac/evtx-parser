const Event = require('./event');

class Chunk {
  constructor(file, index) {
    this._file = file;
    this._index = index;
    this._offset = this._file.header().size;
    this._offset += index * 65536;
    this._events = [];
    this._evtIndex = 0;
    file.offset(this._offset);
    file.assertString('ElfChnk\0');
    this.firstEvent = file.readInt(8);
    this.lastEvent = file.readInt(8);
    this.firstEventId = file.readInt(8);
    this.lastEventId = file.readInt(8);
    this.headerSize = file.readInt(4);
    this.lastEventOffset = file.readInt(4);
    this.freeSpace = file.readInt(4);
    this.eventCRC32 = file.readInt(4);
    file.move(68);
    this.CRC32 = file.readInt(4);
    this.keys = [];
    this.templatePtr = [];
    for(var i = 0; i < 64; i++) {
      this.keys.push(file.readInt(4));
    }
    for(var i = 0; i < 32; i++) {
      this.templatePtr.push(file.readInt(4));
    }

    // start of events
    file.offset(this._offset + 512);
    while(true) {
      let evt = new Event(file, this);
      this._events.push(evt);
      if (evt.id == this.lastEventId) break;
    }
    this.size = this._events.length;
  }
  next() {
    if (this._evtIndex < this._events.length - 1) {
      return this._events[++this._evtIndex];
    }
    return null;
  }
  rewind() {
    this._evtIndex = -1;
  }
  forEach(cb) {
    return this._events.forEach(cb);
  }
}

module.exports = Chunk;