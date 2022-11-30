let text = 'blabla Request: https://localhost:8080/bla/bla/textB.html\nbla Header: { "Content-type": "JSON", "Key": "12345"}\nxxx Response: { "Text": "A", "Name": "gato"}]\nResponse OK\nblabla Request: https://localhost:8080/bla/bla/textA.html\nbla Header: { "Content-type": "JSON", "Key": "12345"}\nxxx Response: { "Text": "A", "Name": "gato"}]\nResponse OK'

const { fetchToCurl } = require("fetch-to-curl")

function extractJSON(str) {
    var firstOpen, firstClose, candidate;
    firstOpen = str.indexOf('{', firstOpen + 1);
    do {
        firstClose = str.lastIndexOf('}');
       //  console.log('firstOpen: ' + firstOpen, 'firstClose: ' + firstClose);
        if(firstClose <= firstOpen) {
            return null;
        }
        do {
            candidate = str.substring(firstOpen, firstClose + 1);
           // console.log('candidate: ' + candidate);
            try {
                var res = JSON.parse(candidate);
                // console.log('...found');
                return [res, firstOpen, firstClose + 1];
            }
            catch(e) {
                console.log('...failed');
            }
            firstClose = str.substr(0, firstClose).lastIndexOf('}');
        } while(firstClose > firstOpen);
        firstOpen = str.indexOf('{', firstOpen + 1);
    } while(firstOpen != -1);
}


let aryLine = text.split('\n');

let getElementByProp = (prop,line,isJson) =>   {
    let aryLine = line.split(' ');

    for (let i=0;i<aryLine.length;i++)
      {
        if (aryLine[i] == prop)
        {
          //console.log('isJson:' + isJson);
          if (isJson==true)
          {
            let result = extractJSON(line)[0];  
           
            return result;
          }

          else
            return aryLine[i+1]; 
        }

      }

  }

let getElementBy = (prop, line, isJson) => {
 if (line.indexOf(prop)>=0)
    return getElementByProp(prop, line, isJson);
}

let requests = [];

let options = {}
aryLine.forEach(_=> {

  options.method = 'POST';
  
  if (!options.uri)
    options.uri = getElementBy('Request:', _, false);

  if (!options.headers)
    options.headers= getElementBy('Header:', _, true);

  if (options.headers)
  {
    requests.push(options);
    options = {}
  }
});


for (let options of requests) {
   //console.log(JSON.stringify(options));
   console.log(fetchToCurl(options.uri, options));
  
}
