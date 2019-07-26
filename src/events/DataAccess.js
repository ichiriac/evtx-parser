const Default = require('./Default');
class DataAccess extends Default {
  constructor(values) {
    super(values);
    let details = values[17];
    if (details) {
      if (!details.node) {
        this.details = {};
        return;
      }
      details = details.node.data.values;
    }
    this.details = {
      SecurityID: details[0],
      AccountName: details[1],
      AccountDomain: details[2],
      LogonID: details[3],
      ObjectServer: details[4],
      ObjectType: details[5],
      ObjectName: details[6],
      HandleID: details[7],
      AccessMask: details[9],
      ResourceAttribute: details[12]
    };
  }
}
Default.register(4663, DataAccess);