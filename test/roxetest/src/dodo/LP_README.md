
## 查询流动性

### 查询请求
```
curl -X POST --url http://172.17.3.161:8888/v1/chain/get_table_rows -d '{  
   "scope":"eosdoseosdos",
   "code":"eosdoseosdos",
   "table":"dodos",
   "json":true
}' |jq
```
### 查询结果

```
{
      "dodo": "usd2gbp44444",
      "dodos": {
        "dodo_name": "usd2gbp44444",
        "initownable": { "_OWNER_": "roxeearntest", "_NEW_OWNER_": "" },
        "guard": { "_ENTERED_": 0 },
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
        "_SUPERVISOR_": "roxeearntest",
        "_MAINTAINER_": "roxeearntest",
        "_BASE_TOKEN_": { "symbol": "6,USD", "contract": "roxe.ro" },
        "_QUOTE_TOKEN_": { "symbol": "6,GBP", "contract": "roxe.ro" },
        "_ORACLE_": { "symbol": "6,USD", "contract": "roxe.ro" },
        "_LP_FEE_RATE_": 595,
        "_MT_FEE_RATE_": 105,
        "_K_": 100,
        "_R_STATUS_": 2,
        "_TARGET_BASE_TOKEN_AMOUNT_": 79522236,
        "_TARGET_QUOTE_TOKEN_AMOUNT_": 1422412602,
        "_BASE_BALANCE_": 1556407328,
        "_QUOTE_BALANCE_": 329881500,
        "_BASE_CAPITAL_TOKEN_": {
          "symbol": "6,USD",
          "contract": "usd2gbp44444"
        },
        "_QUOTE_CAPITAL_TOKEN_": {
          "symbol": "6,GBP",
          "contract": "usd2gbp44444"
        },
        "_BASE_CAPITAL_RECEIVE_QUOTE_": 0,
        "_QUOTE_CAPITAL_RECEIVE_BASE_": 0,
        "_CLAIMED_": []
      }
    },
```

* "_TARGET_BASE_TOKEN_AMOUNT_": 79522236,
* "_TARGET_QUOTE_TOKEN_AMOUNT_": 1422412602,

## 添加流动性
### 添加Base流动性 `depositbase` 

#### 请求`depositbase` action
```
{
  "actions": [
    {
      "account": "roxe.earn",
      "name": "depositbase",
      "authorization": [{ "actor": "roxe.earn", "permission": "active" }],
      "data": {
        "msg_sender": "roxe.earn",
        "dodo_name": "re.usdgbp",
        "amt": { "quantity": "952.000000 USD", "contract": "roxe.ro" }
      }
    }
  ],
  "pub_keys": ["ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH"]
}

```

### 添加quote流动性`depositquote`
#### 请求`depositquote`action 

```
{
  "actions": [
    {
      "account": "roxe.earn",
      "name": "depositquote",
      "authorization": [{ "actor": "roxe.earn", "permission": "active" }],
      "data": {
        "msg_sender": "roxe.earn",
        "dodo_name": "re.usdgbp",
        "amt": { "quantity": "700.000000 GBP", "contract": "roxe.ro" }
      }
    }
  ],
  "pub_keys": ["ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH"]
}
```

### 提取Base流行性 `withdrawbase`
#### 请求  `withdrawbase` action

```
{
  "actions": [
    {
      "account": "roxe.earn",
      "name": "withdrawbase",
      "authorization": [{ "actor": "roxe.earn", "permission": "active" }],
      "data": {
        "msg_sender": "roxe.earn",
        "dodo_name": "re.usdgbp",
        "amt": { "quantity": "1300.000000 USD", "contract": "roxe.ro" }
      }
    }
  ],
  "pub_keys": ["ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH"]
}
```

### 提取Quote流动性`withdrawquote`
#### 请求`withdrawquote`action 

