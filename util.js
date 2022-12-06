const objToListParKeyValue = (obj) => {
    if (!obj)
        return '';
    obj = JSON.parse(obj);
    return Object.keys(obj).map((key) => [Number(key), obj[key]]);
}



const getElementByProp2 = (prop, line) => {
    let aryLine = line.split(prop);

    return aryLine[1];
}

const getElementBy = (prop, line) => {
    if (line.indexOf(prop) >= 0)
        return getElementByProp2(prop, line);
}

const getMethod = (line) => {

    switch (true) {
        case getElementBy('POST Uri:', line)?.length > 0: return 'POST';
        case getElementBy('GET Uri:', line)?.length > 0: return 'GET';
        case getElementBy('PUT Uri:', line)?.length > 0: return 'PUT';
        case getElementBy('DELETE Uri:', line)?.length > 0: return 'DELETE';
    }

}

module.exports =
    { getMethod
    , getElementBy }
