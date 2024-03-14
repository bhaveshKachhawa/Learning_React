//prototype chain
class Person {
    Person(name) {
        this.name = name;
    }
}
Person.prototype.myFun = function () {
    return "my name is " + this.name;
}
let obj = new Person("bhavesh");
let obj2 = new Person("bhavesh");
obj2.fun = function () {
    console.log('hello');
}
obj2.fun();
console.log(obj.myFun());
console.log(obj.toString());
console.log(obj.weird());