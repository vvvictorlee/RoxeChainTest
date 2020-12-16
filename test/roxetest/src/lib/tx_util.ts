export class TxUtil {
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
                    data: TxUtil.require_permissions({
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
}