```
{
  "actions": [
    {
      "account": "roxe.earn",
      "name": "withdrawquote",
      "authorization": [{ "actor": "roxe.earn", "permission": "active" }],
      "data": {
        "msg_sender": "roxe.earn",
        "dodo_name": "re.usdgbp",
        "amt": { "quantity": "1200.000000 GBP", "contract": "roxe.ro" }
      }
    }
  ],
  "pub_keys": ["ROXE6ftHab5c81LAcL1izHNyFVawBaZTEpFDXN3BYybx1pcJHQsTmH"]
}
```
### Action trace
#### 添加Base流动性 `depositbase` action trace
```
{
  "transaction_id": "f35b67f71e4738c7d4ac9a8b821fb78814845dbb23e00daedb32f8a6b7d212c8",
  "processed": {
    "id": "f35b67f71e4738c7d4ac9a8b821fb78814845dbb23e00daedb32f8a6b7d212c8",
    "block_num": 25298787,
    "block_time": "2021-02-23T06:17:09.500",
    "producer_block_id": null,
    "receipt": {
      "status": "executed",
      "cpu_usage_us": 3548,
      "net_usage_words": 17
    },
    "elapsed": 3548,
    "net_usage": 136,
    "scheduled": false,
    "action_traces": [
      {
        "action_ordinal": 1,
        "creator_action_ordinal": 0,
        "closest_unnotified_ancestor_action_ordinal": 0,
        "receipt": {
          "receiver": "roxe.earn",
          "act_digest": "4dd3edb3a499370dbfaf3bea20e5383c5f6a9ad30d9bc167f1322a254640f9f8",
          "global_sequence": 43783310,
          "recv_sequence": 1943056,
          "auth_sequence": [["roxe.earn", 71]],
          "code_sequence": 3,
          "abi_sequence": 3
        },
        "receiver": "roxe.earn",
        "act": {
          "account": "roxe.earn",
          "name": "depositbase",
          "authorization": [{ "actor": "roxe.earn", "permission": "active" }],
          "data": {
            "msg_sender": "roxe.earn",
            "dodo_name": "re.usdgbp",
            "amt": { "quantity": "952.000000 USD", "contract": "roxe.ro" }
          },
          "hex_data": "000098d728a03abd0000a88725ac81ba005ebe38000000000655534400000000000000805ea03abd"
        },
        "context_free": false,
        "elapsed": 1616,
        "console": "",
        "trx_id": "f35b67f71e4738c7d4ac9a8b821fb78814845dbb23e00daedb32f8a6b7d212c8",
        "block_num": 25298787,
        "block_time": "2021-02-23T06:17:09.500",
        "producer_block_id": null,
        "account_ram_deltas": [],
        "except": null,
        "error_code": null,
        "inline_traces": [
          {
            "action_ordinal": 2,
            "creator_action_ordinal": 1,
            "closest_unnotified_ancestor_action_ordinal": 1,
            "receipt": {
              "receiver": "roxe.ro",
              "act_digest": "f275d7e28b44e51fbf0016ef3ce1e092fac88676e841d3e47ce1fa96e8b58ad3",
              "global_sequence": 43783311,
              "recv_sequence": 5831793,
              "auth_sequence": [["roxe.earn", 72]],
              "code_sequence": 5,
              "abi_sequence": 3
            },
            "receiver": "roxe.ro",
            "act": {
              "account": "roxe.ro",
              "name": "transfer",
              "authorization": [
                { "actor": "roxe.earn", "permission": "active" }
              ],
              "data": {
                "from": "roxe.earn",
                "to": "re.usdgbp",
                "quantity": "952.000000 USD",
                "memo": ""
              },
              "hex_data": "000098d728a03abd0000a88725ac81ba005ebe3800000000065553440000000000"
            },
            "context_free": false,
            "elapsed": 481,
            "console": "",
            "trx_id": "f35b67f71e4738c7d4ac9a8b821fb78814845dbb23e00daedb32f8a6b7d212c8",
            "block_num": 25298787,
            "block_time": "2021-02-23T06:17:09.500",
            "producer_block_id": null,
            "account_ram_deltas": [],
            "except": null,
            "error_code": null,
            "inline_traces": [
              {
                "action_ordinal": 3,
                "creator_action_ordinal": 2,
                "closest_unnotified_ancestor_action_ordinal": 2,
                "receipt": {
                  "receiver": "roxe.earn",
                  "act_digest": "f275d7e28b44e51fbf0016ef3ce1e092fac88676e841d3e47ce1fa96e8b58ad3",
                  "global_sequence": 43783312,
                  "recv_sequence": 1943057,
                  "auth_sequence": [["roxe.earn", 73]],
                  "code_sequence": 5,
                  "abi_sequence": 3
                },
                "receiver": "roxe.earn",
                "act": {
                  "account": "roxe.ro",
                  "name": "transfer",
                  "authorization": [
                    { "actor": "roxe.earn", "permission": "active" }
                  ],
                  "data": {
                    "from": "roxe.earn",
                    "to": "re.usdgbp",
                    "quantity": "952.000000 USD",
                    "memo": ""
                  },
                  "hex_data": "000098d728a03abd0000a88725ac81ba005ebe3800000000065553440000000000"
                },
                "context_free": false,
                "elapsed": 479,
                "console": "",
                "trx_id": "f35b67f71e4738c7d4ac9a8b821fb78814845dbb23e00daedb32f8a6b7d212c8",
                "block_num": 25298787,
                "block_time": "2021-02-23T06:17:09.500",
                "producer_block_id": null,
                "account_ram_deltas": [],
                "except": null,
                "error_code": null,
                "inline_traces": []
              },
              {
                "action_ordinal": 4,
                "creator_action_ordinal": 2,
                "closest_unnotified_ancestor_action_ordinal": 2,
                "receipt": {
                  "receiver": "re.usdgbp",
                  "act_digest": "f275d7e28b44e51fbf0016ef3ce1e092fac88676e841d3e47ce1fa96e8b58ad3",
                  "global_sequence": 43783313,
                  "recv_sequence": 2428062,
                  "auth_sequence": [["roxe.earn", 74]],
                  "code_sequence": 5,
                  "abi_sequence": 3
                },
                "receiver": "re.usdgbp",
                "act": {
                  "account": "roxe.ro",
                  "name": "transfer",
                  "authorization": [
                    { "actor": "roxe.earn", "permission": "active" }
                  ],
                  "data": {
                    "from": "roxe.earn",
                    "to": "re.usdgbp",
                    "quantity": "952.000000 USD",
                    "memo": ""
                  },
                  "hex_data": "000098d728a03abd0000a88725ac81ba005ebe3800000000065553440000000000"
                },
                "context_free": false,
                "elapsed": 17,
                "console": "",
                "trx_id": "f35b67f71e4738c7d4ac9a8b821fb78814845dbb23e00daedb32f8a6b7d212c8",
                "block_num": 25298787,
                "block_time": "2021-02-23T06:17:09.500",
                "producer_block_id": null,
                "account_ram_deltas": [],
                "except": null,
                "error_code": null,
                "inline_traces": []
              },
              {
                "action_ordinal": 5,
                "creator_action_ordinal": 2,
                "closest_unnotified_ancestor_action_ordinal": 2,
                "receipt": {
                  "receiver": "roxe.ro",
                  "act_digest": "8e3d61a784e97863757e43f5e2fb799c07fc58aa1ba6e62dbc393044f27835cd",
                  "global_sequence": 43783314,
                  "recv_sequence": 5831794,
                  "auth_sequence": [["roxe.earn", 75]],
                  "code_sequence": 5,
                  "abi_sequence": 3
                },
                "receiver": "roxe.ro",
                "act": {
                  "account": "roxe.ro",
                  "name": "transfer",
                  "authorization": [
                    { "actor": "roxe.earn", "permission": "active" }
                  ],
                  "data": {
                    "from": "roxe.earn",
                    "to": "roxe.saving",
                    "quantity": "0.100000 USD",
                    "memo": "transfer fee"
                  },
                  "hex_data": "000098d728a03abd00d874db60a03abda08601000000000006555344000000000c7472616e7366657220666565"
                },
                "context_free": false,
                "elapsed": 115,
                "console": "",
                "trx_id": "f35b67f71e4738c7d4ac9a8b821fb78814845dbb23e00daedb32f8a6b7d212c8",
                "block_num": 25298787,
                "block_time": "2021-02-23T06:17:09.500",
                "producer_block_id": null,
                "account_ram_deltas": [],
                "except": null,
                "error_code": null,
                "inline_traces": [
                  {
                    "action_ordinal": 6,
                    "creator_action_ordinal": 5,
                    "closest_unnotified_ancestor_action_ordinal": 5,
                    "receipt": {
                      "receiver": "roxe.earn",
                      "act_digest": "8e3d61a784e97863757e43f5e2fb799c07fc58aa1ba6e62dbc393044f27835cd",
                      "global_sequence": 43783315,
                      "recv_sequence": 1943058,
                      "auth_sequence": [["roxe.earn", 76]],
                      "code_sequence": 5,
                      "abi_sequence": 3
                    },
                    "receiver": "roxe.earn",
                    "act": {
                      "account": "roxe.ro",
                      "name": "transfer",
                      "authorization": [
                        { "actor": "roxe.earn", "permission": "active" }
                      ],
                      "data": {
                        "from": "roxe.earn",
                        "to": "roxe.saving",
                        "quantity": "0.100000 USD",
                        "memo": "transfer fee"
                      },
                      "hex_data": "000098d728a03abd00d874db60a03abda08601000000000006555344000000000c7472616e7366657220666565"
                    },
                    "context_free": false,
                    "elapsed": 500,
                    "console": "",
                    "trx_id": "f35b67f71e4738c7d4ac9a8b821fb78814845dbb23e00daedb32f8a6b7d212c8",
                    "block_num": 25298787,
                    "block_time": "2021-02-23T06:17:09.500",
                    "producer_block_id": null,
                    "account_ram_deltas": [],
                    "except": null,
                    "error_code": null,
                    "inline_traces": []
                  },
                  {
                    "action_ordinal": 7,
                    "creator_action_ordinal": 5,
                    "closest_unnotified_ancestor_action_ordinal": 5,
                    "receipt": {
                      "receiver": "roxe.saving",
                      "act_digest": "8e3d61a784e97863757e43f5e2fb799c07fc58aa1ba6e62dbc393044f27835cd",
                      "global_sequence": 43783316,
                      "recv_sequence": 2915559,
                      "auth_sequence": [["roxe.earn", 77]],
                      "code_sequence": 5,
                      "abi_sequence": 3
                    },
                    "receiver": "roxe.saving",
                    "act": {
                      "account": "roxe.ro",
                      "name": "transfer",
                      "authorization": [
                        { "actor": "roxe.earn", "permission": "active" }
                      ],
                      "data": {
                        "from": "roxe.earn",
                        "to": "roxe.saving",
                        "quantity": "0.100000 USD",
                        "memo": "transfer fee"
                      },
                      "hex_data": "000098d728a03abd00d874db60a03abda08601000000000006555344000000000c7472616e7366657220666565"
                    },
                    "context_free": false,
                    "elapsed": 8,
                    "console": "",
                    "trx_id": "f35b67f71e4738c7d4ac9a8b821fb78814845dbb23e00daedb32f8a6b7d212c8",
                    "block_num": 25298787,
                    "block_time": "2021-02-23T06:17:09.500",
                    "producer_block_id": null,
                    "account_ram_deltas": [],
                    "except": null,
                    "error_code": null,
                    "inline_traces": []
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "account_ram_delta": null,
    "except": null,
    "error_code": null
  }
}
```

