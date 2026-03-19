Function.prototype.myApply = function (context, argsArray) {
  context.tempFn = this;
  const result = context.tempFn(...argsArray);
  delete context.tempFn;
  return result;
};
const user = { name: "Bhavesh" };
function sayHi(city) {
  console.log(`Hi ${this.name} from ${city}`);
}
sayHi.apply(user, ["ajmer"]);
