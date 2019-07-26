class Header {
  constructor(file) {
    this._file = file;
    file.offset(0);
    file.assertString('ElfFile\0');
    this.firstChunk = file.readUInt(8);
    this.lastChunk = file.readUInt(8);
    this.nextIndex = file.readUInt(8);
    file.assertUInt(128, 4);

    this.versionMin = file.readUInt(2);
    this.versionMaj = file.readUInt(2);
    this.version = this.versionMaj + '.' + this.versionMin;
    if (this.version !== '3.1') {
      throw new Error('Bad file version (expected 3.1, but found ' + this.version + ')');
    }
    this.size = file.readUInt(2);
    this.chunkCount = file.readUInt(2);
    file.move(76);
    this.fileFlag = file.readUInt(4);
    this.crc32 = file.readUInt(4);
  }
}

module.exports = Header;