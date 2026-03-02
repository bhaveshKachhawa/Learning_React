var obj = {
  a: {
    b: {
      c: 12,
      j: false,
      list: [{ name: "shafi", skills: ["js", "react"] }, { name: "khan" }],
    },
    k: null,
  },
};

const findPath = (obj, Path) => {
  const str = Path.split(".");
  let value = undefined;
  for (let i = 0; i < str.length; i++) {
    if (!obj[str[i]] && obj[str[i]] != null) {
      value = undefined;
      break;
    }
    value = obj[str[i]];
    obj = value;
    // {},[]

    if (Array.isArray(obj) && i + 1 !== str.length) {
      str.splice(0, i - 1);
      for (let j = 0; j < obj.length; j++) {
        value = findPath(obj[j], str.toString());
      }
    }
  }
  return value;
};
console.log(findPath(obj, "a.b.c"));
// 12

console.log(findPath(obj, "a.b"));
// { c: 12, j: false, list: [...] }

console.log(findPath(obj, "a.b.list"));
// [ { name: "shafi", skills: ["js", "react"] }, { name: "khan" } ]

console.log(findPath(obj, "a.b.list.0"));
// { name: "shafi", skills: ["js", "react"] }

console.log(findPath(obj, "a.b.list.0.name"));
// "shafi"

console.log(findPath(obj, "a.b.list[0].name"));
// "shafi"

console.log(findPath(obj, "a.b.list[0].skills[1]"));
// "react"

console.log(findPath(obj, "a.b.list.1.name"));
// "khan"

console.log(findPath(obj, "a.b.list.2"));
// undefined

console.log(findPath(obj, "a.b.j"));
// false

console.log(findPath(obj, "a.b.j.x"));
// undefined

console.log(findPath(obj, "a.k"));
// null

console.log(findPath(obj, "a.k.x"));
// undefined

//promise race any
