let person = {
    name: "sumita",
    greeting: function () {
        return "Hello";
    }
};
let teacher = {
    age: 23
};
teacher = Object.create(person);
console.log(teacher.greeting());