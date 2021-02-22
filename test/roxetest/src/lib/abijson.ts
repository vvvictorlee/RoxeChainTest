
import { loadJson } from './util';
import './arr2obj';
const path = require('path');


export class SwapAbiJson {
    static async swapjson() {
        const swap = await loadJson("../abi/eoswap.abi");
        const a = swap.actions.map((obj: any) => obj.type);
        const actionjson = arrToObjES2019(swap.structs.filter((obj: any) => a.indexOf(obj.name) >= 0));
        return actionjson;
    }

    static async buildActionParameterJson(firstPara: any, ...restOfPara: any[]) {
        const actionparas = await SwapAbiJson.swapjson();
        const ap = actionparas[firstPara];
        let json: any = {};
        for (var i = 0; i < ap.length; i++) {
            json[ap[i]] = restOfPara[i];
        }
        return json;
    }
}


export class DosAbiJson {
    static async dosjson() {
        const dos = await loadJson("../abi/eosdos.abi");
        const a = dos.actions.map((obj: any) => obj.type);
        const actionjson = arrToObjES2019(dos.structs.filter((obj: any) => a.indexOf(obj.name) >= 0));
        // console.log(JSON.stringify());

        // console.log(a);
        // console.log(swap.actions);
        // console.log(swap.structs);
        return actionjson;
    }


    static async buildActionParameterJson(firstPara: any, ...restOfPara: any[]) {
        // console.log(JSON.stringify(restOfPara));
        const actionparas = await DosAbiJson.dosjson();
        const ap = actionparas[firstPara];
        let json: any = {};
        for (var i = 0; i < ap.length; i++) {
            json[ap[i]] = restOfPara[i];
        }
        // console.log(JSON.stringify(json));
        return json;
    }
}

const abiPaths:{[name:string]:any} = { "swap": "../abi/eoswap.abi", "earn": "../abi/eosdos.abi" };
export class AbiJson {
    static abiPath = "../abi/eoswap.abi";
    // console.log(__dirname);
    // console.log(__filename);
    // console.log(process.cwd());
    // console.log(path.resolve('./'));
    static async setabi(abiname: any) {
        AbiJson.abiPath = path.join(__dirname, abiPaths[abiname]);
    }

    static async json() {
        const dos = await loadJson(AbiJson.abiPath);
        const a = dos.actions.map((obj: any) => obj.type);
        const actionjson = arrToObjES2019(dos.structs.filter((obj: any) => a.indexOf(obj.name) >= 0));
        return actionjson;
    }

    static async buildActionParameterJson(firstPara: any, ...restOfPara: any[]) {
        const actionparas = await AbiJson.json();
        // const ap = actionparas[firstPara];
        // let json: any = {};
        // for (var i = 0; i < ap.length; i++) {
        //     json[ap[i]] = restOfPara[i];
        // }
        return actionparas[firstPara].reduce((obj: any, curval: any, currindex: any) => { obj[curval] = restOfPara[currindex]; return obj; }, {} as { [k: string]: any });
    }
}


// If your target environment supports ES2019, you could use Object.fromEntries(), like this:

function arrToObjES2019(arr: any[]) {
    // return Object.fromEntries(arr.map(({ name, fields }) => [name, fields.map((obj: any) => obj.name)]));

    return fromEntries(arr.map(({ name, fields }) => [name, fields.map((obj: any) => obj.name)]));
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


