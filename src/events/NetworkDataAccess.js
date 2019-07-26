const Default = require('./Default');
class NetworkDataAccess extends Default {
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
      PortSource: details[6],
      ShareName: details[7],
      AccessMask: details[9]
    };
    if (details.length > 11) {
      this.details.ShareFolder = details[8];
      this.details.ShareFile = details[9];
      this.details.AccessMask = details[10];
    }
  }
}
Default.register(5140, NetworkDataAccess);
Default.register(5145, NetworkDataAccess);