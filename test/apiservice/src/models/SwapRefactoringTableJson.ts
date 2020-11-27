
export function refactoringPoolTableJson(pooltablejson: any) {
    let pools = pooltablejson.rows[0]["pools"];
    // let poolsobj = arrToObjES2019(pools);
    let allpools = pools.map((pool: any) => {
        let refactoring_records = pool.value.records.map((record: any) => {
            let token: any = record.value.exsym.symbol.split(",")[1];
            let o: { [k: string]: any } = {};
            o[token] = { denorm: record.value.denorm, balance: record.value.balance };
            return o;
        }).reduce((obj: any, o: any) => { Object.assign(obj, o); return obj }, {});

        Object.assign(refactoring_records, { swapFee: pool.value.swapFee }, { totalWeight: pool.value.totalWeight });
        let po: { [k: string]: any } = {};
        po[pool.key] = refactoring_records;
        return po;
    }).reduce((obj: any, o: any) => { Object.assign(obj, o); return obj }, {});

    return allpools;
}

function testRefactoring() {
    const pooltablerows = {
        "rows": [
            {
                "pools": [
                    {
                        "key": "pool",
                        "value": {
                            "mutex": 0,
                            "factory": "eoswapeoswap",
                            "controller": "eoswapeoswap",
                            "publicSwap": 1,
                            "swapFee": 3000,
                            "finalized": 1,
                            "tokens": [
                                "0x04574554480000003015a4b957c33155",
                                "0x04444149000000003015a4b957c33155"
                            ],
                            "records": [
                                {
                                    "key": "0x04444149000000003015a4b957c33155",
                                    "value": {
                                        "bound": 1,
                                        "index": 1,
                                        "denorm": 5000000,
                                        "balance": 2400000,
                                        "exsym": {
                                            "symbol": "4,DAI",
                                            "contract": "eoswapxtoken"
                                        }
                                    }
                                },
                                {
                                    "key": "0x04574554480000003015a4b957c33155",
                                    "value": {
                                        "bound": 1,
                                        "index": 0,
                                        "denorm": 5000000,
                                        "balance": 60000,
                                        "exsym": {
                                            "symbol": "4,WETH",
                                            "contract": "eoswapxtoken"
                                        }
                                    }
                                }
                            ],
                            "totalWeight": 10000000
                        }
                    },
                    {
                        "key": "pool1",
                        "value": {
                            "mutex": 0,
                            "factory": "eoswapeoswap",
                            "controller": "eoswapeoswap",
                            "publicSwap": 1,
                            "swapFee": 3000,
                            "finalized": 1,
                            "tokens": [
                                "0x04574554480000003015a4b957c33155",
                                "0x04444149000000003015a4b957c33155"
                            ],
                            "records": [
                                {
                                    "key": "0x04444149000000003015a4b957c33155",
                                    "value": {
                                        "bound": 1,
                                        "index": 1,
                                        "denorm": 5000000,
                                        "balance": 220000000,
                                        "exsym": {
                                            "symbol": "4,DAI",
                                            "contract": "eoswapxtoken"
                                        }
                                    }
                                },
                                {
                                    "key": "0x04574554480000003015a4b957c33155",
                                    "value": {
                                        "bound": 1,
                                        "index": 0,
                                        "denorm": 5000000,
                                        "balance": 5500000,
                                        "exsym": {
                                            "symbol": "4,WETH",
                                            "contract": "eoswapxtoken"
                                        }
                                    }
                                }
                            ],
                            "totalWeight": 10000000
                        }
                    },
                    {
                        "key": "pool2",
                        "value": {
                            "mutex": 0,
                            "factory": "eoswapeoswap",
                            "controller": "eoswapeoswap",
                            "publicSwap": 1,
                            "swapFee": 3000,
                            "finalized": 1,
                            "tokens": [
                                "0x04574554480000003015a4b957c33155",
                                "0x04444149000000003015a4b957c33155"
                            ],
                            "records": [
                                {
                                    "key": "0x04444149000000003015a4b957c33155",
                                    "value": {
                                        "bound": 1,
                                        "index": 1,
                                        "denorm": 5000000,
                                        "balance": 220000000,
                                        "exsym": {
                                            "symbol": "4,DAI",
                                            "contract": "eoswapxtoken"
                                        }
                                    }
                                },
                                {
                                    "key": "0x04574554480000003015a4b957c33155",
                                    "value": {
                                        "bound": 1,
                                        "index": 0,
                                        "denorm": 5000000,
                                        "balance": 5500000,
                                        "exsym": {
                                            "symbol": "4,WETH",
                                            "contract": "eoswapxtoken"
                                        }
                                    }
                                }
                            ],
                            "totalWeight": 10000000
                        }
                    },
                    {
                        "key": "pool3",
                        "value": {
                            "mutex": 0,
                            "factory": "eoswapeoswap",
                            "controller": "eoswapeoswap",
                            "publicSwap": 0,
                            "swapFee": 1000,
                            "finalized": 0,
                            "tokens": [],
                            "records": [],
                            "totalWeight": 0
                        }
                    },
                    {
                        "key": "pool4",
                        "value": {
                            "mutex": 0,
                            "factory": "eoswapeoswap",
                            "controller": "eoswapeoswap",
                            "publicSwap": 1,
                            "swapFee": 1000,
                            "finalized": 1,
                            "tokens": [
                                "0x04574554480000003015a4b957c33155",
                                "0x04444149000000003015a4b957c33155"
                            ],
                            "records": [
                                {
                                    "key": "0x04444149000000003015a4b957c33155",
                                    "value": {
                                        "bound": 1,
                                        "index": 1,
                                        "denorm": 5000000,
                                        "balance": 220000000,
                                        "exsym": {
                                            "symbol": "4,DAI",
                                            "contract": "eoswapxtoken"
                                        }
                                    }
                                },
                                {
                                    "key": "0x04574554480000003015a4b957c33155",
                                    "value": {
                                        "bound": 1,
                                        "index": 0,
                                        "denorm": 5000000,
                                        "balance": 5500000,
                                        "exsym": {
                                            "symbol": "4,WETH",
                                            "contract": "eoswapxtoken"
                                        }
                                    }
                                }
                            ],
                            "totalWeight": 10000000
                        }
                    }
                ]
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
