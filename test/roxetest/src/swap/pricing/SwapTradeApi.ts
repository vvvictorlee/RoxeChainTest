const Decimal = require('decimal.js');
import { TransferFeeApi } from "./TransferFeeApi";
import { SwapPricingApi } from "./SwapPricingApi";

const debug = require("debug");
const swap = debug('swap');

debug.enable("*");


const {
    calcSpotPrice,
    calcOutGivenIn,
    calcInGivenOut,
    calcRelativeDiff,
} = require('./calc_comparisons');
const ONE_DECIMALS = 9;

const SYM2DEC: { [name: string]: any } = { "BTC": 8, "USD": 6 };

var s: { [name: string]: any } = {
};


var BONE = Math.pow(10, 9);
var swapFee = 1000;// ** -3; // 0.001;

var tokenInBalance = '4';
var tokenInDenorm = '10';

var currenttokenInBalance = tokenInBalance;

var tokenOutBalance = '12';
var tokenOutDenorm = '10';

var currenttokenOutBalance = Decimal(tokenOutBalance);

var sumWeights = Number(1);
var tokenInNorm = Decimal(tokenInDenorm).div(Decimal(sumWeights));
var tokenOutNorm = Decimal(tokenOutDenorm).div(Decimal(sumWeights));

var tfapi = new TransferFeeApi();


export class SwapTradeApi {
    async getPrecision(token: any) {
        if (SYM2DEC.hasOwnProperty(token)) {
            return SYM2DEC[token];
        }
        console.error("=======NOT FOUND==precision====", token);
        return ONE_DECIMALS;
    }

    async init(p: any) {
        console.log(p);
        s = JSON.parse(p);
        // s = refactoringPoolTableJson(s);
        await tfapi.fetchTransferFees();

    }

    async queryPool(tokenIn: any, tokenOut: any) {
        var pool_name = tokenIn.toLowerCase() + "2" + tokenOut.toLowerCase() + "33333";
        pool_name = pool_name.substr(0, 12);
        // var testpool_name = { "dai2weth": "pool4", "weth2dai": "pool3" };
        // pool_name = testpool_name[pool_name];

        // console.log(pool_name);
        // console.log("======dodo_name======",dodo_name);
        var pool = s[Object.keys(s)[0]];
        if (s.hasOwnProperty(pool_name)) {
            pool = s[pool_name];
        }

        // console.log(pool);

        return pool;
    }

    async setParameter(tokenIn: any, tokenOut: any) {
        var pool = await this.queryPool(tokenIn, tokenOut);
        currenttokenInBalance = Decimal(pool[tokenIn].balance).div(Decimal(BONE));
        currenttokenOutBalance = Decimal(pool[tokenOut].balance).div(Decimal(BONE));
        tokenInDenorm = pool[tokenIn].denorm;
        tokenOutDenorm = pool[tokenOut].denorm;
        swapFee = Decimal(pool.swapFee).div(Decimal(BONE));
        sumWeights = pool.totalWeight;
        tokenInNorm = Decimal(tokenInDenorm).div(Decimal(sumWeights));
        tokenOutNorm = Decimal(tokenOutDenorm).div(Decimal(sumWeights));
    }

    async convert_one_decimals(amount: any, token: any, signed_one: any = 1) {
        const p = await this.getPrecision(token);
        if (p < ONE_DECIMALS) {
            const d = ONE_DECIMALS - p;
            return amount * Math.pow(10, d * signed_one);
        }

        return amount;
    }

    async sell(tokenAmountIn: any, tokenIn: any, tokenOut: any) {
        await this.setParameter(tokenIn, tokenOut);
        var expected = calcOutGivenIn(
            currenttokenInBalance,
            tokenInNorm,
            currenttokenOutBalance,
            tokenOutNorm,
            tokenAmountIn,
            swapFee
        );
        swap("==expected before transfer fee==", expected);
        const fee = await tfapi.getTransferFee(expected, tokenOut, true);
        expected -= fee;
        const p = await this.getPrecision(tokenOut);
        swap("==expected=after==transfer fee==", expected);
        return Decimal(expected).toFixed(p);
    }

    async spotPrice(tokenIn: any, tokenOut: any) {
        await this.setParameter(tokenIn, tokenOut);
        var expected = calcSpotPrice(
            currenttokenInBalance,
            tokenInNorm,
            currenttokenOutBalance,
            tokenOutNorm,
            swapFee
        );

        return Decimal(expected).floor(ONE_DECIMALS);
    }

    async buy(tokenAmountOut: any, tokenIn: any, tokenOut: any) {
        await this.setParameter(tokenIn, tokenOut);
        swap("==tokenAmountOut=before=", tokenAmountOut);
        const fee = await tfapi.getTransferFee(tokenAmountOut, tokenOut);
        tokenAmountOut += fee;
        swap("==tokenAmountOut=after=", tokenAmountOut);
        var expected = calcInGivenOut(
            currenttokenOutBalance,
            tokenOutNorm,
            currenttokenInBalance,
            tokenInNorm,
            tokenAmountOut,
            swapFee
        );
        const p = await this.getPrecision(tokenOut);
        swap("==expected==", expected);
        return Decimal(expected).toFixed(p);
    }

}

(async function () {
    const p = new SwapPricingApi();
    const t = new SwapTradeApi();
    const pool = await p.getPool();
    await t.init(pool);
    const amounts = [1, 100, 10000];
    for (let a of amounts) {
        const sr = await t.sell(a, "BTC", "USD");
        console.log("==sell==", a, "==", sr);
        const br = await t.buy(a, "BTC", "USD");
        console.log("==buy==", a, "==", br);
    }
})();




// module.exports = {
//     init,
//     buy,
//     sell,
// };