
export function refactoringPoolTableJson(pooltablejson: any) {
    let pools = pooltablejson.rows;///[0]["pools"];
    // let poolsobj = arrToObjES2019(pools);
    let allpools = pools.map((pool: any) => {
        let refactoring_records = pool.pools.records.map((record: any) => {
            let token: any = record.value.exsym.symbol.split(",")[1];
            let o: { [k: string]: any } = {};
            o[token] = { denorm: record.value.denorm, balance: record.value.balance };
            return o;
        }).reduce((obj: any, o: any) => { Object.assign(obj, o); return obj }, {});

        Object.assign(refactoring_records, { swapFee: pool.pools.swapFee }, { totalWeight: pool.pools.totalWeight });
        let po: { [k: string]: any } = {};
        po[pool.pool] = refactoring_records;
        return po;
    }).reduce((obj: any, o: any) => { Object.assign(obj, o); return obj }, {});

    return allpools;
}

function testRefactoring() {
    const pooltablerows = {
  "rows": [
    {
      "pool": "btc2usdt",
      "pools": {
        "mutex": 0,
        "factory": "eoswapeoswap",
        "controller": "eoswapeoswap",
        "publicSwap": 1,
        "swapFee": 1000,
        "finalized": 1,
        "tokens": [
          "0x04425443000000003015a4b957c33155",
          "0x04555344540000003015a4b957c33155"
        ],
        "records": [
          {
            "key": "0x04425443000000003015a4b957c33155",
            "value": {
              "bound": 1,
              "index": 0,
              "denorm": 5000000,
              "balance": 8500000,
              "exsym": { "symbol": "4,BTC", "contract": "eoswapxtoken" }
            }
          },
          {
            "key": "0x04555344540000003015a4b957c33155",
            "value": {
              "bound": 1,
              "index": 1,
              "denorm": 5000000,
              "balance": 169461586,
              "exsym": { "symbol": "4,USDT", "contract": "eoswapxtoken" }
            }
          }
        ],
        "totalWeight": 10000000
      }
    }
  ],
  "more": false
};

    let tablejson =  refactoringPoolTableJson(pooltablerows);
    console.log(tablejson);

}



// (async function () {
//     await testRefactoring();

//     // let s: any = await api.querySellToken(10000, "DAI", "MKR");
//     // console.log("=s==", s, "===");
// })();
