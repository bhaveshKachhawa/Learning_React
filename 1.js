//write a function that allow you to do this
function createBase(base) {
    return function (number) {
        return base + number;
    }
}
let addTen = createBase(10);
console.log(addTen(20));
console.log(addTen(90));