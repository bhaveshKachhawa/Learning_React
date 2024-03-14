let Person = {
    name: "rahul",
    rank: 4,
    age: 12,
    sport: {
        race: "2km",
        medal: 5,
        house: "Brave"
    },
    performance: {
        class5: "Good",
        class6: "Average"
    }
};
//display details
let display = ({ name, rank, age, roll_number = 10, sport: { race, medal, house, color = "blue" }, performance }) => {
    console.log(name, medal);
}
display(Person);

