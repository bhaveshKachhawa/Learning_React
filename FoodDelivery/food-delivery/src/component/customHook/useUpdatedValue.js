const toCamelCase = (value) => {
    const arr = value.split(" ");
    return arr.map((data, index) => {
        if(index != 0) {
            data = data.replace(data.charAt(0),data.charAt(0).toUpperCase());
        }
        return data;
    }).join("");
}

const toPascallCase = (value) => {
    return value.split(" ").map((item) => item.replace(item.charAt(0), item.charAt(0).toUpperCase())).join("");
}

const toSnakeCase = (value) => {
    return value.replaceAll(' ', '_');
}

const toKebabCase = (value) => {
    return value.replaceAll(' ', '-');
}

const toTrim = (value) => {
    return value.replaceAll(' ','');
}

export const useUpdateValue = (item, value) => {
        let updatedValue = "";
        if(item === "Lower Case") updatedValue =  value.toLowerCase();
        else if(item === "Upper Case") updatedValue =  value.toUpperCase();
        else if(item === "Camel Case") updatedValue =  toCamelCase(value);
        else if(item === "Pascal Case") updatedValue =  toPascallCase(value);
        else if(item === "Snake Case") updatedValue =  toSnakeCase(value);
        else if(item === "Kebab Case") updatedValue =  toKebabCase(value);
        else { updatedValue = toTrim(value)}
        return updatedValue;
}