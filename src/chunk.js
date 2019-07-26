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
    this.firstEvent = file.readUInt(8);
    this.lastEvent = file.readUInt(8);
    this.firstEventId = file.readUInt(8);
    this.lastEventId = file.readUInt(8);
    this.headerSize = file.readUInt(4);
    this.lastEventOffset = file.readUInt(4);
    this.freeSpace = file.readUInt(4);
    this.eventCRC32 = file.readUInt(4);
    file.move(68);
    this.CRC32 = file.readUInt(4);
    this.keys = [];
    this.templatePtr = [];
    for(var i = 0; i < 64; i++) {
      this.keys.push(file.readUInt(4));
    }
    for(var i = 0; i < 32; i++) {
      this.templatePtr.push(file.readUInt(4));
    }

    // start of events
    file.offset(this._offset + 512);
    while(true) {
      let evt = new Event(file, this);
      this._events.push(evt);
      if (evt.id == this.lastEventId) break;
    }
  }
  size() {
    return this._events.length;
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