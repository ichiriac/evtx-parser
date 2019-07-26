class Default {
  constructor(values) {
    this.ProviderName = values[14];
    this.Guid = values[15];
    this.EventId = values[3];
    this.Verson = values[11];
    this.Level = values[0];
    this.Task = values[2];
    this.Opcode = values[1];
    this.Keywords = values[4];
    this.TimeCreated = values[6];
    this.EventRecordId = values[10];
    this.ActivityId = values[7];
    this.ProcessId = values[8];
    this.ThreadId = values[9];
    this.Channel = values[16];
    this.UserId = values[12];
  }
}
Default.ctors = {};

Default.register = function(code, ctor) {
  Default.ctors[code] = ctor;
};

Default.load = function(data) {

    // extracting meta data
    let values = data.node.data.values;
    if (Default.ctors.hasOwnProperty(values[3])) {
      return new Default.ctors[values[3]](values);
    }
    return new Default(values);
}
module.exports = Default;

