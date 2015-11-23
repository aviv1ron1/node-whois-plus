# node-whois-plus
obtain whois information using whois module and parse the returned value into an object

## usage:
```javascript
var whois = require('node-whois-plus');
whois.whois("google.com", function(err, data) {
  if(err) {
    console.error(err);
  } else {
    console.log(data);
  }
});
