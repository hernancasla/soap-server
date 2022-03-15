var soap = require('strong-soap').soap;
var http = require('http');
var fs = require('fs');
//send JSON response for stockquote service for GetQuote operation
var test = {};
test.server = null;
test.service = {
    Calculator: {
        CalculatorSoap: {
            Add: function (args, cb, soapHeader) {
                console.log(args)
                return {AddResponse: {AddResult: args.intA * args.intB}};
            }
        }
    }
};

//get the WSDL from http://www.webservicex.net/stockquote.asmx?WSDL and save onto current
//directory as stockquote.wsdl
//Below code shows how to create a mock up soap server for stockquote wsdl
fs.readFile('/Users/osvaldoceballos/WebstormProjects/soap-server/examples/calculator.xml', 'utf8', function (err, data) {
    test.wsdl = data;
    test.server = http.createServer(function (req, res) {
        res.statusCode = 404;
        res.end();
    });

    test.server.listen(15099, null, null, function () {
        test.soapServer = soap.listen(test.server, '/calculator', test.service, test.wsdl);
        test.baseUrl = 'http://' + test.server.address().address + ":" + test.server.address().port;
        if (test.server.address().address === '0.0.0.0' || test.server.address().address === '::')
        {
            test.baseUrl ='http://127.0.0.1:' + test.server.address().port;
        }
        //use this URL on the client side to invoke this local web service.
        //For e.g //http://127.0.0.1:15099/stockquote?wsdl
        console.log(test.baseUrl);
    });
})