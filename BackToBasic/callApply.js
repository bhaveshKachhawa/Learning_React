function sayHello(city, country) {
  console.log(`Hello! I am ${this.name} from ${city}, ${country}.`);
}

const user1 = { name: "Bhavesh" };
const user2 = { name: "Shafi" };

sayHello.call(user1, "Ajmer", "India");
sayHello.apply(user2, ["Bangalore", "India"]);
