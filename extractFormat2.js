const { options } = require('request');
const { getMethod, getElementBy } = require('./util');

function extractFormat2(text) {
    let aryLine = text.split('\n');
    let requests = [];
    let options = {};

    aryLine.forEach(_ => {


        objRequest = getElementBy('Request message:', _);

        if (objRequest) {
            objRequest = JSON.parse(objRequest);
            options.url = objRequest.RequestUri;
            options.method = objRequest.Method.Method;
            options.headers = {}
            objRequest.Headers.forEach(item => {
                options.headers[item.Key] = item.Value[0]
            })

            requests.push(options);
        }
        
    });

    return requests;
}

module.exports = extractFormat2;