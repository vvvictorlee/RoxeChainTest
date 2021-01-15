
import { DosClient } from "../../dodo/dodo_client"
import { prettyJson } from "../../lib/prettyjson";
import { Dos } from "../../dodo/client_data_test";
import { PricingApi } from "../../dodo/pricing/PricingApi";
import { TraderPricingApi } from "../../dodo/pricing/PricingFormula";


describe('test chain', () => {
    // const endpointExtraSlash = 'http://localhost/';
    // const endpoint = 'http://localhost';
    // const fetchMock = fetch as any;
    // let jsonRpc: JsonRpc;
    // let rpc: any;
    // let client = new DosClient(Dos.USD2GBP, Dos.para);
    const papi = new PricingApi();
    const api = new TraderPricingApi();
    const TestDodo = {
        gbp2hkd44444: {
            _ORACLE_PRICE_: 10.472973,
            _LP_FEE_RATE_: 1,
            _MT_FEE_RATE_: 0,
            _K_: 1,
            _R_STATUS_: 2,
            _TARGET_BASE_TOKEN_AMOUNT_: '740000000000',
            _TARGET_QUOTE_TOKEN_AMOUNT_: '7749989527047',
            _BASE_BALANCE_: '740001000000',
            _QUOTE_BALANCE_: '7749979054074'
        },
        usd2gbp44444: {
            _ORACLE_PRICE_: 0.74,
            _LP_FEE_RATE_: 595,
            _MT_FEE_RATE_: 105,
            _K_: 100,
            _R_STATUS_: 1,
            _TARGET_BASE_TOKEN_AMOUNT_: '994984389360',
            _TARGET_QUOTE_TOKEN_AMOUNT_: '739567295754',
            _BASE_BALANCE_: '699279538448',
            _QUOTE_BALANCE_: '958398324877'
        },
        usd2hkd44444: {
            _ORACLE_PRICE_: 7.75,
            _LP_FEE_RATE_: 680,
            _MT_FEE_RATE_: 120,
            _K_: 100,
            _R_STATUS_: 2,
            _TARGET_BASE_TOKEN_AMOUNT_: '999887510956',
            _TARGET_QUOTE_TOKEN_AMOUNT_: '7749996743096',
            _BASE_BALANCE_: '1006750845804',
            _QUOTE_BALANCE_: '7696808415748'
        }
    };

    const TestDodoBalances = {
        gbp2hkd44444: {
            _BASE_BALANCE_: '1000',
            _QUOTE_BALANCE_: '7750'
        },
        usd2gbp44444: {
            _BASE_BALANCE_: '1000',
            _QUOTE_BALANCE_: '740'
        },
        usd2hkd44444: {
            _BASE_BALANCE_: '740',
            _QUOTE_BALANCE_: '7750'
        }
    };

    beforeEach(async () => {
        let dodosFromTestChain: any = await papi.getDodo();

        console.log(dodosFromTestChain);
        // prettyJson(dodosFromTestChain);
        // api.init(JSON.stringify(TestDodo));
        await api.init(JSON.stringify(dodosFromTestChain));
        // rpc = client.common_client.para.rpc;
        // fetchMock.resetMocks();
        // jsonRpc = new JsonRpc(endpointExtraSlash);
    });

    it('test from test chain', async () => {
        let amounts = [500000000];//1,1000,//1545915510000;//5945945990;//4400;
        const tokens = [["USD", "GBP"]];//, ["GBP", "HKD"], ["USD", "HKD"]
        for (let t of tokens) {
            const basetoken = t[0];
            const quotetoken = t[1];

            const dodo = await api.queryDodo(basetoken, quotetoken);
            // console.log("======************dodo=========",dodo);
            const bb = dodo._BASE_BALANCE_;
            // const qb = dodo._QUOTE_BALANCE_;
            const bbs = [bb, bb - 1, bb * 0.9, bb * 0.5];
            amounts = amounts.concat(bbs);
            // console.log(amounts);
            for (let amount of amounts) {
                let b: any = await api.queryBuyToken(amount, basetoken, quotetoken);
                console.log("=buy2 =", amount, " ", basetoken, "=by=", quotetoken, "===", (b), "=====");
                let s: any = await api.querySellToken(amount, basetoken, quotetoken);
                console.log("=sell =", amount, " ", basetoken, "=by=", quotetoken, "===", (s), "=====");
                {
                    let b: any = await api.queryBuyTokenDetail(amount, basetoken, quotetoken);
                    console.log("=******buy3 =", basetoken, "=by=", quotetoken, "===", (b), "=====");
                    let s: any = await api.querySellTokenDetail(amount, basetoken, quotetoken);
                    console.log("=******sell =", basetoken, "=by=", quotetoken, "===", (s), "=====");
                }
            }
        }

    });


    it('test from times of dodo balances', async () => {
        api.init(JSON.stringify(TestDodo));
        let amounts = [500];//1,1000,//1545915510000;//5945945990;//4400;
        const tokens = [["USD", "GBP"], ["GBP", "HKD"], ["USD", "HKD"]];//
        for (let x = 0; x < 3; ++x) {
            api.setTestDodo(TestDodoBalances, x);
            for (let r = 0; r < 3; ++r) {
                api.setTestRStatus(r);
                for (let t of tokens) {
                    const basetoken = t[0];
                    const quotetoken = t[1];

                    const dodo = await api.queryDodo(basetoken, quotetoken);
                    const bb = dodo._BASE_BALANCE_;
                    // const qb = dodo._QUOTE_BALANCE_;
                    const bbs = [bb, bb - 1, bb * 0.9, bb * 0.5];
                    amounts = amounts.concat(bbs);
                    for (let amount of amounts) {
                        let b: any = await api.queryBuyToken(amount, basetoken, quotetoken);
                        console.log("=buy2 =", amount, " ", basetoken, "=by=", quotetoken, "===", (b), "=====");
                        let s: any = await api.querySellToken(amount, basetoken, quotetoken);
                        console.log("=sell =", amount, " ", basetoken, "=by=", quotetoken, "===", (s), "=====");
                        {
                            let b: any = await api.queryBuyTokenDetail(amount, basetoken, quotetoken);
                            console.log("=******buy3 =", basetoken, "=by=", quotetoken, "===", (b), "=====");
                            let s: any = await api.querySellTokenDetail(amount, basetoken, quotetoken);
                            console.log("=******sell =", basetoken, "=by=", quotetoken, "===", (s), "=====");
                        }
                    }
                }
            }
        }

    });


    it.only('transfer fee test from test chain', async () => {
        let amounts = [500000000];//1,1000,//1545915510000;//5945945990;//4400;
        const tokens = [["USD", "GBP"]];//, ["GBP", "HKD"], ["USD", "HKD"]
        for (let t of tokens) {
            const basetoken = t[0];
            const quotetoken = t[1];
            for (let amount of amounts) {
                let b: any = await api.queryBuyToken(amount, basetoken, quotetoken);
                console.log("=buy2 =", amount, " ", basetoken, "=by=", quotetoken, "===", (b), "=====");
                let s: any = await api.querySellToken(amount, basetoken, quotetoken);
                console.log("=sell =", amount, " ", basetoken, "=by=", quotetoken, "===", (s), "=====");
                {
                    let b: any = await api.queryBuyTokenDetail(amount, basetoken, quotetoken);
                    console.log("=******buy3 =", basetoken, "=by=", quotetoken, "===", (b), "=====");
                    let s: any = await api.querySellTokenDetail(amount, basetoken, quotetoken);
                    console.log("=******sell =", basetoken, "=by=", quotetoken, "===", (s), "=====");
                }
            }
        }

    });






});



