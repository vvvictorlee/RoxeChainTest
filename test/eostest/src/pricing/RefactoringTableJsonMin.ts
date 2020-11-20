

const refactoring_fields: any[] = [
    "_LP_FEE_RATE_",
    "_MT_FEE_RATE_",
    "_K_",
    "_R_STATUS_",
    "_TARGET_BASE_TOKEN_AMOUNT_",
    "_TARGET_QUOTE_TOKEN_AMOUNT_",
    "_BASE_BALANCE_",
    "_QUOTE_BALANCE_"
];

function refactoringTableDataJson(dodotablejsonstr: any, oracletablejsonstr: any) {
    let dodotablejson = JSON.parse(dodotablejsonstr);
    let oracletablejson = JSON.parse(oracletablejsonstr);
    let oraclejson = refactoringOracleTableJson(oracletablejson);
    let dodos = refactoringDodoTableJson(dodotablejson, oraclejson);
    return JSON.stringify(dodos);
}

function refactoringDodoTableJson(dodotablejson: any, oraclejson: any) {
    let dodos = dodotablejson.rows[0]["dodos"];
    let alldodos: { [name: string]: any } = {};
    for (let dodo of dodos) {
        alldodos[dodo.key] = {};
        let basetoken = dodo.value._BASE_TOKEN_.symbol.split(",")[1];
        alldodos[dodo.key]._ORACLE_PRICE_ = Number(oraclejson[basetoken]);
        for (let f of refactoring_fields) {
            alldodos[dodo.key][f] = dodo.value[f];
        }
    }

    return alldodos;
}

function refactoringOracleTableJson(oracletablejson: any) {
    let oracles = oracletablejson.rows[0]["oracles"];
    let alloracles: { [name: string]: any } = {};
    for (let oracle of oracles) {
        let arr = oracle.value.tokenPrice.quantity.split(" ");
        alloracles[arr[1]] = arr[0];
    }
    return alloracles;
}

