/*
CIT Project 3
Name: Benjamin Jensen 
*/

function validDenomination(coin) {
  //checks if coin value is the numbers belwo 
  let good = [1, 5, 10, 25, 50, 100].indexOf(coin) !== -1;
  return good 
}

function valueFromCoinObject(obj) {
  const {denom = 0, count = 0,} = obj;
  let value = denom * count;
  return value;
}

function valueFromArray(arr) {
  //extra credit 
  if (Array.isArray(arr[0])) {
    arr = arr[0];
  }
  
  return arr.reduce(
    (accumulator, newObject) =>
    accumulator += valueFromCoinObject(newObject),
    0);
}

function coinCount(...coinage) {
  //this calls the value froma array function 
  let count = valueFromArray(coinage);
  return count;
}

module.exports = {coinCount};


//Testing functions 
console.log("{}", coinCount({denom: 5, count: 3}));
console.log("{}s", coinCount({denom: 5, count: 3}, {denom: 10, count: 2}));
const coins = [{denom: 25, count: 2}, {denom: 1, count: 7}];
console.log("...[{}]", coinCount(...coins));
console.log("[{}]", coinCount(coins)); 