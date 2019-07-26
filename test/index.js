const file = require('../src/file');
let start = (new Date()).getTime();
const doc = new file(__dirname + '/sample.evtx');
for(var i = 0; i < doc.size(); i++) {
  let dataset = doc.chunk(i);
}
let end = (new Date()).getTime();
console.log('Found ' + doc.size() + ' chunks');
for(var i = 0; i < doc.size(); i++) {
  let dataset = doc.chunk(i);
  console.log('Found ' + dataset.size() + ' events in chunk ' + i);
  dataset.forEach(function(evt) {
    console.log(' - #'+ evt.data.EventId +' @' + evt.date + ' / ' + evt.id);
    let details = evt.data.details;
    if (details) {
      console.log(evt.data.constructor.name, details);
    }
  });
}
console.log('done in ' + (end - start) + ' ms');
