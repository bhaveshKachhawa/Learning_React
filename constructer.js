function Person(name) {
    this.name = name;
    this.getName = function () {
        return "My name is " + this.name;
    }
    console.log(new.target);
}
let obj = new Person('bhavesh');
console.log(obj.getName());