//solve problem using closures
for (var i = 1; i <= 3; i++) {
    function time(i) {
        setTimeout(() => {
            console.log(i);
        }, i * 1000);
    }
    time(i);
}
