const file = require('../src/file');
let start = (new Date()).getTime();
//const filename = __dirname + '/sample.evtx';
const filename = 'c:\\Windows\\System32\\Winevt\\Logs\\Security.evtx';
const doc = new file(filename);
for(var i = 0; i < doc.size(); i++) {
  let dataset = doc.chunk(i);
}
let end = (new Date()).getTime();
console.log('Found ' + doc.size() + ' chunks');
let evtCount = 0;
for(var i = 0; i < doc.size(); i++) {
  let dataset = doc.chunk(i);
  console.log('Found ' + dataset.size() + ' events in chunk ' + i);
  dataset.forEach(function(evt) {
    evtCount ++;
    // console.log(' - #'+ evt.data.EventId +' @' + evt.date + ' / ' + evt.id);
    let details = evt.data.details;
    if (details) {
      // console.log(evt.data.constructor.name, details);
    }
  });
}
console.log('done '+evtCount+' events in ' + (end - start) + ' ms');
