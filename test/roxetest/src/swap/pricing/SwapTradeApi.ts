const Decimal = require('decimal.js');
import { TransferFeeApi } from "./TransferFeeApi";

const {
    calcSpotPrice,
    calcOutGivenIn,
    calcInGivenOut,
    calcRelativeDiff,
} = require('./calc_comparisons');
const ONE_DECIMALS = 9;

const SYM2DEC = { "BTC": 8, "USD": 6 };

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
    async init(p: any) {
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

    async sell(tokenAmountIn: any, tokenIn: any, tokenOut: any) {
        this.setParameter(tokenIn, tokenOut);
        var expected = calcOutGivenIn(
            currenttokenInBalance,
            tokenInNorm,
            currenttokenOutBalance,
            tokenOutNorm,
            tokenAmountIn,
            swapFee
        );

        var transfer_fee = await tfapi.getTransferFee(expected, tokenOut, true);
        console.log("====expected,transfer_fee========", expected, transfer_fee);
        expected -= transfer_fee;
        console.log("====expected,after transfer_fee========", expected, transfer_fee);

        return Decimal(expected).floor(ONE_DECIMALS);
    }

    async spotPrice(tokenIn: any, tokenOut: any) {
        this.setParameter(tokenIn, tokenOut);
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
        this.setParameter(tokenIn, tokenOut);
        var transfer_fee = await tfapi.getTransferFee(tokenAmountOut, tokenOut);
        console.log("====tokenAmountOut,transfer_fee========", tokenAmountOut, transfer_fee);
        tokenAmountOut += transfer_fee;
        console.log("====tokenAmountOut,after transfer_fee========", tokenAmountOut, transfer_fee);

        var expected = calcInGivenOut(
            currenttokenOutBalance,
            tokenOutNorm,
            currenttokenInBalance,
            tokenInNorm,
            tokenAmountOut,
            swapFee
        );

        return Decimal(expected).floor(ONE_DECIMALS);
    }

}

// console.log(givenIn(2, "WETH", "DAI"));
// console.log(givenOut(1, "WETH", "DAI"));
// console.log(sell(2, "DAI", "WETH"));
// console.log(buy(1, "DAI", "WETH"));



// module.exports = {
//     init,
//     buy,
//     sell,
// };