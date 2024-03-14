//chaning
function Person(name) {
    this.name = name;
};
// console.log(new Person("sdf").toString());
//prototype
let obj = new Person("hello");
console.log(obj);
console.log(Person.prototype);//prototype linkage


