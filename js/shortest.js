// function fun()
// {
//     for(var i =1;i <=5; i++) 
//     {   
//         (function x(k) {
//         setTimeout(function () {
//             console.log(k);
//         }, k*1000);})(i);
//     }
//     console.log('bhavesh');
// }

// fun();


// let a = 10;
// function fun() 
// {
//     let a = 20;
//     console.log(a);
// }
// console.log(a);

// fun();

function Cons() 
{
    var count = 0;
    this.inc = () => {
        count++;
        console.log(count);
    }

    this.dec = function() {
        count--;
        console.log(count);
    }
}

let obj = new Cons();


obj.inc();
obj.inc();
obj.inc();
obj.count;
obj.inc();
obj.dec();
obj.dec();obj.dec();


