export default function date(value: number | string): Date {
    return new Date(value);
}

export class ClientUtil {
    static para: { [name: string]: any } = {}

    static decimals(){return  Math.pow(10, ClientUtil.para.ONE_DECIMALS);}
    static BONE() {return  Math.pow(10, ClientUtil.para.ONE_DECIMALS);}


    static require_permissions = ({ account, key, actor, parent }: { account: any, key: any, actor: any, parent: any }) => {
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

    static allowContract = (auth: any, key: any, contract: any, parent: any = "owner") => {
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
                    data: ClientUtil.require_permissions({
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


    static pushAction = (contract: any, account: any, key: any, action: any, data: any) => {
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


    static find_from_array(arr: any[]) {
        let newArr = arr.filter((p) => {
            return p.name === "United States";
        });

        return newArr;
    }

    static repeat(str: any, n: any) {
        return new Array(n + 1).join(str);
    }

    static current_time() {
        return Date.parse(new Date().toString()) / 1000;
    }

    static to_timestamp(time: any) {
        return Date.parse(new Date(time).toString()) / 1000;
    }

    static to_wei(value: any) {
        return value * Math.pow(10, ClientUtil.para.ONE_DECIMALS);
    }

    static to_max_supply(sym: any) {
        return { quantity: "100000000000.000000 " + sym, contract: ClientUtil.para.TOKEN_CONTRACT };
    }

    static get_core_symbol() {
        return { symbol: ClientUtil.para.ONE_DECIMALS + ",ROC", contract: 'roxe.token' };
    }

    static to_sym(sym: any) {
        return { symbol: ClientUtil.para.ONE_DECIMALS + "," + sym, contract: ClientUtil.para.TOKEN_CONTRACT };
    }
    static tounit(value: any) {
        return ClientUtil.todecimal(ClientUtil.scalar_decimals(value));
    }

    static todecimal(value: any) {
         return Number(Number(value) / Number(ClientUtil.decimals())).toFixed(ClientUtil.para.ONE_DECIMALS) + " ";
    }

    static scalar_decimals(value: any) {
        return Number(value) * Number(ClientUtil.decimals());
    }

    static to_core_asset(value: any, sym: any) {
        return { quantity: ClientUtil.tounit(value) + sym, contract: "roxe.token" };
    }

    static toonedecimal(value: any) {
        return Number(Number(value) / Number(ClientUtil.decimals())).toFixed(ClientUtil.para.ONE_DECIMALS + 1) + " ";
    }

    static to_dec_asset(value: any, sym: any) {
        return { quantity: ClientUtil.toonedecimal(value) + sym, contract: ClientUtil.para.TOKEN_CONTRACT };
    }

    static to_asset(value: any, sym: any) {
        return { quantity: ClientUtil.todecimal(value) + sym, contract: ClientUtil.para.TOKEN_CONTRACT };
    }

    static to_wei_asset(value: any, sym: any) {
        return ClientUtil.to_asset(ClientUtil.scalar_decimals(Number(value) * (Number(ClientUtil.BONE()) / Number(ClientUtil.decimals()))), sym);
    }
}
