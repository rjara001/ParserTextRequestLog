const { options } = require('request');
const { getMethod, getElementBy } = require('./util');

function extractFormat1(text) {
    let aryLine = text.split('\n');
    let requests = [];
    let options = {};

    aryLine.forEach(_ => {

        let Auth = '';
        if (!options.method)
            options.method = getMethod(_);

        if (!options.url)
            options.url = getElementBy('Uri:', _)?.trim();

        if (!options.body)
            options.body = getElementBy('parameters:', _);

        if (!options.headers) {
            let temp = getElementBy('Headers:', _);

            options.headers = temp?.trim();
            if (options.headers)
                options.headers = JSON.parse(options.headers);
        }

        if (!options.Authorization)
            if (options.headers) {
                Auth = getElementBy('Authorization:', _, false);
                if (Auth)
                    options.headers['Authorization'] = getElementBy('Authorization:', _, false);
            }

        if (Auth) {
            requests.push(options);
            options = {};
        }
    });

    return requests;
  }

module.exports = extractFormat1;