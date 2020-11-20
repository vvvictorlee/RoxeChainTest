
// If your target environment supports ES2019, you could use Object.fromEntries(), like this:

function arrToObjES2019(arr: any[]) {
    return Object.fromEntries(arr.map(({ name, fields }) => [name, fields.map((obj: any) => obj.name)]));
}
// Or, if not, you can make your own polyfill-like version of Object.fromEntries() using array reduce() on an empty object, like this:

function fromEntries<V>(iterable: Iterable<[string, V]>) {
    return [...iterable].reduce((obj, [key, val]) => {
        obj[key] = val
        return obj
    }, {} as { [k: string]: V })
}
// and then use it:

function arrToObj(arr: any[]) {
    return fromEntries(arr.map(({ name, fields }) => [name, fields.map((obj: any) => obj.name)]));
}
// Either way should let you do what you want:

// const arr: MyObject[] = [
//   { id: "id1", position: 1 },
//   { id: "id2", position: 2 }
// ];

// console.log(JSON.stringify(arrToObj(arr))); // {"id1":1,"id2":2}
// Okay, hope that helps. Good luck!


