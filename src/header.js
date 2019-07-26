class Header {
  constructor(file) {
    this._file = file;
    file.offset(0);
    file.assertString('ElfFile\0');
    this.firstChunk = file.readInt(8);
    this.lastChunk = file.readInt(8);
    this.nextIndex = file.readInt(8);
    file.assertInt(128, 4);

    this.versionMin = file.readInt(2);
    this.versionMaj = file.readInt(2);
    this.version = this.versionMaj + '.' + this.versionMin;
    if (this.version !== '3.1') {
      throw new Error('Bad file version (expected 3.1, but found ' + this.version + ')');
    }
    this.size = file.readInt(2);
    this.chunkCount = file.readInt(2);
    file.move(76);
    this.fileFlag = file.readInt(4);
    this.crc32 = file.readInt(4);
  }
}

module.exports = Header;