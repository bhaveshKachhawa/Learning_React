console.log("1. Script Start");

setTimeout(() => {
  console.log("2. setTimeout (Macro)");
}, 0);

Promise.resolve()
  .then(() => {
    console.log("3. Promise 1 (Micro)");
  })
  .then(() => {
    console.log("4. Promise 2 (Micro)");
  });

console.log("5. Script End");
