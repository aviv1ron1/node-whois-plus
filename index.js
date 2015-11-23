var w = require('whois');

var setAttr = function(obj, data, key, expr) {
    var match = expr.exec(data);
    if (match && match[1]) {
        obj[key] = match[1].replace(/\n/g, "");
    } else {
        obj[key] = null;
    }
}

exports.whois = function(domain, callback) {
    w.lookup(domain, function(err, data) {
        if (err) {
            callback(err);
        } else {
            if (data == "No Data Found") {
                callback();
            } else {
                try {
                    var whoisObj = {};
                    setAttr(whoisObj, data, "sponsorRegistrar", /^Sponsoring Registrar: ((\w+[\s\.\,]*)+)\n/gm);
                    setAttr(whoisObj, data, "registrar", /^Registrar: ((\w+[\s\.\,]*)+)\n/gm);
                    callback(null, whoisObj);
                } catch (err) {
                    callback(err);
                }
            }
        }
    });
}
