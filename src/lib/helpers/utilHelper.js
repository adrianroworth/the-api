// swaps the keys and values for the given array.
// if the original object had keys with identical
// values, then the new object lists these keys
// in an array.
// e.g.
// {
//     1: 2,
//     2: 2,
//     4: 3
// }
// transforms in to this:
// {
//     2:  ["1", "2"],
//     3: ["4"]
// }

function swapObjectKeysAndValues(obj) {
    const newObj = {};
    Object.keys(obj).forEach(key => {
        if (!newObj[obj[key]]) {
            newObj[obj[key]] = [];
        }
        newObj[obj[key]].push(key);
    });
    return newObj;
}

module.exports = {
    swapObjectKeysAndValues
};
