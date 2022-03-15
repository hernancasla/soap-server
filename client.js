var soap = require('strong-soap').soap;
var WSDL = soap.WSDL;

//var url = 'http://www.dneonline.com/calculator.asmx?wsdl';
const service = 'CMM_SERVICES'
const serviceWsdl = `${service}wsdl`
var url = `http://0.0.0.1:15099/${service}?wsdl`;
// Pass in WSDL options if any

var options = {};
WSDL.open(url,options,
    function(err, wsdl) {
        // You should be able to get to any information of this WSDL from this object. Traverse
        // the WSDL tree to get  bindings, operations, services, portTypes, messages,
        // parts, and XSD elements/Attributes.

        // Set the wsdl object in the cache. The key (e.g. 'stockquotewsdl')
        // can be anything, but needs to match the parameter passed into soap.createClient()
        var clientOptions = {WSDL_CACHE : {}};
        clientOptions.WSDL_CACHE[serviceWsdl] = wsdl;
        soap.createClient(serviceWsdl, clientOptions, function(err, client) {
            console.log(client)
           var method = client[service]['CMM_SERVICES']['processPaymentMethodIntentionsPlay'];

            var requestArgs = {processPaymentMethodIntentionsPlayRequest:{arg1:1}};
            method(requestArgs, function(err, result, envelope, soapHeader) {

                //response envelope
                console.log('Response Envelope: \n' + envelope);
                //'result' is the response body
                console.log('Result: \n' + JSON.stringify(result));
            });
        });
    });
