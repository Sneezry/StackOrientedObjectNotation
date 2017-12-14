import {SOON} from './SOON';

var json1 = `"Hello World"`,
    json2 = `123`,
    json3 = `true`,
    json4 = `false`,
    json5 = `null`,
    json6 = `["a", "b", 123]`,
    json7 = `{"key1": "value1", "key2": "value2"}`,
    json8 = `{"key": ["value1", "value2"]}`,
    json9 = `[{"key": "value1"}, {"key": "value2"}]`;

var soon = new SOON();

console.log(soon.stringify(JSON.parse(json1)));
console.log(soon.parse(soon.stringify(JSON.parse(json1))));
console.log(soon.stringify(JSON.parse(json2)));
console.log(soon.parse(soon.stringify(JSON.parse(json2))));
console.log(soon.stringify(JSON.parse(json3)));
console.log(soon.parse(soon.stringify(JSON.parse(json3))));
console.log(soon.stringify(JSON.parse(json4)));
console.log(soon.parse(soon.stringify(JSON.parse(json4))));
console.log(soon.stringify(JSON.parse(json5)));
console.log(soon.parse(soon.stringify(JSON.parse(json5))));
console.log(soon.stringify(JSON.parse(json6)));
console.log(soon.parse(soon.stringify(JSON.parse(json6))));
console.log(soon.stringify(JSON.parse(json7)));
console.log(soon.parse(soon.stringify(JSON.parse(json7))));
console.log(soon.stringify(JSON.parse(json8)));
console.log(soon.parse(soon.stringify(JSON.parse(json8))));
console.log(soon.stringify(JSON.parse(json9)));
console.log(soon.parse(soon.stringify(JSON.parse(json9))));