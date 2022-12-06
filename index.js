const fs = require('fs');

const { fetchToCurl } = require("fetch-to-curl")
const extractFormat1 = require('./extractFormat1');
const extractFormat2 = require('./extractFormat2');


(async () => {
  let text = await fs.readFileSync('./input.log', 'utf-8');


  let requests = [];

  requests = extractFormat1(text);
  requests = requests.concat(extractFormat2(text));
  // requests = [... extractFormat2(text)];
  // requests = [... extractFormat3(_)];


  console.log(requests.length);

  for (let options of requests) {

    // console.log(options)
    console.log(fetchToCurl(options));

  }

})()
