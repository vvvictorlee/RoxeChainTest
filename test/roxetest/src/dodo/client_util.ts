export default function date(value: number | string): Date {
    return new Date(value);
}

export class ClientUtil {
    para: { [name: string]: any } = {}
 
    decimals = Math.pow(10, this.para.ONE_DECIMALS);
    BONE = Math.pow(10, this.para.ONE_DECIMALS);

   constructor(para: any) {
        this.para = para;
    }

    require_permissions = ({ account, key, actor, parent }: { account: any, key: any, actor: any, parent: any }) => {
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

    allowContract = (auth: any, key: any, contract: any, parent: any = "owner") => {
        let [account, permission] = auth.split("@");
        permission = permission || "active";
        parent = parent || "owner";
        let pub_keys = [key];
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
                    data: this.require_permissions({
                        account: account,
                        key: key,
                        actor: contract,
                        parent: parent
                    })
                }
            ], pub_keys
        };

        return tx_data;
    };


    pushAction = (contract: any, account: any, key: any, action: any, data: any) => {
        // let [account, permission] = auth.split("@");
        let permission = "active";
        const pub_keys = [key];
        const tx_data = {
            actions: [
                {
                    account: contract,
                    name: action,
                    authorization: [
                        {
                            actor: account,
                            permission: permission
                        }
                    ],
                    data: data
                }
            ],
            pub_keys: pub_keys
        };

        return tx_data;
    };


    find_from_array(arr: any[]) {
        let newArr = arr.filter((p) => {
            return p.name === "United States";
        });

        return newArr;
    }

    repeat(str: any, n: any) {
        return new Array(n + 1).join(str);
    }

    current_time() {
        return Date.parse(new Date().toString()) / 1000;
    }

    to_timestamp(time: any) {
        return Date.parse(new Date(time).toString()) / 1000;
    }

    to_wei(value: any) {
        return value * Math.pow(10, this.para.ONE_DECIMALS);
    }

    to_max_supply(sym: any) {
        return { quantity: "100000000000.000000 " + sym, contract: this.para.TOKEN_CONTRACT };
    }

    get_core_symbol() {
        return { symbol: this.para.ONE_DECIMALS + ",ROC", contract: 'roxe.token' };
    }

    to_sym(sym: any) {
        return { symbol: this.para.ONE_DECIMALS + "," + sym, contract: this.para.TOKEN_CONTRACT };
    }
    tounit(value: any) {
        return this.todecimal(this.scalar_decimals(value));
    }

    todecimal(value: any) {
        return Number(Number(value) / Number(this.decimals)).toFixed(this.para.ONE_DECIMALS) + " ";
    }

    scalar_decimals(value: any) {
        return Number(value) * Number(this.decimals);
    }

    to_core_asset(value: any, sym: any) {
        return { quantity: this.tounit(value) + sym, contract: "roxe.token" };
    }

    toonedecimal(value: any) {
        return Number(Number(value) / Number(this.decimals)).toFixed(this.para.ONE_DECIMALS + 1) + " ";
    }

    to_dec_asset(value: any, sym: any) {
        return { quantity: this.toonedecimal(value) + sym, contract: this.para.TOKEN_CONTRACT };
    }

    to_asset(value: any, sym: any) {
        return { quantity: this.todecimal(value) + sym, contract: this.para.TOKEN_CONTRACT };
    }

    to_wei_asset(value: any, sym: any) {
        return this.to_asset(this.scalar_decimals(Number(value) * (Number(this.BONE) / Number(this.decimals))), sym);
    }
}
