class Reader {
  constructor(buffer) {
    this._buffer = buffer;
    this._position = 0;
  }
  move(offset) {
    this._position += offset;
    return this;
  }

  offset(offset) {
    this._position = offset;
    return this;
  }

  readString(size) {
    var result = this._buffer.toString(
      'UTF-8',
      this._position,
      this._position + size
    )
    this._position += size;
    return result;
  }
  readString16(size) {
    var result = this._buffer.toString(
      'utf16le',
      this._position,
      this._position + size * 2
    )
    this._position += size * 2;
    return result;
  }  

  readBuffer(size) {
    var result = this._buffer.slice(
      this._position,
      this._position + size
    )
    this._position += size;
    return result;
  }

  getReader(size) {
    var result = this._buffer.slice(
      this._position,
      this._position + size
    )
    this._position += size;
    return new Reader(result);
  }


  assertString(value) {
    var result = this.readString(value.length);
    if (result !== value) {
      throw new Error('Invalid data, expected ' + encodeURIComponent(value) + ' but found ' + encodeURIComponent(result) + ' at offset ' + (this._position - value.length));
    }
    return this;
  }

  readInt(size) {
    var result = 0;
    switch(size) {
      case 1:
        result = this._buffer.readInt8(this._position);
        break;      
      case 2:
        result = this._buffer.readInt16LE(this._position);
        break;
      case 4:
        result = this._buffer.readInt32LE(this._position);
        break;
      case 8:
        result = this._buffer.readBigInt64LE(this._position);
        break;    
    }
    this._position += size;
    return result;
  }

  readUInt(size) {
    var result = 0;
    switch(size) {
      case 1:
        result = this._buffer.readUInt8(this._position);
        break;      
      case 2:
        result = this._buffer.readUInt16LE(this._position);
        break;
      case 4:
        result = this._buffer.readUInt32LE(this._position);
        break;
      case 8:
        result = this._buffer.readBigUInt64LE(this._position);
        break;    
    }
    this._position += size;
    return result;
  }

  assertInt(value, size = 4) {
    var result = this.readInt(size);
    if (result !== value) {
      throw new Error('Invalid data, expected ' + value + ' but found ' + result + ' at offset ' + (this._position - size));
    }
    return this;
  }

  assertUInt(value, size = 4) {
    var result = this.readUInt(size);
    if (result !== value) {
      throw new Error('Invalid data, expected ' + value + ' but found ' + result + ' at offset ' + (this._position - size));
    }
    return this;
  }  

}

module.exports = Reader;