function testRefactoring() {
    const dodotablerows = {
        "rows": [
            {
                "dodos": [
                    {
                        "key": "daimkrdaimkr",
                        "value": {
                            "dodo_name": "daimkrdaimkr",
                            "initownable": {
                                "_OWNER_": "eosdoseosdos",
                                "_NEW_OWNER_": ""
                            },
                            "guard": {
                                "_ENTERED_": 0
                            },
                            "_INITIALIZED_": 1,
                            "_CLOSED_": 0,
                            "_DEPOSIT_QUOTE_ALLOWED_": 1,
                            "_DEPOSIT_BASE_ALLOWED_": 1,
                            "_TRADE_ALLOWED_": 1,
                            "_GAS_PRICE_LIMIT_": 0,
                            "_BUYING_ALLOWED_": 1,
                            "_SELLING_ALLOWED_": 1,
                            "_BASE_BALANCE_LIMIT_": "18446744073709551615",
                            "_QUOTE_BALANCE_LIMIT_": "18446744073709551615",
                            "_SUPERVISOR_": "eosdoseosdos",
                            "_MAINTAINER_": "eosdoseosdos",
                            "_BASE_TOKEN_": {
                                "symbol": "4,DAI",
                                "contract": "eosdosxtoken"
                            },
                            "_QUOTE_TOKEN_": {
                                "symbol": "4,MKR",
                                "contract": "eosdosxtoken"
                            },
                            "_ORACLE_": {
                                "symbol": "4,DAI",
                                "contract": "eosdosxtoken"
                            },
                            "_LP_FEE_RATE_": 1,
                            "_MT_FEE_RATE_": 0,
                            "_K_": 1,
                            "_R_STATUS_": 2,
                            "_TARGET_BASE_TOKEN_AMOUNT_": 90000000,
                            "_TARGET_QUOTE_TOKEN_AMOUNT_": 100009982,
                            "_BASE_BALANCE_": 179900000,
                            "_QUOTE_BALANCE_": 10189239,
                            "_BASE_CAPITAL_TOKEN_": {
                                "symbol": "4,DAI",
                                "contract": "daimkrdaimkr"
                            },
                            "_QUOTE_CAPITAL_TOKEN_": {
                                "symbol": "4,MKR",
                                "contract": "daimkrdaimkr"
                            },
                            "_BASE_CAPITAL_RECEIVE_QUOTE_": 0,
                            "_QUOTE_CAPITAL_RECEIVE_BASE_": 0,
                            "_CLAIMED_": []
                        }
                    },
                    {
                        "key": "ethbasemkr11",
                        "value": {
                            "dodo_name": "ethbasemkr11",
                            "initownable": {
                                "_OWNER_": "eosdoseosdos",
                                "_NEW_OWNER_": ""
                            },
                            "guard": {
                                "_ENTERED_": 0
                            },
                            "_INITIALIZED_": 1,
                            "_CLOSED_": 0,
                            "_DEPOSIT_QUOTE_ALLOWED_": 1,
                            "_DEPOSIT_BASE_ALLOWED_": 1,
                            "_TRADE_ALLOWED_": 1,
                            "_GAS_PRICE_LIMIT_": 0,
                            "_BUYING_ALLOWED_": 1,
                            "_SELLING_ALLOWED_": 1,
                            "_BASE_BALANCE_LIMIT_": "18446744073709551615",
                            "_QUOTE_BALANCE_LIMIT_": "18446744073709551615",
                            "_SUPERVISOR_": "eosdoseosdos",
                            "_MAINTAINER_": "eosdoseosdos",
                            "_BASE_TOKEN_": {
                                "symbol": "4,WETH",
                                "contract": "eosdosxtoken"
                            },
                            "_QUOTE_TOKEN_": {
                                "symbol": "4,MKR",
                                "contract": "eosdosxtoken"
                            },
                            "_ORACLE_": {
                                "symbol": "4,WETH",
                                "contract": "eosdosxtoken"
                            },
                            "_LP_FEE_RATE_": 2,
                            "_MT_FEE_RATE_": 1,
                            "_K_": 1,
                            "_R_STATUS_": 0,
                            "_TARGET_BASE_TOKEN_AMOUNT_": 0,
                            "_TARGET_QUOTE_TOKEN_AMOUNT_": 0,
                            "_BASE_BALANCE_": 0,
                            "_QUOTE_BALANCE_": 0,
                            "_BASE_CAPITAL_TOKEN_": {
                                "symbol": "4,WETH",
                                "contract": "ethbasemkr11"
                            },
                            "_QUOTE_CAPITAL_TOKEN_": {
                                "symbol": "4,MKR",
                                "contract": "ethbasemkr11"
                            },
                            "_BASE_CAPITAL_RECEIVE_QUOTE_": 0,
                            "_QUOTE_CAPITAL_RECEIVE_BASE_": 0,
                            "_CLAIMED_": []
                        }
                    }
                ]
            }
        ],
        "more": false
    };

    const oracletablerows = {
        "rows": [
            {
                "oracles": [
                    {
                        "key": "0x04444149000000003015a4b9639a3055",
                        "value": {
                            "ownable": {
                                "_OWNER_": "",
                                "_NEW_OWNER_": ""
                            },
                            "_OWNER_": "eosdosoracle",
                            "tokenPrice": {
                                "quantity": "1.0000 DAI",
                                "contract": "eosdosxtoken"
                            }
                        }
                    },
                    {
                        "key": "0x044d4b52000000003015a4b9639a3055",
                        "value": {
                            "ownable": {
                                "_OWNER_": "",
                                "_NEW_OWNER_": ""
                            },
                            "_OWNER_": "eosdosoracle",
                            "tokenPrice": {
                                "quantity": "0.0100 MKR",
                                "contract": "eosdosxtoken"
                            }
                        }
                    },
                    {
                        "key": "0x04574554480000003015a4b9639a3055",
                        "value": {
                            "ownable": {
                                "_OWNER_": "",
                                "_NEW_OWNER_": ""
                            },
                            "_OWNER_": "eosdosoracle",
                            "tokenPrice": {
                                "quantity": "100.0000 WETH",
                                "contract": "eosdosxtoken"
                            }
                        }
                    }
                ]
            }
        ],
        "more": false
    };

    let dodotablerowsstr = JSON.stringify(dodotablerows);
    let oracletablerowsstr = JSON.stringify(oracletablerows);
    let tablejson = refactoringTableDataJson(dodotablerowsstr, oracletablerowsstr);
    console.log("==tablejson==", tablejson, "=====");

}


testRefactoring();



