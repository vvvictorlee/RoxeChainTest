const Decimal = require('decimal.js');

const {
    calcSpotPrice,
    calcOutGivenIn,
    calcInGivenOut,
    calcRelativeDiff,
} = require('./calc_comparisons');

const s = {
  "rows": [
    {
      "pool": "btc2usdt",
      "pools": {
        "mutex": 0,
        "factory": "eoswapeoswap",
        "controller": "eoswapeoswap",
        "publicSwap": 1,
        "swapFee": 1000,
        "finalized": 1,
        "tokens": [
          "0x04425443000000003015a4b957c33155",
          "0x04555344540000003015a4b957c33155"
        ],
        "records": [
          {
            "key": "0x04425443000000003015a4b957c33155",
            "value": {
              "bound": 1,
              "index": 0,
              "denorm": 5000000,
              "balance": 184939,
              "exsym": { "symbol": "4,BTC", "contract": "eoswapxtoken" }
            }
          },
          {
            "key": "0x04555344540000003015a4b957c33155",
            "value": {
              "bound": 1,
              "index": 1,
              "denorm": 5000000,
              "balance": 7818011161,
              "exsym": { "symbol": "4,USDT", "contract": "eoswapxtoken" }
            }
          }
        ],
        "totalWeight": 10000000
      }
    }
  ],
  "more": false
};


var BONE = Math.pow(10, 6);
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


function init(p) {
    s = p;
}

function queryPool(tokenIn, tokenOut) {
    var pool_name = tokenIn.toLowerCase() + "2" + tokenOut.toLowerCase();
    pool_name = pool_name.substr(0, 12);
    // var testpool_name = { "dai2weth": "pool4", "weth2dai": "pool3" };
    // pool_name = testpool_name[pool_name];

    // console.log(pool_name);
    var pool = s[pool_name];
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

    return Number(expected).toFixed(4);
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

    return Number(expected).toFixed(4);
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

    return Number(expected).toFixed(4);
}


// console.log(givenIn(2, "WETH", "DAI"));
// console.log(givenOut(1, "WETH", "DAI"));
console.log(sell(2, "DAI", "WETH"));
console.log(buy(1, "DAI", "WETH"));


