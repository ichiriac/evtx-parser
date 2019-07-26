const Xml = require('binxml-parser');
const EventData = require('./events/index');

class Event {
  constructor(file, chunk) {
    // signature
    file.assertString('**\0\0');
    
    // size
    this.size = file.readUInt(4);
    
    // event id
    this.id = file.readUInt(8);

    // extract date
    let time = Number(file.readUInt(8));
    var ms = ( time / 10000 ) % 86400000;
    var day = time / 864000000000 - 109207;
    this.date = new Date( 1900, 1, 1 );
    this.date.setMilliseconds( ms );
    this.date.setDate( day );    
    // reads its data
    this.contents = new Xml(
      file.readBuffer(this.size - 24), chunk
    );
    this.data = EventData.load(this.contents);
  }
}

module.exports = Event;