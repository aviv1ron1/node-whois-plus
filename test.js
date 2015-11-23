var Readly = require("readly");
var whois = require('./index.js');
var fs = require('fs');

var reader = new Readly("test.txt");

var wstream = fs.createWriteStream('test.out.txt');

var counter = 0;

var dic = {};
var done = 0;
reader.on('line', function(line) {
    console.log(line);
    var idx = counter++;
    whois.whois(line, function(err, data) {
        if (err) {
            console.error(line, err);
            dic[idx] = line + ": error\n";
        } else {
            if (data) {
                var r = "none";
                if (data.sponsorRegistrar) {
                    r = data.sponsorRegistrar;
                } else if (data.registrar) {
                    r = data.registrar;
                }
                dic[idx] = line + ": " + r + "\n";
            } else {
                dic[idx] = line + ": none\n";
            }
        }
        done++;
    });
});

var finish = function() {
    if (done < counter) {
        setTimeout(finish, 100);
    } else {
        for (var i = 0; i < counter; i++) {
            wstream.write(dic[i]);
        }
        wstream.end();
    }
}

reader.on('end', function() {
    finish();
});

reader.read();
