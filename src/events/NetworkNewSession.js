const Default = require('./Default');
class NetworkNewSession extends Default {
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
      LogonID: details[3]
    };

  }
}
Default.register(4624, NetworkNewSession);