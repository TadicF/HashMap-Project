import { HashMap } from "./hashmap.js";

const test = new HashMap(0.75, 16);
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
console.log(test.mapEntries());
console.log(`Length: ${test.length()}`);

test.set('moon', 'silver');
console.log(`Length: ${test.length()}`);
console.log(test.mapEntries());

test.set('moon', 'cobalt');
test.set('lion', 'statue');
test.set('elephant', 'dumbo');

console.log(`Length: ${test.length()}`);
console.log(test.mapEntries());
console.log(test.clear());
console.log(test.length());

