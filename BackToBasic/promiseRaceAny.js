/any
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
