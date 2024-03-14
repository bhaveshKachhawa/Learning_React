//before i did this without using closures so it increase time.....
// it's help to optimize the time
function find() {
    let arr = [];
    for (let i = 0; i < 100000; i++) {
        arr[i] = i * i;
    }
    return function (index) {
        console.log(arr[index]);
    }
}
let value = find();
console.time("value 6");
value(6);
console.timeEnd("value 6");
console.time("value 90");
value(90);
console.timeEnd("value 90");
