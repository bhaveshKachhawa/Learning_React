Function.prototype.myCall = function (context, ...args) {
  context.tempFn = this;
  const result = context.tempFn(...args);
  delete context.tempFn;
  return result;
};
const user = { name: "Bhavesh" };
function sayHi(city) {
  console.log(`Hi ${this.name} from ${city}`);
}

sayHi.myCall(user, "Ajmer");