#### 添加quote流动性`depositquote` action trace

```
{
  "transaction_id": "dd7b825001e455e20ecab6be5d1081ab7d9d88b12434e3a7d2941b6b078ba764",
  "processed": {
    "id": "dd7b825001e455e20ecab6be5d1081ab7d9d88b12434e3a7d2941b6b078ba764",
    "block_num": 25298787,
    "block_time": "2021-02-23T06:17:09.500",
    "producer_block_id": null,
    "receipt": {
      "status": "executed",
      "cpu_usage_us": 2626,
      "net_usage_words": 17
    },
    "elapsed": 2626,
    "net_usage": 136,
    "scheduled": false,
    "action_traces": [
      {
        "action_ordinal": 1,
        "creator_action_ordinal": 0,
        "closest_unnotified_ancestor_action_ordinal": 0,
        "receipt": {
          "receiver": "roxe.earn",
          "act_digest": "72889525c51af571a270ea0bfd508e6e55f5d8d24b8154101f4d4825ca9a151b",
          "global_sequence": 43783317,
          "recv_sequence": 1943059,
          "auth_sequence": [["roxe.earn", 78]],
          "code_sequence": 3,
          "abi_sequence": 3
        },
        "receiver": "roxe.earn",
        "act": {
          "account": "roxe.earn",
          "name": "depositquote",
          "authorization": [{ "actor": "roxe.earn", "permission": "active" }],
          "data": {
            "msg_sender": "roxe.earn",
            "dodo_name": "re.usdgbp",
            "amt": { "quantity": "700.000000 GBP", "contract": "roxe.ro" }
          },
          "hex_data": "000098d728a03abd0000a88725ac81ba0027b929000000000647425000000000000000805ea03abd"
        },
        "context_free": false,
        "elapsed": 948,
        "console": "",
        "trx_id": "dd7b825001e455e20ecab6be5d1081ab7d9d88b12434e3a7d2941b6b078ba764",
        "block_num": 25298787,
        "block_time": "2021-02-23T06:17:09.500",
        "producer_block_id": null,
        "account_ram_deltas": [],
        "except": null,
        "error_code": null,
        "inline_traces": [
          {
            "action_ordinal": 2,
            "creator_action_ordinal": 1,
            "closest_unnotified_ancestor_action_ordinal": 1,
            "receipt": {
              "receiver": "roxe.ro",
              "act_digest": "dfb5389eb0134c3f9f9bd1d119f8dd03275087ee03e43aa12361c5f91ae867a5",
              "global_sequence": 43783318,
              "recv_sequence": 5831795,
              "auth_sequence": [["roxe.earn", 79]],
              "code_sequence": 5,
              "abi_sequence": 3
            },
            "receiver": "roxe.ro",
            "act": {
              "account": "roxe.ro",
              "name": "transfer",
              "authorization": [
                { "actor": "roxe.earn", "permission": "active" }
              ],
              "data": {
                "from": "roxe.earn",
                "to": "re.usdgbp",
                "quantity": "700.000000 GBP",
                "memo": ""
              },
              "hex_data": "000098d728a03abd0000a88725ac81ba0027b92900000000064742500000000000"
            },
            "context_free": false,
            "elapsed": 216,
            "console": "",
            "trx_id": "dd7b825001e455e20ecab6be5d1081ab7d9d88b12434e3a7d2941b6b078ba764",
            "block_num": 25298787,
            "block_time": "2021-02-23T06:17:09.500",
            "producer_block_id": null,
            "account_ram_deltas": [],
            "except": null,
            "error_code": null,
            "inline_traces": [
              {
                "action_ordinal": 3,
                "creator_action_ordinal": 2,
                "closest_unnotified_ancestor_action_ordinal": 2,
                "receipt": {
                  "receiver": "roxe.earn",
                  "act_digest": "dfb5389eb0134c3f9f9bd1d119f8dd03275087ee03e43aa12361c5f91ae867a5",
                  "global_sequence": 43783319,
                  "recv_sequence": 1943060,
                  "auth_sequence": [["roxe.earn", 80]],
                  "code_sequence": 5,
                  "abi_sequence": 3
                },
                "receiver": "roxe.earn",
                "act": {
                  "account": "roxe.ro",
                  "name": "transfer",
                  "authorization": [
                    { "actor": "roxe.earn", "permission": "active" }
                  ],
                  "data": {
                    "from": "roxe.earn",
                    "to": "re.usdgbp",
                    "quantity": "700.000000 GBP",
                    "memo": ""
                  },
                  "hex_data": "000098d728a03abd0000a88725ac81ba0027b92900000000064742500000000000"
                },
                "context_free": false,
                "elapsed": 483,
                "console": "",
                "trx_id": "dd7b825001e455e20ecab6be5d1081ab7d9d88b12434e3a7d2941b6b078ba764",
                "block_num": 25298787,
                "block_time": "2021-02-23T06:17:09.500",
                "producer_block_id": null,
                "account_ram_deltas": [],
                "except": null,
                "error_code": null,
                "inline_traces": []
              },
              {
                "action_ordinal": 4,
                "creator_action_ordinal": 2,
                "closest_unnotified_ancestor_action_ordinal": 2,
                "receipt": {
                  "receiver": "re.usdgbp",
                  "act_digest": "dfb5389eb0134c3f9f9bd1d119f8dd03275087ee03e43aa12361c5f91ae867a5",
                  "global_sequence": 43783320,
                  "recv_sequence": 2428063,
                  "auth_sequence": [["roxe.earn", 81]],
                  "code_sequence": 5,
                  "abi_sequence": 3
                },
                "receiver": "re.usdgbp",
                "act": {
                  "account": "roxe.ro",
                  "name": "transfer",
                  "authorization": [
                    { "actor": "roxe.earn", "permission": "active" }
                  ],
                  "data": {
                    "from": "roxe.earn",
                    "to": "re.usdgbp",
                    "quantity": "700.000000 GBP",
                    "memo": ""
                  },
                  "hex_data": "000098d728a03abd0000a88725ac81ba0027b92900000000064742500000000000"
                },
                "context_free": false,
                "elapsed": 8,
                "console": "",
                "trx_id": "dd7b825001e455e20ecab6be5d1081ab7d9d88b12434e3a7d2941b6b078ba764",
                "block_num": 25298787,
                "block_time": "2021-02-23T06:17:09.500",
                "producer_block_id": null,
                "account_ram_deltas": [],
                "except": null,
                "error_code": null,
                "inline_traces": []
              },
              {
                "action_ordinal": 5,
                "creator_action_ordinal": 2,
                "closest_unnotified_ancestor_action_ordinal": 2,
                "receipt": {
                  "receiver": "roxe.ro",
                  "act_digest": "0a39917b6fb982ffb143599ff6f89e12adcf0745b2327b493eb71419e466442f",
                  "global_sequence": 43783321,
                  "recv_sequence": 5831796,
                  "auth_sequence": [["roxe.earn", 82]],
                  "code_sequence": 5,
                  "abi_sequence": 3
                },
                "receiver": "roxe.ro",
                "act": {
                  "account": "roxe.ro",
                  "name": "transfer",
                  "authorization": [
                    { "actor": "roxe.earn", "permission": "active" }
                  ],
                  "data": {
                    "from": "roxe.earn",
                    "to": "roxe.saving",
                    "quantity": "0.070000 GBP",
                    "memo": "transfer fee"
                  },
                  "hex_data": "000098d728a03abd00d874db60a03abd701101000000000006474250000000000c7472616e7366657220666565"
                },
                "context_free": false,
                "elapsed": 115,
                "console": "",
                "trx_id": "dd7b825001e455e20ecab6be5d1081ab7d9d88b12434e3a7d2941b6b078ba764",
                "block_num": 25298787,
                "block_time": "2021-02-23T06:17:09.500",
                "producer_block_id": null,
                "account_ram_deltas": [],
                "except": null,
                "error_code": null,
                "inline_traces": [
                  {
                    "action_ordinal": 6,
                    "creator_action_ordinal": 5,
                    "closest_unnotified_ancestor_action_ordinal": 5,
                    "receipt": {
                      "receiver": "roxe.earn",
                      "act_digest": "0a39917b6fb982ffb143599ff6f89e12adcf0745b2327b493eb71419e466442f",
                      "global_sequence": 43783322,
                      "recv_sequence": 1943061,
                      "auth_sequence": [["roxe.earn", 83]],
                      "code_sequence": 5,
                      "abi_sequence": 3
                    },
                    "receiver": "roxe.earn",
                    "act": {
                      "account": "roxe.ro",
                      "name": "transfer",
                      "authorization": [
                        { "actor": "roxe.earn", "permission": "active" }
                      ],
                      "data": {
                        "from": "roxe.earn",
                        "to": "roxe.saving",
                        "quantity": "0.070000 GBP",
                        "memo": "transfer fee"
                      },
                      "hex_data": "000098d728a03abd00d874db60a03abd701101000000000006474250000000000c7472616e7366657220666565"
                    },
                    "context_free": false,
                    "elapsed": 513,
                    "console": "",
                    "trx_id": "dd7b825001e455e20ecab6be5d1081ab7d9d88b12434e3a7d2941b6b078ba764",
                    "block_num": 25298787,
                    "block_time": "2021-02-23T06:17:09.500",
                    "producer_block_id": null,
                    "account_ram_deltas": [],
                    "except": null,
                    "error_code": null,
                    "inline_traces": []
                  },
                  {
                    "action_ordinal": 7,
                    "creator_action_ordinal": 5,
                    "closest_unnotified_ancestor_action_ordinal": 5,
                    "receipt": {
                      "receiver": "roxe.saving",
                      "act_digest": "0a39917b6fb982ffb143599ff6f89e12adcf0745b2327b493eb71419e466442f",
                      "global_sequence": 43783323,
                      "recv_sequence": 2915560,
                      "auth_sequence": [["roxe.earn", 84]],
                      "code_sequence": 5,
                      "abi_sequence": 3
                    },
                    "receiver": "roxe.saving",
                    "act": {
                      "account": "roxe.ro",
                      "name": "transfer",
                      "authorization": [
                        { "actor": "roxe.earn", "permission": "active" }
                      ],
                      "data": {
                        "from": "roxe.earn",
                        "to": "roxe.saving",
                        "quantity": "0.070000 GBP",
                        "memo": "transfer fee"
                      },
                      "hex_data": "000098d728a03abd00d874db60a03abd701101000000000006474250000000000c7472616e7366657220666565"
                    },
                    "context_free": false,
                    "elapsed": 8,
                    "console": "",
                    "trx_id": "dd7b825001e455e20ecab6be5d1081ab7d9d88b12434e3a7d2941b6b078ba764",
                    "block_num": 25298787,
                    "block_time": "2021-02-23T06:17:09.500",
                    "producer_block_id": null,
                    "account_ram_deltas": [],
                    "except": null,
                    "error_code": null,
                    "inline_traces": []
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "account_ram_delta": null,
    "except": null,
    "error_code": null
  }
}
```



