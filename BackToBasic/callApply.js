const user1 = {
  name: "Bhavesh",
  printName: function (city) {
    console.log(`${this.name} is from ${city}`);
  },
};

const user2 = {
  name: "Shafi",
};

user1.printName.call(user2, "Bangalore");
