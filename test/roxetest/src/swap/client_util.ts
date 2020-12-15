export default function date(value: number | string): Date {
    return new Date(value);
}

export class ClientUtil {
    static para:any;
    static decimals() { return Math.pow(10, ClientUtil.para.ONE_DECIMALS);}
    static BONE() { return Math.pow(10, ClientUtil.para.ONE_DECIMALS);}

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



    static to_wei(value: any) {
        return value * Math.pow(10, 6);
    }

    static to_max_supply(sym: any) {
        return { quantity: ClientUtil.todecimal(ClientUtil.para.MAX_SUPPLY,ClientUtil.para.sym2dec[sym])+sym, contract: ClientUtil.para.SWAP_CONTRACT };
    }

    static get_core_symbol() {
        return { symbol: "4,ROC", contract: 'roxe.token' };
    }

    static to_sym(sym: any) {
        return { symbol: ClientUtil.para.ONE_DECIMALS + "," + sym, contract: ClientUtil.para.SWAP_CONTRACT };
    }
    static tounit(value: any,decimal:Number) {
        return ClientUtil.todecimal(ClientUtil.scalar_decimals(value,decimal),decimal);
    }

    static todecimal(value: any, decimal: any = ClientUtil.para.ONE_DECIMALS) {
        return Number(Number(value) / Number(Math.pow(10, decimal))).toFixed(decimal) + " ";
    }

    static scalar_decimals(value: any,decimal:any) {
        return Number(value) * Number(Math.pow(10, decimal));
    }

    static to_core_asset(value: any, sym: any) {
        return { quantity: ClientUtil.tounit(value,ClientUtil.para.sym2dec[sym]) + sym, contract: "roxe.token" };
    }

    static to_asset(value: any, sym: any) {
        return { quantity: ClientUtil.todecimal(value,ClientUtil.para.sym2dec[sym]) + sym, contract: ClientUtil.para.SWAP_CONTRACT };
    }

    static to_wei_asset(value: any, sym: any) {
        return ClientUtil.to_asset(ClientUtil.scalar_decimals(value,ClientUtil.para.sym2dec[sym]), sym);
        // return ClientUtil.to_asset(ClientUtil.scalar_decimals(Number(value) * (Number(ClientUtil.BONE()) / Number(ClientUtil.decimals()))), sym);
    }
}
