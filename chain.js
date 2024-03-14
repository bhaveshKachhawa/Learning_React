//chain
var user = "BHAVESH";
function parent() {
    return function (hello) {
        return function (my) {
            return function (name) {
                return function (is) {
                    return hello + " " + my + " " + name + " " + is + " " + user;
                }
            }
        }
    }
}
console.log(parent()("HELLO")("MY")("NAME")("IS"));