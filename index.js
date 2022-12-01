let text = 'HB Request Verb: POST Uri: https:\/\/abkt02.azure-api.net\/api-login\/tokenjwt\/4129299 \nHB Body parameters: {\"jurisdiction\":\"AND\",\"language\":\"es\",\"radicalPrincipal\":\"4129299\",\"descriptionName\":\"Radical Nuria WebFG\",\"refreshmentIndicator\":false,\"radicalOperative\":true}\nHB Request Headers: {}\nHB Headers Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJybFhmdzN3Q1JYZ2lZVEcwdmk0c0l3cV9sMDVCRXpTb2h6WVR1ZC1IU3RBIn0.eyJleHAiOjE2Njk4ODcxMTAsImlhdCI6MTY2OTg4NjgxMCwianRpIjoiZTViMzU5N2QtY2I1MS00NDllLTg1ZmMtZTkyZTdlYWQ0ZGQ0IiwiaXNzIjoiaHR0cHM6Ly9yaHMxYWRhc3UwMS5jb3JwLmFuZGJhbmsubG9jYWw6ODQ0My9hdXRoL3JlYWxtcy9BQlciLCJzdWIiOiI5M0JCRjQyMi00MENFLTk4NjgtODU0Mi05M0VGMDc5Qzg1NEEiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhZG1pbi1jbGkiLCJzZXNzaW9uX3N0YXRlIjoiODcxZDJhYWQtMWQwNi00NGRiLTlhNTgtZTVjZTMwYjM5ZjcxIiwiYWNyIjoiMSIsInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4NzFkMmFhZC0xZDA2LTQ0ZGItOWE1OC1lNWNlMzBiMzlmNzEiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6InVzcjQxNTYzNjAifQ.hy9Ojts2jLaGget885uWFIAo7sTz1cRpGCLhgQQ-FQ0th7HIZHDXQB3MKH8BFP9HwNsGu7Cf1ewSKCRiLmhuLNe-OAkuUKr3mgQq0EIrUr6MCZd63Ox5fEeaiMe7F35Mj9aIf9pt0UaW4NMLXJAlKud1NguN2A8jRQsudKtWiH4y6_tMInuOvfC8d_yrWYZ9I-V_AhqdsSy9fZgWhC2arODpWvoxNs32ManFtUgADr66wpGs4SDXLUYQjY6EAo15khE6aZNNFaFPBza93v-75ENcYOT3K6hz0qrMmopeQ92HZytvc3IkzGVA6SlOQc1fLRHkLUjkIHCB2jqnfAJVXA\n'

const { fetchToCurl } = require("fetch-to-curl")

const objToListParKeyValue = (obj) => {
  if (!obj)
    return '';
  obj = JSON.parse(obj);
  return Object.keys(obj).map((key) => [Number(key), obj[key]]);
}

let aryLine = text.split('\n');


let getElementByProp2 = (prop, line) => {
  let aryLine = line.split(prop);

  return aryLine[1];
}

let getElementBy = (prop, line) => {
 if (line.indexOf(prop)>=0)
    return getElementByProp2(prop, line);
}

const getMethod = (line) => {
  
    switch (true)
      {
          case getElementBy('POST Uri:', line)?.length>0:  return 'POST';
          case getElementBy('GET Uri:', line)?.length>0:  return 'GET';
          case getElementBy('PUT Uri:', line)?.length>0:  return 'PUT';
          case getElementBy('DELETE Uri:', line)?.length>0:  return 'DELETE';
      }
  
}

let requests = [];

let options = {}
aryLine.forEach(_=> {

  let Auth = ''
  if (!options.method)
    options.method = getMethod(_);
  
  if (!options.url)
    options.url = getElementBy('Uri:', _)?.trim();

  if (!options.body)
    options.body = getElementBy('parameters:', _);
  
  if (!options.headers)
  {
    let temp = getElementBy('Headers:', _);

    options.headers = temp?.trim();
    if (options.headers)
      options.headers = JSON.parse(options.headers)
  }

  if (!options.Authorization)
    if (options.headers)
    {
      Auth = getElementBy('Authorization:', _, false);
      if (Auth)
        options.headers['Authorization'] = getElementBy('Authorization:', _, false);
    }

    if (Auth)
      {
        requests.push(options);
        options = {}
      }
});


for (let options of requests) {

 // console.log(options)
   console.log(fetchToCurl(options));
  
}
