const Xml = require('./xml');
class Event {
  constructor(file, chunk) {
    // signature
    file.assertString('**\0\0');
    this.size = file.readInt(4);
    this.id = file.readInt(8);
    this.date = file.readInt(8);
    this.contents = new Xml(file.readBuffer(this.size - 24), chunk);
  }
}

module.exports = Event;