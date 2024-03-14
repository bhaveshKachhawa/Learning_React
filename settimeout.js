for (var i = 1; i <= 3; i++) {
    setTimeout(() => {
        console.log(i);
    }, i * 1000);
}
//Solution
for (var i = 1; i <= 3; i++) {
    (function (index) {
        setTimeout(() => {
            console.log(index);
        }, index * 1000);
    })(i);
}

for (let i = 1; i <= 3; i++) {
    setTimeout(() => {
        console.log(i);
    }, i * 1000);
}