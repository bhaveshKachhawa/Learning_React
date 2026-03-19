Function.prototype.myBind = function (context, ...args1) {
  const originalFn = this;

  return function (...args2) {
    return originalFn.apply(context, [...args1, ...args2]);
  };
};
const user = { name: "Bhavesh" };
function sayHi(city) {
  console.log(`Hi ${this.name} from ${city}`);
}
const later = sayHi.myBind(user, "Bangalore");
later();