#### 提取Base流行性 `withdrawbase` action trace
```
{
  "transaction_id": "46dd5c38ccfb1ea19c1585223bcd059bacb5b4d02ed554c50beecb9ef155a90e",
  "processed": {
    "id": "46dd5c38ccfb1ea19c1585223bcd059bacb5b4d02ed554c50beecb9ef155a90e",
    "block_num": 25299726,
    "block_time": "2021-02-23T06:24:59.000",
    "producer_block_id": null,
    "receipt": {
      "status": "executed",
      "cpu_usage_us": 2314,
      "net_usage_words": 17
    },
    "elapsed": 2314,
    "net_usage": 136,
    "scheduled": false,
    "action_traces": [
      {
        "action_ordinal": 1,
        "creator_action_ordinal": 0,
        "closest_unnotified_ancestor_action_ordinal": 0,
        "receipt": {
          "receiver": "roxe.earn",
          "act_digest": "2f9b9f2dcc6514a7b89f965403c610d073af2012b12b93b01424f26cc5ec522f",
          "global_sequence": 43784270,
          "recv_sequence": 1943064,
          "auth_sequence": [["roxe.earn", 86]],
          "code_sequence": 3,
          "abi_sequence": 3
        },
        "receiver": "roxe.earn",
        "act": {
          "account": "roxe.earn",
          "name": "withdrawbase",
          "authorization": [{ "actor": "roxe.earn", "permission": "active" }],
          "data": {
            "msg_sender": "roxe.earn",
            "dodo_name": "re.usdgbp",
            "amt": { "quantity": "1300.000000 USD", "contract": "roxe.ro" }
          },
          "hex_data": "000098d728a03abd0000a88725ac81ba006d7c4d000000000655534400000000000000805ea03abd"
        },
        "context_free": false,
        "elapsed": 1127,
        "console": "",
        "trx_id": "46dd5c38ccfb1ea19c1585223bcd059bacb5b4d02ed554c50beecb9ef155a90e",
        "block_num": 25299726,
        "block_time": "2021-02-23T06:24:59.000",
        "producer_block_id": null,
        "account_ram_deltas": [],
        "except": null,
        "error_code": null,
        "inline_traces": [
          {
            "action_ordinal": 2,
            "creator_action_ordinal": 1,
            "closest_unnotified_ancestor_action_ordinal": 1,
            "receipt": {
              "receiver": "roxe.ro",
              "act_digest": "622aca7d57d3959b6287d7c2c524cd92d40f355bf4bc2ad01a773d2b053e2ac3",
              "global_sequence": 43784271,
              "recv_sequence": 5831799,
              "auth_sequence": [["re.usdgbp", 5827352]],
              "code_sequence": 5,
              "abi_sequence": 3
            },
            "receiver": "roxe.ro",
            "act": {
              "account": "roxe.ro",
              "name": "transfer",
              "authorization": [
                { "actor": "re.usdgbp", "permission": "active" }
              ],
              "data": {
                "from": "re.usdgbp",
                "to": "roxe.earn",
                "quantity": "1300.000000 USD",
                "memo": ""
              },
              "hex_data": "0000a88725ac81ba000098d728a03abd006d7c4d00000000065553440000000000"
            },
            "context_free": false,
            "elapsed": 240,
            "console": "",
            "trx_id": "46dd5c38ccfb1ea19c1585223bcd059bacb5b4d02ed554c50beecb9ef155a90e",
            "block_num": 25299726,
            "block_time": "2021-02-23T06:24:59.000",
            "producer_block_id": null,
            "account_ram_deltas": [],
            "except": null,
            "error_code": null,
            "inline_traces": [
              {
                "action_ordinal": 3,
                "creator_action_ordinal": 2,
                "closest_unnotified_ancestor_action_ordinal": 2,
                "receipt": {
                  "receiver": "re.usdgbp",
                  "act_digest": "622aca7d57d3959b6287d7c2c524cd92d40f355bf4bc2ad01a773d2b053e2ac3",
                  "global_sequence": 43784272,
                  "recv_sequence": 2428066,
                  "auth_sequence": [["re.usdgbp", 5827353]],
                  "code_sequence": 5,
                  "abi_sequence": 3
                },
                "receiver": "re.usdgbp",
                "act": {
                  "account": "roxe.ro",
                  "name": "transfer",
                  "authorization": [
                    { "actor": "re.usdgbp", "permission": "active" }
                  ],
                  "data": {
                    "from": "re.usdgbp",
                    "to": "roxe.earn",
                    "quantity": "1300.000000 USD",
                    "memo": ""
                  },
                  "hex_data": "0000a88725ac81ba000098d728a03abd006d7c4d00000000065553440000000000"
                },
                "context_free": false,
                "elapsed": 5,
                "console": "",
                "trx_id": "46dd5c38ccfb1ea19c1585223bcd059bacb5b4d02ed554c50beecb9ef155a90e",
                "block_num": 25299726,
                "block_time": "2021-02-23T06:24:59.000",
                "producer_block_id": null,
                "account_ram_deltas": [],
                "except": null,
                "error_code": null,
                "inline_traces": []
              },
              {
                "action_ordinal": 4,
                "creator_action_ordinal": 2,
                "closest_unnotified_ancestor_action_ordinal": 2,
                "receipt": {
                  "receiver": "roxe.earn",
                  "act_digest": "622aca7d57d3959b6287d7c2c524cd92d40f355bf4bc2ad01a773d2b053e2ac3",
                  "global_sequence": 43784273,
                  "recv_sequence": 1943065,
                  "auth_sequence": [["re.usdgbp", 5827354]],
                  "code_sequence": 5,
                  "abi_sequence": 3
                },
                "receiver": "roxe.earn",
                "act": {
                  "account": "roxe.ro",
                  "name": "transfer",
                  "authorization": [
                    { "actor": "re.usdgbp", "permission": "active" }
                  ],
                  "data": {
                    "from": "re.usdgbp",
                    "to": "roxe.earn",
                    "quantity": "1300.000000 USD",
                    "memo": ""
                  },
                  "hex_data": "0000a88725ac81ba000098d728a03abd006d7c4d00000000065553440000000000"
                },
                "context_free": false,
                "elapsed": 467,
                "console": "",
                "trx_id": "46dd5c38ccfb1ea19c1585223bcd059bacb5b4d02ed554c50beecb9ef155a90e",
                "block_num": 25299726,
                "block_time": "2021-02-23T06:24:59.000",
                "producer_block_id": null,
                "account_ram_deltas": [],
                "except": null,
                "error_code": null,
                "inline_traces": []
              },
              {
                "action_ordinal": 5,
                "creator_action_ordinal": 2,
                "closest_unnotified_ancestor_action_ordinal": 2,
                "receipt": {
                  "receiver": "roxe.ro",
                  "act_digest": "024414956c30052c351241058085a14976230575518d61a74a2a173b8c4ba5b9",
                  "global_sequence": 43784274,
                  "recv_sequence": 5831800,
                  "auth_sequence": [["re.usdgbp", 5827355]],
                  "code_sequence": 5,
                  "abi_sequence": 3
                },
                "receiver": "roxe.ro",
                "act": {
                  "account": "roxe.ro",
                  "name": "transfer",
                  "authorization": [
                    { "actor": "re.usdgbp", "permission": "active" }
                  ],
                  "data": {
                    "from": "re.usdgbp",
                    "to": "roxe.saving",
                    "quantity": "0.100000 USD",
                    "memo": "transfer fee"
                  },
                  "hex_data": "0000a88725ac81ba00d874db60a03abda08601000000000006555344000000000c7472616e7366657220666565"
                },
                "context_free": false,
                "elapsed": 112,
                "console": "",
                "trx_id": "46dd5c38ccfb1ea19c1585223bcd059bacb5b4d02ed554c50beecb9ef155a90e",
                "block_num": 25299726,
                "block_time": "2021-02-23T06:24:59.000",
                "producer_block_id": null,
                "account_ram_deltas": [],
                "except": null,
                "error_code": null,
                "inline_traces": [
                  {
                    "action_ordinal": 6,
                    "creator_action_ordinal": 5,
                    "closest_unnotified_ancestor_action_ordinal": 5,
                    "receipt": {
                      "receiver": "re.usdgbp",
                      "act_digest": "024414956c30052c351241058085a14976230575518d61a74a2a173b8c4ba5b9",
                      "global_sequence": 43784275,
                      "recv_sequence": 2428067,
                      "auth_sequence": [["re.usdgbp", 5827356]],
                      "code_sequence": 5,
                      "abi_sequence": 3
                    },
                    "receiver": "re.usdgbp",
                    "act": {
                      "account": "roxe.ro",
                      "name": "transfer",
                      "authorization": [
                        { "actor": "re.usdgbp", "permission": "active" }
                      ],
                      "data": {
                        "from": "re.usdgbp",
                        "to": "roxe.saving",
                        "quantity": "0.100000 USD",
                        "memo": "transfer fee"
                      },
                      "hex_data": "0000a88725ac81ba00d874db60a03abda08601000000000006555344000000000c7472616e7366657220666565"
                    },
                    "context_free": false,
                    "elapsed": 4,
                    "console": "",
                    "trx_id": "46dd5c38ccfb1ea19c1585223bcd059bacb5b4d02ed554c50beecb9ef155a90e",
                    "block_num": 25299726,
                    "block_time": "2021-02-23T06:24:59.000",
                    "producer_block_id": null,
                    "account_ram_deltas": [],
                    "except": null,
                    "error_code": null,
                    "inline_traces": []
                  },
                  {
                    "action_ordinal": 7,
                    "creator_action_ordinal": 5,
                    "closest_unnotified_ancestor_action_ordinal": 5,
                    "receipt": {
                      "receiver": "roxe.saving",
                      "act_digest": "024414956c30052c351241058085a14976230575518d61a74a2a173b8c4ba5b9",
                      "global_sequence": 43784276,
                      "recv_sequence": 2915562,
                      "auth_sequence": [["re.usdgbp", 5827357]],
                      "code_sequence": 5,
                      "abi_sequence": 3
                    },
                    "receiver": "roxe.saving",
                    "act": {
                      "account": "roxe.ro",
                      "name": "transfer",
                      "authorization": [
                        { "actor": "re.usdgbp", "permission": "active" }
                      ],
                      "data": {
                        "from": "re.usdgbp",
                        "to": "roxe.saving",
                        "quantity": "0.100000 USD",
                        "memo": "transfer fee"
                      },
                      "hex_data": "0000a88725ac81ba00d874db60a03abda08601000000000006555344000000000c7472616e7366657220666565"
                    },
                    "context_free": false,
                    "elapsed": 4,
                    "console": "",
                    "trx_id": "46dd5c38ccfb1ea19c1585223bcd059bacb5b4d02ed554c50beecb9ef155a90e",
                    "block_num": 25299726,
                    "block_time": "2021-02-23T06:24:59.000",
                    "producer_block_id": null,
                    "account_ram_deltas": [],
                    "except": null,
                    "error_code": null,
                    "inline_traces": []
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "account_ram_delta": null,
    "except": null,
    "error_code": null
  }
}

```


