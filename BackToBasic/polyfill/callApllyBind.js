const user = { name: "Bhavesh" };

function welcome(city, country) {
  console.log(`Hi, I'm ${this.name} from ${city}, ${country}`);
}

/**
 * 1. Polyfill for .call()
 * Logic: Attach function to the object, run it, then delete it.
 */
Function.prototype.myCall = function (context, ...args) {
  // If no context is provided, default to window (global)
  context = context || window;

  // Create a unique symbol/key to avoid overwriting existing properties
  const fnSymbol = Symbol();
  context[fnSymbol] = this; // 'this' is the function (welcome)

  // Execute the function with arguments
  const result = context[fnSymbol](...args);

  // Clean up: remove the function from the object
  delete context[fnSymbol];

  return result;
};

/**
 * 2. Polyfill for .apply()
 * Logic: Same as .call(), but arguments come as an array.
 */
Function.prototype.myApply = function (context, argsArray) {
  context = context || window;
  const fnSymbol = Symbol();
  context[fnSymbol] = this;

  // Execute using the spread operator on the array
  const result = context[fnSymbol](...argsArray);

  delete context[fnSymbol];
  return result;
};

/**
 * 3. Polyfill for .bind()
 * Logic: Returns a NEW function and uses .apply() internally.
 */
Function.prototype.myBind = function (context, ...args1) {
  const targetFn = this;

  return function (...args2) {
    // Combine arguments from bind (args1) and the final call (args2)
    return targetFn.apply(context, [...args1, ...args2]);
  };
};

// --- TESTING ---
console.log("--- Testing myCall ---");
welcome.myCall(user, "Jaipur", "India");

console.log("--- Testing myApply ---");
welcome.myApply(user, ["Pune", "India"]);

console.log("--- Testing myBind ---");
const boundFn = welcome.myBind(user, "Bangalore");
boundFn("India");
