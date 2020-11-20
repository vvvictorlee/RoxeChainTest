require("./client_data");


const require_permissions = ({ account, key, actor, parent }) => {
    return {
        account: `${account}`,
        permission: "active",
        parent: `${parent}`,
        auth: {
            threshold: 1,
            keys: [
                {
                    key: `${key}`,
                    weight: 1
                }
            ],
            accounts: [
                {
                    permission: {
                        actor: `${actor}`,
                        permission: "roxe.code"
                    },
                    weight: 1
                }
            ],
            waits: []
        }
    };
};

const allowContract = (auth, key, contract, parent) => {
    let [account, permission] = auth.split("@");
    permission = permission || "active";
    parent = parent || "owner";

    const tx_data = {
        actions: [
            {
                account: "roxe",
                name: "updateauth",
                authorization: [
                    {
                        actor: account,
                        permission: permission
                    }
                ],
                data: require_permissions({
                    account: account,
                    key: key,
                    actor: contract,
                    parent: parent
                })
            }
        ]
    };

    return tx_data;
};

// const pub = "EOS89PeKPVQG3f48KCX2NEg6HDW7YcoSracQMRpy46da74yi3fTLP";
// roxe.transaction(allowContract(nonadmin, pub, nonadmin));
//   await oraclizeContract.setup(oraclizeAccount, oracle, masterAccount, {
// 	authorization: [oraclizeAccount]
//   });



function find_from_array(arr) {
    let newArr = arr.filter(function (p) {
        return p.name === "United States";
    });

    return newArr;
}

function repeat(str, n) {
    return new Array(n + 1).join(str);
}

function current_time() {
    return Date.parse(new Date()) / 1000;
}

function to_timestamp(time) {
    return Date.parse(new Date(time)) / 1000;
}

function to_wei(value) {
    return value * Math.pow(10, 6);
}

function to_max_supply(sym) {
    return "100000000000.0000 " + sym + "@eoswapxtoken";
}

function to_asset(value, sym) {
    return value + ".0000 " + sym + "@eoswapxtoken";
}

function to_wei_asset(value, sym) {
    return to_asset(value + "00", sym);
}

