var soap = require('strong-soap').soap;
var WSDL = soap.WSDL;

//var url = 'http://www.dneonline.com/calculator.asmx?wsdl';
var url = 'http://127.0.0.1:15099/calculator?wsdl';
// Pass in WSDL options if any

var options = {};
WSDL.open(url,options,
    function(err, wsdl) {
        // You should be able to get to any information of this WSDL from this object. Traverse
        // the WSDL tree to get  bindings, operations, services, portTypes, messages,
        // parts, and XSD elements/Attributes.

        // Set the wsdl object in the cache. The key (e.g. 'stockquotewsdl')
        // can be anything, but needs to match the parameter passed into soap.createClient()
        var clientOptions = {
            WSDL_CACHE : {
                calculatorwsdl: wsdl
            }
        };
        soap.createClient('calculatorwsdl', clientOptions, function(err, client) {
           var method = client['Calculator']['CalculatorSoap']['Add'];
            //var method = client['CMM_SERVICES']['CMM_SERVICES']['see'];

            var requestArgs = {intA:5,intB:2};
            method(requestArgs, function(err, result, envelope, soapHeader) {

                //response envelope
                console.log('Response Envelope: \n' + envelope);
                //'result' is the response body
                console.log('Result: \n' + JSON.stringify(result));
            });
        });
    });
