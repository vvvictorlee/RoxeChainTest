export class ClientUtil {
    static para: any={ONE_DECIMALS:9,MAX_SUPPLY:10,sym2dec:[],CONTRACT:""};
    static decimals() { return Math.pow(10, ClientUtil.para.ONE_DECIMALS); }
    static BONE() { return Math.pow(10, ClientUtil.para.ONE_DECIMALS); }

    static to_wei(value: any, decimal: any = 6) {
        return value * Math.pow(10, decimal);
    }

    static to_max_supply(sym: any) {
        return { quantity: ClientUtil.todecimal(ClientUtil.para.MAX_SUPPLY, ClientUtil.para.sym2dec[sym]) + sym, contract: ClientUtil.para.CONTRACT };
    }

    static get_core_symbol() {
        return { symbol: "4,ROC", contract: 'roxe.token' };
    }

    static to_core_asset(value: any, sym: any) {
        return { quantity: ClientUtil.tounit(value, ClientUtil.para.sym2dec[sym]) + sym, contract: "roxe.token" };
    }

    static to_sym(sym: any) {
        return { symbol: ClientUtil.para.ONE_DECIMALS + "," + sym, contract: ClientUtil.para.CONTRACT };
    }
    static tounit(value: any, decimal: Number) {
        return ClientUtil.todecimal(ClientUtil.scalar_decimals(value, decimal), decimal);
    }

    static todecimal(value: any, decimal: any = ClientUtil.para.ONE_DECIMALS) {
        return Number(Number(value) / Number(Math.pow(10, decimal))).toFixed(decimal) + " ";
    }

    static scalar_decimals(value: any, decimal: any) {
        return Number(value) * Number(Math.pow(10, decimal));
    }

    static to_asset(value: any, sym: any) {
        return { quantity: ClientUtil.todecimal(value, ClientUtil.para.sym2dec[sym]) + sym, contract: ClientUtil.para.CONTRACT };
    }

    static to_wei_asset(value: any, sym: any) {
        return ClientUtil.to_asset(ClientUtil.scalar_decimals(value, ClientUtil.para.sym2dec[sym]), sym);
        // return ClientUtil.to_asset(ClientUtil.scalar_decimals(Number(value) * (Number(ClientUtil.BONE()) / Number(ClientUtil.decimals()))), sym);
    }
}
