const arr = [1, 2, 2, 3, 4, 4, 5];
const unique = arr.filter((item, index) => {
  return arr.indexOf(item) === index;
});
