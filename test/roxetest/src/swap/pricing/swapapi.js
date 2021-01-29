const Decimal = require('decimal.js');

const {
    calcSpotPrice,
    calcOutGivenIn,
    calcInGivenOut,
    calcRelativeDiff,
} = require('./calc_comparisons');
const ONE_DECIMALS = 9;

const SYM2DEC = { "BTC": 8, "USD": 6 };

var s = {
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

function getPrecision(token) {
    if (SYM2DEC.hasOwnProperty(token)) {
        return SYM2DEC[token];
    }
    console.error("=======NOT FOUND==precision====", token);
    return ONE_DECIMALS;
}

function init(p) {
    s = JSON.parse(p);
    // s = refactoringPoolTableJson(s);
}

function queryPool(tokenIn, tokenOut) {
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

function setParameter(tokenIn, tokenOut) {
    var pool = queryPool(tokenIn, tokenOut);
    currenttokenInBalance = Decimal(pool[tokenIn].balance).div(Decimal(BONE));
    currenttokenOutBalance = Decimal(pool[tokenOut].balance).div(Decimal(BONE));
    tokenInDenorm = pool[tokenIn].denorm;
    tokenOutDenorm = pool[tokenOut].denorm;
    swapFee = Decimal(pool.swapFee).div(Decimal(BONE));
    sumWeights = pool.totalWeight;
    tokenInNorm = Decimal(tokenInDenorm).div(Decimal(sumWeights));
    tokenOutNorm = Decimal(tokenOutDenorm).div(Decimal(sumWeights));
}

function convert_one_decimals( amount,token,signed_one = 1) {
    const p = getPrecision(token);
    if (p < ONE_DECIMALS) {
        const d = ONE_DECIMALS - p;
        return amount * Math.pow(10, d * signed_one);
    }

    return amount;
}

function sell(tokenAmountIn, tokenIn, tokenOut) {
    setParameter(tokenIn, tokenOut);
    var expected = calcOutGivenIn(
        currenttokenInBalance,
        tokenInNorm,
        currenttokenOutBalance,
        tokenOutNorm,
        tokenAmountIn,
        swapFee
    );

    return Number(expected).toFixed(ONE_DECIMALS);
}

function spotPrice(tokenIn, tokenOut) {
    setParameter(tokenIn, tokenOut);
    var expected = calcSpotPrice(
        currenttokenInBalance,
        tokenInNorm,
        currenttokenOutBalance,
        tokenOutNorm,
        swapFee
    );

    return Number(expected).toFixed(ONE_DECIMALS);
}

function buy(tokenAmountOut, tokenIn, tokenOut) {
    setParameter(tokenIn, tokenOut);
    var expected = calcInGivenOut(
        currenttokenOutBalance,
        tokenOutNorm,
        currenttokenInBalance,
        tokenInNorm,
        tokenAmountOut,
        swapFee
    );

    return Number(expected).toFixed(ONE_DECIMALS);
}


// console.log(givenIn(2, "WETH", "DAI"));
// console.log(givenOut(1, "WETH", "DAI"));
// console.log(sell(2, "DAI", "WETH"));
// console.log(buy(1, "DAI", "WETH"));



module.exports = {
    init,
    buy,
    sell,
};