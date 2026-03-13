// function calculateTax(taxRate, amount) {
//   const total = amount + amount * taxRate;
//   console.log(`The total price with ${taxRate * 100}% tax is: ${total}`);
// }

// const calculateGST = calculateTax.bind(null, 0.18);
// const calculateVAT = calculateTax.bind(null, 0.05);

// calculateGST(100);
// calculateVAT(100);
//any
const pro1 = new Promise((res, rej) => {
  rej("reject");
}).then(() => {
  console.log(rej);
});
console.log(pro1);

const pro1 = new Promise((res, rej) => {
  setTimeout(() => {
    rej("reject1");
  }, 0);
});
const pro2 = new Promise((res, rej) => {
  setTimeout(() => {
    rej("reject2");
  }, 0);
});
const pro3 = new Promise((res, rej) => {
  setTimeout(() => {
    rej("reject3");
  }, 0);
});
const result = await Promise.race([pro1, pro2, pro3]);
console.log("Final Result " + result);
// pro1.then((value) => {console.log(value)}).catch((err) => {console.log(err)});
// pro2.then((value) => {console.log(value)}).catch((err) => {console.log(err)});
// pro3.then((value) => {console.log(value)}).catch((err) => {console.log(err)});

async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
//micor task
//macro/task []

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