#### 提取Quote流动性`withdrawquote` action trace
```
{
  "transaction_id": "e112ba43ffd9623ad6390a0284415d35dc7012f242706795c987696afe99d172",
  "processed": {
    "id": "e112ba43ffd9623ad6390a0284415d35dc7012f242706795c987696afe99d172",
    "block_num": 25299521,
    "block_time": "2021-02-23T06:23:16.500",
    "producer_block_id": null,
    "receipt": {
      "status": "executed",
      "cpu_usage_us": 11207,
      "net_usage_words": 17
    },
    "elapsed": 11207,
    "net_usage": 136,
    "scheduled": false,
    "action_traces": [
      {
        "action_ordinal": 1,
        "creator_action_ordinal": 0,
        "closest_unnotified_ancestor_action_ordinal": 0,
        "receipt": {
          "receiver": "roxe.earn",
          "act_digest": "3249a207a087a18f19a2771d1d2441b36671de3cda0806ab812dccd5377af84a",
          "global_sequence": 43784058,
          "recv_sequence": 1943062,
          "auth_sequence": [["roxe.earn", 85]],
          "code_sequence": 3,
          "abi_sequence": 3
        },
        "receiver": "roxe.earn",
        "act": {
          "account": "roxe.earn",
          "name": "withdrawquote",
          "authorization": [{ "actor": "roxe.earn", "permission": "active" }],
          "data": {
            "msg_sender": "roxe.earn",
            "dodo_name": "re.usdgbp",
            "amt": { "quantity": "1200.000000 GBP", "contract": "roxe.ro" }
          },
          "hex_data": "000098d728a03abd0000a88725ac81ba008c8647000000000647425000000000000000805ea03abd"
        },
        "context_free": false,
        "elapsed": 9995,
        "console": "",
        "trx_id": "e112ba43ffd9623ad6390a0284415d35dc7012f242706795c987696afe99d172",
        "block_num": 25299521,
        "block_time": "2021-02-23T06:23:16.500",
        "producer_block_id": null,
        "account_ram_deltas": [],
        "except": null,
        "error_code": null,
        "inline_traces": [
          {
            "action_ordinal": 2,
            "creator_action_ordinal": 1,
            "closest_unnotified_ancestor_action_ordinal": 1,
            "receipt": {
              "receiver": "roxe.ro",
              "act_digest": "5d87ad691c4a8686448887da35c907f6038543a22a2d81ac0902cfdbb00465a8",
              "global_sequence": 43784059,
              "recv_sequence": 5831797,
              "auth_sequence": [["re.usdgbp", 5827346]],
              "code_sequence": 5,
              "abi_sequence": 3
            },
            "receiver": "roxe.ro",
            "act": {
              "account": "roxe.ro",
              "name": "transfer",
              "authorization": [
                { "actor": "re.usdgbp", "permission": "active" }
              ],
              "data": {
                "from": "re.usdgbp",
                "to": "roxe.earn",
                "quantity": "1199.199813 GBP",
                "memo": ""
              },
              "hex_data": "0000a88725ac81ba000098d728a03abd45567a4700000000064742500000000000"
            },
            "context_free": false,
            "elapsed": 219,
            "console": "",
            "trx_id": "e112ba43ffd9623ad6390a0284415d35dc7012f242706795c987696afe99d172",
            "block_num": 25299521,
            "block_time": "2021-02-23T06:23:16.500",
            "producer_block_id": null,
            "account_ram_deltas": [],
            "except": null,
            "error_code": null,
            "inline_traces": [
              {
                "action_ordinal": 3,
                "creator_action_ordinal": 2,
                "closest_unnotified_ancestor_action_ordinal": 2,
                "receipt": {
                  "receiver": "re.usdgbp",
                  "act_digest": "5d87ad691c4a8686448887da35c907f6038543a22a2d81ac0902cfdbb00465a8",
                  "global_sequence": 43784060,
                  "recv_sequence": 2428064,
                  "auth_sequence": [["re.usdgbp", 5827347]],
                  "code_sequence": 5,
                  "abi_sequence": 3
                },
                "receiver": "re.usdgbp",
                "act": {
                  "account": "roxe.ro",
                  "name": "transfer",
                  "authorization": [
                    { "actor": "re.usdgbp", "permission": "active" }
                  ],
                  "data": {
                    "from": "re.usdgbp",
                    "to": "roxe.earn",
                    "quantity": "1199.199813 GBP",
                    "memo": ""
                  },
                  "hex_data": "0000a88725ac81ba000098d728a03abd45567a4700000000064742500000000000"
                },
                "context_free": false,
                "elapsed": 6,
                "console": "",
                "trx_id": "e112ba43ffd9623ad6390a0284415d35dc7012f242706795c987696afe99d172",
                "block_num": 25299521,
                "block_time": "2021-02-23T06:23:16.500",
                "producer_block_id": null,
                "account_ram_deltas": [],
                "except": null,
                "error_code": null,
                "inline_traces": []
              },
              {
                "action_ordinal": 4,
                "creator_action_ordinal": 2,
                "closest_unnotified_ancestor_action_ordinal": 2,
                "receipt": {
                  "receiver": "roxe.earn",
                  "act_digest": "5d87ad691c4a8686448887da35c907f6038543a22a2d81ac0902cfdbb00465a8",
                  "global_sequence": 43784061,
                  "recv_sequence": 1943063,
                  "auth_sequence": [["re.usdgbp", 5827348]],
                  "code_sequence": 5,
                  "abi_sequence": 3
                },
                "receiver": "roxe.earn",
                "act": {
                  "account": "roxe.ro",
                  "name": "transfer",
                  "authorization": [
                    { "actor": "re.usdgbp", "permission": "active" }
                  ],
                  "data": {
                    "from": "re.usdgbp",
                    "to": "roxe.earn",
                    "quantity": "1199.199813 GBP",
                    "memo": ""
                  },
                  "hex_data": "0000a88725ac81ba000098d728a03abd45567a4700000000064742500000000000"
                },
                "context_free": false,
                "elapsed": 483,
                "console": "",
                "trx_id": "e112ba43ffd9623ad6390a0284415d35dc7012f242706795c987696afe99d172",
                "block_num": 25299521,
                "block_time": "2021-02-23T06:23:16.500",
                "producer_block_id": null,
                "account_ram_deltas": [],
                "except": null,
                "error_code": null,
                "inline_traces": []
              },
              {
                "action_ordinal": 5,
                "creator_action_ordinal": 2,
                "closest_unnotified_ancestor_action_ordinal": 2,
                "receipt": {
                  "receiver": "roxe.ro",
                  "act_digest": "c468a68b7a05f2bbbebc790f8713a5875d21f7150ec7507b0722a7588dbaea06",
                  "global_sequence": 43784062,
                  "recv_sequence": 5831798,
                  "auth_sequence": [["re.usdgbp", 5827349]],
                  "code_sequence": 5,
                  "abi_sequence": 3
                },
                "receiver": "roxe.ro",
                "act": {
                  "account": "roxe.ro",
                  "name": "transfer",
                  "authorization": [
                    { "actor": "re.usdgbp", "permission": "active" }
                  ],
                  "data": {
                    "from": "re.usdgbp",
                    "to": "roxe.saving",
                    "quantity": "0.070000 GBP",
                    "memo": "transfer fee"
                  },
                  "hex_data": "0000a88725ac81ba00d874db60a03abd701101000000000006474250000000000c7472616e7366657220666565"
                },
                "context_free": false,
                "elapsed": 118,
                "console": "",
                "trx_id": "e112ba43ffd9623ad6390a0284415d35dc7012f242706795c987696afe99d172",
                "block_num": 25299521,
                "block_time": "2021-02-23T06:23:16.500",
                "producer_block_id": null,
                "account_ram_deltas": [],
                "except": null,
                "error_code": null,
                "inline_traces": [
                  {
                    "action_ordinal": 6,
                    "creator_action_ordinal": 5,
                    "closest_unnotified_ancestor_action_ordinal": 5,
                    "receipt": {
                      "receiver": "re.usdgbp",
                      "act_digest": "c468a68b7a05f2bbbebc790f8713a5875d21f7150ec7507b0722a7588dbaea06",
                      "global_sequence": 43784063,
                      "recv_sequence": 2428065,
                      "auth_sequence": [["re.usdgbp", 5827350]],
                      "code_sequence": 5,
                      "abi_sequence": 3
                    },
                    "receiver": "re.usdgbp",
                    "act": {
                      "account": "roxe.ro",
                      "name": "transfer",
                      "authorization": [
                        { "actor": "re.usdgbp", "permission": "active" }
                      ],
                      "data": {
                        "from": "re.usdgbp",
                        "to": "roxe.saving",
                        "quantity": "0.070000 GBP",
                        "memo": "transfer fee"
                      },
                      "hex_data": "0000a88725ac81ba00d874db60a03abd701101000000000006474250000000000c7472616e7366657220666565"
                    },
                    "context_free": false,
                    "elapsed": 4,
                    "console": "",
                    "trx_id": "e112ba43ffd9623ad6390a0284415d35dc7012f242706795c987696afe99d172",
                    "block_num": 25299521,
                    "block_time": "2021-02-23T06:23:16.500",
                    "producer_block_id": null,
                    "account_ram_deltas": [],
                    "except": null,
                    "error_code": null,
                    "inline_traces": []
                  },
                  {
                    "action_ordinal": 7,
                    "creator_action_ordinal": 5,
                    "closest_unnotified_ancestor_action_ordinal": 5,
                    "receipt": {
                      "receiver": "roxe.saving",
                      "act_digest": "c468a68b7a05f2bbbebc790f8713a5875d21f7150ec7507b0722a7588dbaea06",
                      "global_sequence": 43784064,
                      "recv_sequence": 2915561,
                      "auth_sequence": [["re.usdgbp", 5827351]],
                      "code_sequence": 5,
                      "abi_sequence": 3
                    },
                    "receiver": "roxe.saving",
                    "act": {
                      "account": "roxe.ro",
                      "name": "transfer",
                      "authorization": [
                        { "actor": "re.usdgbp", "permission": "active" }
                      ],
                      "data": {
                        "from": "re.usdgbp",
                        "to": "roxe.saving",
                        "quantity": "0.070000 GBP",
                        "memo": "transfer fee"
                      },
                      "hex_data": "0000a88725ac81ba00d874db60a03abd701101000000000006474250000000000c7472616e7366657220666565"
                    },
                    "context_free": false,
                    "elapsed": 5,
                    "console": "",
                    "trx_id": "e112ba43ffd9623ad6390a0284415d35dc7012f242706795c987696afe99d172",
                    "block_num": 25299521,
                    "block_time": "2021-02-23T06:23:16.500",
                    "producer_block_id": null,
                    "account_ram_deltas": [],
                    "except": null,
                    "error_code": null,
                    "inline_traces": []
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "account_ram_delta": null,
    "except": null,
    "error_code": null
  }
}
```