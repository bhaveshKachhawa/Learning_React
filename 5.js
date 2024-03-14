let view;
function likeTheVideo() {
    let flag = 1;
    return function () {
        if (flag === 1) {
            view = "My Channel";
            console.log("Subscribe to ", view);
            --flag;
        }
    }
}
let check = likeTheVideo();
check();
check();
check();
check();
check();
check();
