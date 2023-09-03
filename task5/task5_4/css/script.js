const arr = [{ name: "dfdfdfddfd", age: "23", lastName: "fdfdf", id: 1 },
{ name: "jaymeen", age: "23", lastName: "Kotak", id: 2 },
{ name: "jaymeen", age: "23", lastName: "Kotak", id: 3 },
{ name: "jaymeen", age: "23", lastName: "Kotak", id: 4 }];

const selectedId = 1;
const newArr = arr.map((item) => {
    if (item?.id === selectedId) {
        return (
            { ...item, name: "Bhavin" }
        )
    }
    else {
        return item
    }
})

console.log(newArr, "newArr")