
import { loadJson } from './util';
import './arr2obj';

export class SwapAbiJson {
    static async swapjson() {
        const swap = await loadJson("../abi/eoswap.abi");
        const a = swap.actions.map((obj: any) => obj.type);
        const actionjson = arrToObjES2019(swap.structs.filter((obj: any) => a.indexOf(obj.name) >= 0));
        // console.log(JSON.stringify());

        // console.log(a);
        // console.log(swap.actions);
        // console.log(swap.structs);
        return actionjson;
    }



    static async buildActionParameterJson(firstPara: any, ...restOfPara: any[]) {
        // console.log(JSON.stringify(restOfPara));
        const actionparas = await SwapAbiJson.swapjson();
        const ap = actionparas[firstPara];
        let json: any = {};
        for (var i = 0; i < ap.length; i++) {
            json[ap[i]] = restOfPara[i];
        }
        // console.log(JSON.stringify(json));
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


// (async function () {
//     const s = await  SwapAbiJson.buildActionParameterJson("newpool", "msg_sender_value", "pool_name_value");
//     console.log(JSON.stringify(s));
// }
// )();


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




// {
//   "approve": [
//     "msg_sender",
//     "dst",
//     "amt"
//   ],
//   "bind": [
//     "msg_sender",
//     "pool_name",
//     "balance",
//     "denorm"
//   ],
//   "burn": [
//     "msg_sender",
//     "amt"
//   ],
//   "collect": [
//     "msg_sender",
//     "pool_name"
//   ],
//   "decapproval": [
//     "msg_sender",
//     "dst",
//     "amt"
//   ],
//   "exitpool": [
//     "msg_sender",
//     "pool_name",
//     "poolAmountIn",
//     "minAmountsOut"
//   ],
//   "extransfer": [
//     "from",
//     "to",
//     "quantity",
//     "memo"
//   ],
//   "finalize": [
//     "msg_sender",
//     "pool_name"
//   ],
//   "gulp": [
//     "msg_sender",
//     "pool_name",
//     "token"
//   ],
//   "incapproval": [
//     "msg_sender",
//     "dst",
//     "amt"
//   ],
//   "joinpool": [
//     "msg_sender",
//     "pool_name",
//     "poolAmountOut",
//     "maxAmountsIn"
//   ],
//   "mint": [
//     "msg_sender",
//     "amt"
//   ],
//   "move": [
//     "msg_sender",
//     "dst",
//     "amt"
//   ],
//   "newpool": [
//     "msg_sender",
//     "pool_name"
//   ],
//   "newtoken": [
//     "msg_sender",
//     "token"
//   ],
//   "rebind": [
//     "msg_sender",
//     "pool_name",
//     "balance",
//     "denorm"
//   ],
//   "setblabs": [
//     "msg_sender",
//     "blabs"
//   ],
//   "setcontroler": [
//     "msg_sender",
//     "pool_name",
//     "manager"
//   ],
//   "setpubswap": [
//     "msg_sender",
//     "pool_name",
//     "public_"
//   ],
//   "setswapfee": [
//     "msg_sender",
//     "pool_name",
//     "swapFee"
//   ],
//   "swapamtin": [
//     "msg_sender",
//     "pool_name",
//     "tokenAmountIn",
//     "minAmountOut",
//     "maxPrice"
//   ],
//   "swapamtout": [
//     "msg_sender",
//     "pool_name",
//     "maxAmountIn",
//     "tokenAmountOut",
//     "maxPrice"
//   ],
//   "transfer": [
//     "msg_sender",
//     "dst",
//     "amt"
//   ],
//   "transferfrom": [
//     "msg_sender",
//     "src",
//     "dst",
//     "amt"
//   ],
//   "unbind": [
//     "msg_sender",
//     "pool_name",
//     "token"
//   ]
// }