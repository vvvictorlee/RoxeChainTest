var  Decimal = require('decimal.js');

var  {
    calcSpotPrice,
    calcOutGivenIn,
    calcInGivenOut,
    calcRelativeDiff,
} = require('./calc_comparisons');

///SwapRefactoringTableJson begin
var Object_assign = function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
};

function refactoringPoolTableJson(pooltablejson) {
    var pools = pooltablejson.rows;//[0]["pools"];
    // let poolsobj = arrToObjES2019(pools);
    var allpools = pools.map(function (pool) {
        var refactoring_records = pool.pools.records.map(function (record) {
            var token = record.value.exsym.symbol.split(",")[1];
            var o = {};
            o[token] = { denorm: record.value.denorm, balance: record.value.balance };
            return o;
        }).reduce(function (obj, o) { Object_assign(obj, o); return obj; }, {});
        Object_assign(refactoring_records, { swapFee: pool.pools.swapFee }, { totalWeight: pool.pools.totalWeight });
        var po = {};
        po[pool.pool] = refactoring_records;
        return po;
    }).reduce(function (obj, o) { Object_assign(obj, o); return obj; }, {});
    return allpools;
}

// SwapRefactoringTableJson end
/// TransferFeeApi begin
var sym2dec = { "USD": 6, "BTC": 8, "ROC": 4 }
function getTransferFee(amount, symbolcode, is_in) {
    is_in = is_in || false;
    if (!symcode2fee.hasOwnProperty(symbolcode)) {
        return 0;
    }
    var  symprecision = sym2dec[symbolcode];
    var  symdec = Math.pow(10, symprecision || 9);
    var  percent_decimal = Math.pow(10, 6);
    var  st = symcode2fee[symbolcode];
    let fee_amount = Number(st.fee) + Number(amount) * Number(st.percent) / Number(percent_decimal);
    if (is_in) {
        fee_amount = (Number(st.fee) * Number(percent_decimal) + Number(amount) * Number(st.percent)) / (Number(st.percent) + Number(percent_decimal));
    }
    fee_amount = Math.floor(fee_amount * symdec);
    fee_amount = Math.min(Math.max(Number(fee_amount), Number(st.minfee)), Number(st.maxfee))
    return Number(Number(Number(fee_amount) / symdec).toFixed(symprecision).valueOf());

}


function refactoringObj(arr) {
    return arr.map((obj) => {
        let s = obj.supply.split(" ");
        let o = {};
        delete obj["supply"];
        delete obj["max_supply"];
        delete obj["issuer"];
        delete obj["authors"];
        o[s[1].trim()] = obj;

        return o;
    }).reduce((obj, o) => Object_assign(obj, o), {});
}

/// TransferFeeApi end 


var  ONE_DECIMALS = 9;

var  SYM2DEC = sym2dec;//{ "BTC": 8, "USD": 6 };

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

var symcode2fee = {};
function init(p, f) {
    s = JSON.parse(p);
    s = refactoringPoolTableJson(s);
    var s2f = JSON.parse(f);
    symcode2fee = refactoringObj(s2f);

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

function convert_one_decimals(amount, token, signed_one = 1) {
    var  p = getPrecision(token);
    if (p < ONE_DECIMALS) {
        var  d = ONE_DECIMALS - p;
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
    console.log("==expected before transfer fee==", expected);
    var  fee = getTransferFee(expected, tokenOut, true);
    expected -= fee;
    var  p = getPrecision(tokenOut);
    var  d = Math.pow(10, p);
    console.log("==expected=after==transfer fee==", expected);
    return Decimal(Decimal(expected * d).floor(0) / d);
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
    console.log("==tokenAmountOut=before=", tokenAmountOut);
    var  fee = getTransferFee(tokenAmountOut, tokenIn);//buy tokenIn is tokenOut in balancer
    tokenAmountOut += fee;
    console.log("==tokenAmountOut=after=", tokenAmountOut);
    var expected = calcInGivenOut(
        currenttokenOutBalance,
        tokenOutNorm,
        currenttokenInBalance,
        tokenInNorm,
        tokenAmountOut,
        swapFee
    );
    var  p = getPrecision(tokenIn);
    var  d = Math.pow(10, p);
    console.log("==expected===", expected);
    return Decimal(Decimal(expected * d).floor(0) / d);
}

var pool = require("./javainterface/pools.json");
var fee = require("./javainterface/fees.json");
function test() {
    init(JSON.stringify(pool),JSON.stringify(fee));
    var  amounts = [1, 100, 10000];//
    for (let a of amounts) {
        var  sr = sell(a, "BTC", "USD");
        console.log("==sell==", a, "==", sr);
        var  br = buy(a, "BTC", "USD");
        console.log("==buy==", a, "==", br);
    }
}

test();


// module.exports = {
//     init,
//     buy,
//     sell,
// };



var feedata = [
  {
    supply: '812125.00000000 BTC',
    max_supply: '21000000.00000000 BTC',
    issuer: 'roxe.ro',
    authors: [
      'roxe.ro',
      '1vtqnirollub',
      '1153otktw5kd',
      '11aripihteqd',
      '11ansbxdwglz'
    ],
    fee: 0,
    fixed: 1,
    percent: 30000,
    maxfee: 420,
    minfee: 0,
    useroc: 0
  },
  {
    supply: '2665441288.150000 HKD',
    max_supply: '4611686018427.000000 HKD',
    issuer: 'roxe.ro',
    authors: [ 'roxe.ro', '1vtqnirollub' ],
    fee: 0,
    fixed: 0,
    percent: 30000,
    maxfee: 780000,
    minfee: 0,
    useroc: 0
  },
  {
    supply: '325493416.600000 USD',
    max_supply: '4611686018427.000000 USD',
    issuer: 'roxe.ro',
    authors: [ 'roxe.ro', '1vtqnirollub', '114listvtuib' ],
    fee: 0,
    fixed: 1,
    percent: 30000,
    maxfee: 100000,
    minfee: 0,
    useroc: 0
  },
  {
    supply: '10.000000000 ETH',
    max_supply: '4611686018.000000000 ETH',
    issuer: 'roxe.ro',
    authors: [ 'roxe.ro', '1vtqnirollub', '114listvtuib' ],
    fee: 0,
    fixed: 1,
    percent: 30000,
    maxfee: 160000,
    minfee: 0,
    useroc: 0
  },
  {
    supply: '73973760.490000 GBP',
    max_supply: '4611686018427.000000 GBP',
    issuer: 'roxe.ro',
    authors: [ 'roxe.ro', '1vtqnirollub' ],
    fee: 0,
    fixed: 1,
    percent: 30000,
    maxfee: 70000,
    minfee: 0,
    useroc: 0
  },
  {
    supply: '100000.000000 USDC',
    max_supply: '4611686018427.000000 USDC',
    issuer: 'roxe.ro',
    authors: [ 'roxe.ro', '1vtqnirollub', '114listvtuib' ],
    fee: 0,
    fixed: 1,
    percent: 30000,
    maxfee: 100000,
    minfee: 0,
    useroc: 0
  },
  {
    supply: '1411350000.000000 USDT',
    max_supply: '4611686018427.000000 USDT',
    issuer: 'roxe.ro',
    authors: [ 'roxe.ro', '1vtqnirollub', '114listvtuib' ],
    fee: 0,
    fixed: 1,
    percent: 30000,
    maxfee: 100000,
    minfee: 0,
    useroc: 0
  }
];