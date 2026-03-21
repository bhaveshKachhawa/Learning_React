async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
//micor task
//macro/task []6. implement basic debounce()
JavaScript
Lodash
easy
42655 tried
5. implement throttle() with leading & trailing option
JavaScript
Lo

async function async2() {
  console.log("async2");
}

console.log("script start"); //1st

setTimeout(function () {
  console.log("setTimeout");
}, 0); //macro

async1(); //micro

new Promise(function (resolve) {
  resolve();
  console.log("promise1");
}).then(function () {
  console.log("promise2");
}); //
//script start
//script end
//async1 start
//async1 end
//async2
//promise1
//promise2
//setTimeout
console.log("script end");
