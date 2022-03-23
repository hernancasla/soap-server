var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    xmlparser = require('express-xml-bodyparser'),
    path = require('path'),
    fs = require("fs");

// .. other middleware ...
app.use(express.json());
app.use(express.urlencoded());
app.use(xmlparser());
//joining path of directory
const directoryPath = path.join(__dirname, 'responses');
var responseFiles = [];
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file);
        let key = file.replace(/\.[^/.]+$/, "");
        responseFiles[key] = path.join(directoryPath,file);
    });
});
app.post('/', function(req, res, next) {

    // req.body contains the parsed xml
    console.log(req.body)

    let searchServiceId = (key) => {
        let result = searchObj(req.body, key);
        return result[0]?result[0][key][0]:undefined;
    }
    let serviceId = searchServiceId('serviceid');
    console.log(`results: ${serviceId}`)
    if(responseFiles[serviceId]){
        fs.readFile(responseFiles[serviceId], 'utf8', function (err, data) {
            res.send(data);
        })
    } else {
        res.status(404).send('<error>error</error>');
    }
});
function searchObj(obj, key) {
    if (obj.hasOwnProperty(key)) // or just (key in obj)
        return [obj];
    var res = [];
    Object.entries(obj).forEach(([k, value]) => {
        if (typeof value == "object" && (value = searchObj(value, key)).length)
            res.push.apply(res, value);
    });
    return res;
}
server.listen(1337);
