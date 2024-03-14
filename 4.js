//use closures to create private counter
function private() {
    let _counter = 0;
    function add() {
        ++_counter;
    }
    function sub() {
        --_counter;
    }
    function display() {
        console.log(_counter);
    }
    return {
        add: add,
        sub: sub,
        display: display
    };
}
let Obj = private();
Obj.display();
Obj.add();
Obj.add();
Obj.add();
Obj.display();
Obj.sub();
Obj.display();