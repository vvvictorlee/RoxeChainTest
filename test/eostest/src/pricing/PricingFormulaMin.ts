const Decimal = require('decimal.js');
// import {Decimal} from 'decimal.js';
import { dodotablerows } from './testjson'
import { PricingApi } from './PricingApi'

enum Types_RStatus { ONE, ABOVE_ONE, BELOW_ONE }

class SafeMath {
    // value: number;
    // constructor(a: number) { this.value = a; }
    // mul(b: number): number {
    //     return this.imul(this.value, b);
    // }
    // div(b: number): number {
    //     return this.idiv(this.value, b);
    // }
    // divCeil(b: number): number {
    //     return this.idivCeil(this.value, b);
    // }
    // sub(b: number): number {
    //     return this.isub(this.value, b);
    // }
    // add(b: number): number {
    //     return this.iadd(this.value, b);
    // }
    // sqrt(): number {
    //     return this.isqrt(this.value);
    // }

    static mul(a: number, b: number) {
        if (a == 0) {
            return 0;
        }

        let c: number = a * b;
        // //require(c / a == b, "MUL_ERROR");

        return c;
    }

    static div(a: number, b: number) {
        //require(b > 0, "DIVIDING_ERROR");
        // return a / b;
        return Decimal(a).div(b);
    }

    static divCeil(a: number, b: number) {
        let quotient: number = SafeMath.div(a, b);
        let remainder: number = a - quotient * b;
        if (remainder > 0) {
            return quotient + 1;
        } else {
            return quotient;
        }
    }

    static sub(a: number, b: number) {
        //require(b <= a, "SUB_ERROR");
        return a - b;
    }

    static add(a: number, b: number) {
        let c: number = a + b;
        //require(c >= a, "ADD_ERROR");
        return c;
    }

    static sqrt(x: number) {
        let z: number = x / 2 + 1;
        let y: number = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }

        return y;
    }
}


class DecimalMath {

    static ONE: number = Math.pow(10, 4);

    static mul(target: number, d: number) {
        return target.mul(d) / DecimalMath.ONE;
    }

    static mulCeil(target: number, d: number) {
        // return target.mul(d).divCeil(DecimalMath.ONE);
        return target.mul(d).div(DecimalMath.ONE);
    }

    static divFloor(target: number, d: number) {
        return target.mul(DecimalMath.ONE).div(d);
    }

    static divCeil(target: number, d: number) {
        // return target.mul(DecimalMath.ONE).divCeil(d);
        return target.mul(DecimalMath.ONE).div(d);
    }
}


interface Number {
    mul(b: number): number;

    div(b: number): number;

    divCeil(b: number): number;

    sub(b: number): number;

    add(b: number): number;

    sqrt(): number;
}

Number.prototype.mul = function (b: number): number {
    return Decimal(this).mul(b);
}
Number.prototype.div = function (b: number): number {
    return Decimal(this).div(b);
}

Number.prototype.sub = function (b: number): number {
    return Decimal(this).sub(b);
}
Number.prototype.add = function (b: number): number {
    return Decimal(this).add(b);
}
Number.prototype.sqrt = function (): number {
    return Decimal(this).sqrt();
}
Number.prototype.divCeil = function (b: number): number {


    let a: number = this.valueOf();
    let quotient: number = Decimal(a).div(b);
    let remainder: number = a - quotient * b;
    if (remainder > 0) {
        return quotient + 1;
    } else {
        return quotient;
    }
    // return 1;//Decimal(this).div(b);
    // return SafeMath.div(this,b);
}

/*

    Copyright 2020 DODO ZOO.
    SPDX-License-Identifier: Apache-2.0

*/

class DODOMath {

    /*
        Integrate dodo curve fron V1 to V2
        require V0>=V1>=V2>0
        res = (1-k)i(V1-V2)+ikV0*V0(1/V2-1/V1)
        let V1-V2=delta
        res = i*delta*(1-k+k(V0^2/V1/V2))
    */
    static _GeneralIntegrate(
        V0: number,
        V1: number,
        V2: number,
        i: number,
        k: number
    ) {
        let fairAmount: number = DecimalMath.mul(i, V1.sub(V2)); // i*delta
        let V0V0V1V2: number = DecimalMath.divCeil(V0.mul(V0).div(V1), V2);
        let penalty: number = DecimalMath.mul(k, V0V0V1V2); // k(V0^2/V1/V2)
        return DecimalMath.mul(fairAmount, DecimalMath.ONE.sub(k).add(penalty));
    }

    /*
        The same with integration expression above, we have:
        i*deltaB = (Q2-Q1)*(1-k+kQ0^2/Q1/Q2)
        Given Q1 and deltaB, solve Q2
        This is a quadratic  and the standard version is
        aQ2^2 + bQ2 + c = 0, where
        a=1-k
        -b=(1-k)Q1-kQ0^2/Q1+i*deltaB
        c=-kQ0^2
        and Q2=(-b+sqrt(b^2+4(1-k)kQ0^2))/2(1-k)
        note: another root is negative, abondan
        if deltaBSig=true, then Q2>Q1
        if deltaBSig=false, then Q2<Q1
    */
    static _SolveQuadraticForTrade(
        Q0: number,
        Q1: number,
        ideltaB: number,
        deltaBSig: boolean,
        k: number
    ) {
        // calculate -b value and sig
        // -b = (1-k)Q1-kQ0^2/Q1+i*deltaB
        let kQ02Q1: number = DecimalMath.mul(k, Q0).mul(Q0).div(Q1); // kQ0^2/Q1
        let b: number = DecimalMath.mul(DecimalMath.ONE.sub(k), Q1); // (1-k)Q1
        let minusbSig: boolean = true;
        if (deltaBSig) {
            b = b.add(ideltaB); // (1-k)Q1+i*deltaB
        } else {
            kQ02Q1 = kQ02Q1.add(ideltaB); // i*deltaB+kQ0^2/Q1
        }
        if (b >= kQ02Q1) {
            b = b.sub(kQ02Q1);
            minusbSig = true;
        } else {
            b = kQ02Q1.sub(b);
            minusbSig = false;
        }

        // calculate sqrt
        let squareRoot: number = DecimalMath.mul(
            DecimalMath.ONE.sub(k).mul(4),
            DecimalMath.mul(k, Q0).mul(Q0)
        ); // 4(1-k)kQ0^2
        squareRoot = b.mul(b).add(squareRoot).sqrt(); // sqrt(b*b+4(1-k)kQ0*Q0)

        // final res
        let denominator: number = DecimalMath.ONE.sub(k).mul(2); // 2(1-k)
        let numerator: number;
        if (minusbSig) {
            numerator = b.add(squareRoot);
        } else {
            numerator = squareRoot.sub(b);
        }

        if (deltaBSig) {
            return DecimalMath.divFloor(numerator, denominator);
        } else {
            return DecimalMath.divCeil(numerator, denominator);
        }
    }

    /*
        Start from the integration 
        i*deltaB = (Q2-Q1)*(1-k+kQ0^2/Q1/Q2)
        Assume Q2=Q0, Given Q1 and deltaB, solve Q0
        let fairAmount = i*deltaB
    */
    static _SolveQuadraticForTarget(
        V1: number,
        k: number,
        fairAmount: number
    ) {
        // V0 = V1+V1*(sqrt-1)/2k
        let sqrt: number = DecimalMath.divCeil(DecimalMath.mul(k, fairAmount).mul(4), V1);
        sqrt = sqrt.add(DecimalMath.ONE).mul(DecimalMath.ONE).sqrt();
        let premium: number = DecimalMath.divCeil(sqrt.sub(DecimalMath.ONE), k.mul(2));
        // V0 is greater than or equal to V1 according to the solution
        return DecimalMath.mul(V1, DecimalMath.ONE.add(premium));
    }
}



/**
 * @title DoStorage
 * @author DODO Breeder
 *
 * @notice Local Variables
 */
class DoStorage {

    // ============ Variables for Control ============

    _INITIALIZED_: boolean;
    _CLOSED_: boolean;
    _DEPOSIT_QUOTE_ALLOWED_: boolean;
    _DEPOSIT_BASE_ALLOWED_: boolean;
    _TRADE_ALLOWED_: boolean;
    _GAS_PRICE_LIMIT_: number;

    // ============ Advanced Controls ============
    _BUYING_ALLOWED_: boolean;
    _SELLING_ALLOWED_: boolean;
    _BASE_BALANCE_LIMIT_: number;
    _QUOTE_BALANCE_LIMIT_: number;

    // ============ Core Address ============

    _SUPERVISOR_: string; // could freeze system in emergency
    _MAINTAINER_: string; // collect maintainer fee to buy food for DODO

    _BASE_TOKEN_: string;
    _QUOTE_TOKEN_: string;
    _ORACLE_: string;

    // ============ Variables for PMM Algorithm ============

    _LP_FEE_RATE_: number;
    _MT_FEE_RATE_: number;
    _K_: number;

    _R_STATUS_: Types_RStatus;
    _TARGET_BASE_TOKEN_AMOUNT_: number;
    _TARGET_QUOTE_TOKEN_AMOUNT_: number;
    _BASE_BALANCE_: number;
    _QUOTE_BALANCE_: number;

    _BASE_CAPITAL_TOKEN_: string;
    _QUOTE_CAPITAL_TOKEN_: string;

    // ============ Variables for Final Settlement ============

    _BASE_CAPITAL_RECEIVE_QUOTE_: number;
    _QUOTE_CAPITAL_RECEIVE_BASE_: number;

    // ============ Variables for Oracle Price ============
    _ORACLE_PRICE_: number;
    constructor() {
        this._INITIALIZED_ = false;
        this._CLOSED_ = false;
        this._DEPOSIT_QUOTE_ALLOWED_ = false;
        this._DEPOSIT_BASE_ALLOWED_ = false;
        this._TRADE_ALLOWED_ = false;
        this._GAS_PRICE_LIMIT_ = 0;

        // ============ Advanced Controls ============
        this._BUYING_ALLOWED_ = false;
        this._SELLING_ALLOWED_ = false;
        this._BASE_BALANCE_LIMIT_ = Number(18446744073709551615);
        this._QUOTE_BALANCE_LIMIT_ = Number(18446744073709551615);

        // ============ Core Address ============

        this._SUPERVISOR_ = ""; // could freeze system in emergency
        this._MAINTAINER_ = ""; // collect maintainer fee to buy food for DODO

        this._BASE_TOKEN_ = "";
        this._QUOTE_TOKEN_ = "";
        this._ORACLE_ = "";

        // ============ Variables for PMM Algorithm ============

        this._LP_FEE_RATE_ = 0;
        this._MT_FEE_RATE_ = 0;
        this._K_ = 0.0001;

        //   "_TARGET_BASE_TOKEN_AMOUNT_": 100002,
        //   "_TARGET_QUOTE_TOKEN_AMOUNT_": 10000000,
        //   "_BASE_BALANCE_": 89999,
        //   "_QUOTE_BALANCE_": 11000300,
        this._R_STATUS_ = Types_RStatus.ONE;
        this._TARGET_BASE_TOKEN_AMOUNT_ = 100002;
        this._TARGET_QUOTE_TOKEN_AMOUNT_ = 10000000;
        this._BASE_BALANCE_ = 89999;
        this._QUOTE_BALANCE_ = 11000300;

        this._BASE_CAPITAL_TOKEN_ = "";
        this._QUOTE_CAPITAL_TOKEN_ = "";

        // ============ Variables for Final Settlement ============

        this._BASE_CAPITAL_RECEIVE_QUOTE_ = 0;
        this._QUOTE_CAPITAL_RECEIVE_BASE_ = 0;

        // ============ Variables for Oracle Price ============
        this._ORACLE_PRICE_ = 1;
    }

    setParameters(para: any) {

        // this._BASE_BALANCE_LIMIT_ = para._BASE_BALANCE_LIMIT_;
        // this._QUOTE_BALANCE_LIMIT_ = para._QUOTE_BALANCE_LIMIT_;

        // ============ Variables for PMM Algorithm ============

        this._LP_FEE_RATE_ = para._LP_FEE_RATE_;
        this._MT_FEE_RATE_ = para._MT_FEE_RATE_;
        this._K_ = para._K_;

        this._R_STATUS_ = para._R_STATUS_;
        this._TARGET_BASE_TOKEN_AMOUNT_ = para._TARGET_BASE_TOKEN_AMOUNT_;
        this._TARGET_QUOTE_TOKEN_AMOUNT_ = para._TARGET_QUOTE_TOKEN_AMOUNT_;
        this._BASE_BALANCE_ = para._BASE_BALANCE_;
        this._QUOTE_BALANCE_ = para._QUOTE_BALANCE_;

        this._ORACLE_PRICE_ = para._ORACLE_PRICE_;

    }


    getOraclePrice(): number {
        return this._ORACLE_PRICE_;
    }

    getBaseCapitalBalanceOf(lp: string) {
        // return IDODOLpToken(_BASE_CAPITAL_TOKEN_).balanceOf(lp);
    }

    getTotalBaseCapital() {
        // return IDODOLpToken(_BASE_CAPITAL_TOKEN_).totalSupply();
    }

    getQuoteCapitalBalanceOf(lp: string) {
        // return IDODOLpToken(_QUOTE_CAPITAL_TOKEN_).balanceOf(lp);
    }

    getTotalQuoteCapital() {
        // return IDODOLpToken(_QUOTE_CAPITAL_TOKEN_).totalSupply();
    }

}


// {
//   "dodo_name": "ethbasemkr11",
//   "initownable": {
//     "_OWNER_": "eosdoseosdos",
//     "_NEW_OWNER_": ""
//   },
//   "guard": {
//     "_ENTERED_": 0
//   },
//   "_INITIALIZED_": 1,
//   "_CLOSED_": 0,
//   "_DEPOSIT_QUOTE_ALLOWED_": 1,
//   "_DEPOSIT_BASE_ALLOWED_": 1,
//   "_TRADE_ALLOWED_": 1,
//   "_GAS_PRICE_LIMIT_": 0,
//   "_BUYING_ALLOWED_": 1,
//   "_SELLING_ALLOWED_": 1,
//   "_BASE_BALANCE_LIMIT_": "18446744073709551615",
//   "_QUOTE_BALANCE_LIMIT_": "18446744073709551615",
//   "_SUPERVISOR_": "eosdoseosdos",
//   "_MAINTAINER_": "dodoowner111",
//   "_BASE_TOKEN_": {
//     "sym": "4,WETH",
//     "contract": "eosdosxtoken"
//   },
//   "_QUOTE_TOKEN_": {
//     "sym": "4,MKR",
//     "contract": "eosdosxtoken"
//   },
//   "_ORACLE_": {
//     "sym": "4,WETH",
//     "contract": "eosdosxtoken"
//   },
//   "_LP_FEE_RATE_": 2,
//   "_MT_FEE_RATE_": 1,
//   "_K_": 1,
//   "_R_STATUS_": 1,
//   "_TARGET_BASE_TOKEN_AMOUNT_": 100002,
//   "_TARGET_QUOTE_TOKEN_AMOUNT_": 10000000,
//   "_BASE_BALANCE_": 89999,
//   "_QUOTE_BALANCE_": 11000300,
//   "_BASE_CAPITAL_TOKEN_": {
//     "sym": "4,WETH",
//     "contract": "ethbasemkr11"
//   },
//   "_QUOTE_CAPITAL_TOKEN_": {
//     "sym": "4,MKR",
//     "contract": "ethbasemkr11"
//   },
//   "_BASE_CAPITAL_RECEIVE_QUOTE_": 0,
//   "_QUOTE_CAPITAL_RECEIVE_BASE_": 0,
//   "_CLAIMED_": []
// }

/**
 * @title Pricing
 * @author DODO Breeder
 *
 * @notice DODO Pricing model
 */
class Pricing extends DoStorage {

    // ============ R = 1 cases ============

    _ROneSellBaseToken(amount: number, targetQuoteTokenAmount: number) {
        let i: number = this.getOraclePrice();
        let Q2: number = DODOMath._SolveQuadraticForTrade(
            targetQuoteTokenAmount,
            targetQuoteTokenAmount,
            DecimalMath.mul(i, amount),
            false,
            this._K_
        );
        // in theory Q2 <= targetQuoteTokenAmount
        // however when amount is close to 0, precision problems may cause Q2 > targetQuoteTokenAmount
        return targetQuoteTokenAmount.sub(Q2);
    }

    _ROneBuyBaseToken(amount: number, targetBaseTokenAmount: number) {
        //require(amount < targetBaseTokenAmount, "DODO_BASE_BALANCE_NOT_ENOUGH");
        let B2: number = targetBaseTokenAmount.sub(amount);
        let payQuoteToken = this._RAboveIntegrate(targetBaseTokenAmount, targetBaseTokenAmount, B2);
        return payQuoteToken;
    }

    // ============ R < 1 cases ============

    _RBelowSellBaseToken(
        amount: number,
        quoteBalance: number,
        targetQuoteAmount: number
    ) {
        let i: number = this.getOraclePrice();
        let Q2: number = DODOMath._SolveQuadraticForTrade(
            targetQuoteAmount,
            quoteBalance,
            DecimalMath.mul(i, amount),
            false,
            this._K_
        );
        return quoteBalance.sub(Q2);
    }

    _RBelowBuyBaseToken(
        amount: number,
        quoteBalance: number,
        targetQuoteAmount: number
    ) {
        // Here we don't //require amount less than some value
        // Because it is limited at upper 
        // See Trader.queryBuyBaseToken
        let i: number = this.getOraclePrice();
        let Q2: number = DODOMath._SolveQuadraticForTrade(
            targetQuoteAmount,
            quoteBalance,
            DecimalMath.mulCeil(i, amount),
            true,
            this._K_
        );
        return Q2.sub(quoteBalance);
    }

    _RBelowBackToOne() {
        // important: carefully design the system to make sure spareBase always greater than or equal to 0
        let spareBase: number = this._BASE_BALANCE_.sub(this._TARGET_BASE_TOKEN_AMOUNT_);
        let price: number = this.getOraclePrice();
        let fairAmount: number = DecimalMath.mul(spareBase, price);
        let newTargetQuote: number = DODOMath._SolveQuadraticForTarget(
            this._QUOTE_BALANCE_,
            this._K_,
            fairAmount
        );
        return newTargetQuote.sub(this._QUOTE_BALANCE_);
    }

    // ============ R > 1 cases ============

    _RAboveBuyBaseToken(
        amount: number,
        baseBalance: number,
        targetBaseAmount: number
    ) {
        //require(amount < baseBalance, "DODO_BASE_BALANCE_NOT_ENOUGH");
        let B2: number = baseBalance.sub(amount);
        return this._RAboveIntegrate(targetBaseAmount, baseBalance, B2);
    }

    _RAboveSellBaseToken(
        amount: number,
        baseBalance: number,
        targetBaseAmount: number
    ) {
        // here we don't //require B1 <= targetBaseAmount
        // Because it is limited at upper 
        // See Trader.querySellBaseToken
        let B1: number = baseBalance.add(amount);
        return this._RAboveIntegrate(targetBaseAmount, B1, baseBalance);
    }

    _RAboveBackToOne() {
        // important: carefully design the system to make sure spareBase always greater than or equal to 0
        let spareQuote: number = this._QUOTE_BALANCE_.sub(this._TARGET_QUOTE_TOKEN_AMOUNT_);
        let price: number = this.getOraclePrice();
        let fairAmount: number = DecimalMath.divFloor(spareQuote, price);
        let newTargetBase: number = DODOMath._SolveQuadraticForTarget(
            this._BASE_BALANCE_,
            this._K_,
            fairAmount
        );
        return newTargetBase.sub(this._BASE_BALANCE_);
    }

    // ============ Helper s ============

    getExpectedTarget() {
        let Q: number = this._QUOTE_BALANCE_;
        let B: number = this._BASE_BALANCE_;
        if (this._R_STATUS_ == Types_RStatus.ONE) {
            return [this._TARGET_BASE_TOKEN_AMOUNT_, this._TARGET_QUOTE_TOKEN_AMOUNT_];
        } else if (this._R_STATUS_ == Types_RStatus.BELOW_ONE) {
            let payQuoteToken: number = this._RBelowBackToOne();
            return [this._TARGET_BASE_TOKEN_AMOUNT_, Q.add(payQuoteToken)];
        } else if (this._R_STATUS_ == Types_RStatus.ABOVE_ONE) {
            let payBaseToken: number = this._RAboveBackToOne();
            return [B.add(payBaseToken), this._TARGET_QUOTE_TOKEN_AMOUNT_];
        }
        return [0, 0];
    }

    getMidPrice() {
        // baseTarget:number, quoteTarget:number
        let [baseTarget, quoteTarget] = this.getExpectedTarget();
        if (this._R_STATUS_ == Types_RStatus.BELOW_ONE) {
            let R: number = DecimalMath.divFloor(
                quoteTarget.mul(quoteTarget).div(this._QUOTE_BALANCE_),
                this._QUOTE_BALANCE_
            );
            R = DecimalMath.ONE.sub(this._K_).add(DecimalMath.mul(this._K_, R));
            return DecimalMath.divFloor(this.getOraclePrice(), R);
        } else {
            let R: number = DecimalMath.divFloor(
                baseTarget.mul(baseTarget).div(this._BASE_BALANCE_),
                this._BASE_BALANCE_
            );
            R = DecimalMath.ONE.sub(this._K_).add(DecimalMath.mul(this._K_, R));
            return DecimalMath.mul(this.getOraclePrice(), R);
        }
    }

    _RAboveIntegrate(
        B0: number,
        B1: number,
        B2: number
    ) {
        let i: number = this.getOraclePrice();
        return DODOMath._GeneralIntegrate(B0, B1, B2, i, this._K_);
    }

    //  _RBelowIntegrate(
    //     Q0:number,
    //     Q1:number,
    //     Q2:number
    // ) internal view returns (uint256) {
    //     i:number = getOraclePrice();
    //     i = DecimalMath.divFloor(DecimalMath.ONE, i); // 1/i
    //     return DODOMath._GeneralIntegrate(Q0, Q1, Q2, i, this._K_);
    // }
}



/**
 * @title Trader
 * @author DODO Breeder
 *
 * @notice s for trader operations
 */
class Trader extends Pricing {

    // ============ Query s ============

    querySellBaseToken(amount: number) {
        let [receiveQuote] = this._querySellBaseToken(amount);
        return receiveQuote;
    }

    queryBuyBaseToken(amount: number) {
        let [payQuote] = this._queryBuyBaseToken(amount);
        return payQuote;
    }

    _querySellBaseToken(amount: number) {
        let receiveQuote, lpFeeQuote, mtFeeQuote, newRStatus;

        let [newBaseTarget, newQuoteTarget] = this.getExpectedTarget();
        let sellBaseAmount: number = amount;

        if (this._R_STATUS_ == Types_RStatus.ONE) {
            // case 1: R=1
            // R falls below one
            receiveQuote = this._ROneSellBaseToken(sellBaseAmount, newQuoteTarget);
            newRStatus = Types_RStatus.BELOW_ONE;
        } else if (this._R_STATUS_ == Types_RStatus.ABOVE_ONE) {
            let backToOnePayBase: number = newBaseTarget.sub(this._BASE_BALANCE_);
            let backToOneReceiveQuote: number = this._QUOTE_BALANCE_.sub(newQuoteTarget);
            // case 2: R>1
            // complex case, R status depends on trading amount
            if (sellBaseAmount < backToOnePayBase) {
                // case 2.1: R status do not change
                receiveQuote = this._RAboveSellBaseToken(sellBaseAmount, this._BASE_BALANCE_, newBaseTarget);
                newRStatus = Types_RStatus.ABOVE_ONE;
                if (receiveQuote > backToOneReceiveQuote) {
                    // [Important corner case!] may enter this branch when some precision problem happens. And consequently contribute to negative spare quote amount
                    // to make sure spare quote>=0, mannually set receiveQuote=backToOneReceiveQuote
                    receiveQuote = backToOneReceiveQuote;
                }
            } else if (sellBaseAmount == backToOnePayBase) {
                // case 2.2: R status changes to ONE
                receiveQuote = backToOneReceiveQuote;
                newRStatus = Types_RStatus.ONE;
            } else {
                // case 2.3: R status changes to BELOW_ONE
                receiveQuote = backToOneReceiveQuote.add(
                    this._ROneSellBaseToken(sellBaseAmount.sub(backToOnePayBase), newQuoteTarget)
                );
                newRStatus = Types_RStatus.BELOW_ONE;
            }
        } else {
            // _R_STATUS_ == Types_RStatus.BELOW_ONE
            // case 3: R<1
            receiveQuote = this._RBelowSellBaseToken(sellBaseAmount, this._QUOTE_BALANCE_, newQuoteTarget);
            newRStatus = Types_RStatus.BELOW_ONE;
        }

        // count fees
        lpFeeQuote = DecimalMath.mul(receiveQuote, this._LP_FEE_RATE_);
        mtFeeQuote = DecimalMath.mul(receiveQuote, this._MT_FEE_RATE_);
        receiveQuote = receiveQuote.sub(lpFeeQuote).sub(mtFeeQuote);

        return [receiveQuote, lpFeeQuote, mtFeeQuote, newRStatus, newQuoteTarget, newBaseTarget];
    }

    _queryBuyBaseToken(amount: number) {
        let payQuote, lpFeeBase, mtFeeBase, newRStatus, newQuoteTarget, newBaseTarget;
        [newBaseTarget, newQuoteTarget] = this.getExpectedTarget();

        // charge fee from user receive amount
        lpFeeBase = DecimalMath.mul(amount, this._LP_FEE_RATE_);
        mtFeeBase = DecimalMath.mul(amount, this._MT_FEE_RATE_);
        let buyBaseAmount: number = amount.add(lpFeeBase).add(mtFeeBase);

        if (this._R_STATUS_ == Types_RStatus.ONE) {
            // case 1: R=1
            payQuote = this._ROneBuyBaseToken(buyBaseAmount, newBaseTarget);
            newRStatus = Types_RStatus.ABOVE_ONE;
        } else if (this._R_STATUS_ == Types_RStatus.ABOVE_ONE) {
            // case 2: R>1
            payQuote = this._RAboveBuyBaseToken(buyBaseAmount, this._BASE_BALANCE_, newBaseTarget);
            newRStatus = Types_RStatus.ABOVE_ONE;
        } else if (this._R_STATUS_ == Types_RStatus.BELOW_ONE) {
            let backToOnePayQuote: number = newQuoteTarget.sub(this._QUOTE_BALANCE_);
            let backToOneReceiveBase: number = this._BASE_BALANCE_.sub(newBaseTarget);
            // case 3: R<1
            // complex case, R status may change
            if (buyBaseAmount < backToOneReceiveBase) {
                // case 3.1: R status do not change
                // no need to check payQuote because spare base token must be greater than zero
                payQuote = this._RBelowBuyBaseToken(buyBaseAmount, this._QUOTE_BALANCE_, newQuoteTarget);
                newRStatus = Types_RStatus.BELOW_ONE;
            } else if (buyBaseAmount == backToOneReceiveBase) {
                // case 3.2: R status changes to ONE
                payQuote = backToOnePayQuote;
                newRStatus = Types_RStatus.ONE;
            } else {
                // case 3.3: R status changes to ABOVE_ONE
                payQuote = backToOnePayQuote.add(
                    this._ROneBuyBaseToken(buyBaseAmount.sub(backToOneReceiveBase), newBaseTarget)
                );
                newRStatus = Types_RStatus.ABOVE_ONE;
            }
        }

        return [payQuote, lpFeeBase, mtFeeBase, newRStatus, newQuoteTarget, newBaseTarget];
    }
}

const filter_fields: any[] = [
    "_LP_FEE_RATE_",
    "_MT_FEE_RATE_",
    "_K_",
    "_R_STATUS_",
    "_TARGET_BASE_TOKEN_AMOUNT_",
    "_TARGET_QUOTE_TOKEN_AMOUNT_",
    "_BASE_BALANCE_",
    "_QUOTE_BALANCE_"
];
let t: Trader = new Trader();
let galldodos: { [name: string]: any } = {};

function init(dodos: any) {
    galldodos = dodos;
}

function queryDodo(baseToken: string, quoteToken: string) {
    let dodo_name = baseToken.toLowerCase() + "2" + quoteToken.toLowerCase() + "11111";
    dodo_name = dodo_name.substr(0, 12);
    const testdodo_name: { [name: string]: string } = { "dai2mkr11111": "daimkrdaimkr", "eth2mkr11111": "ethbasemkr11" };
    // //console.log(dodo_name);
    let dodo = galldodos[testdodo_name[dodo_name]];

    return dodo;
}

function buy(amount: number, baseToken: string, quoteToken: string) {
    let dodo = queryDodo(baseToken, quoteToken);
    t.setParameters(dodo);
    const r: any = t.queryBuyBaseToken(amount);
    //console.log(r);
    return r;
}

function sell(amount: number, baseToken: string, quoteToken: string) {
    let dodo = queryDodo(baseToken, quoteToken);
    t.setParameters(dodo);
    const r: any = t.querySellBaseToken(amount);
    //console.log(r);
    return r;
}

function test() {
    init(dodotablerows);
    let amount: number = 10000;
    let baseToken = "USD";
    let quoteToken = "GBP";
    const b: any = buy(amount, baseToken, quoteToken);
    console.log("==b==", b, "=====");
    const s: any = sell(amount, baseToken, quoteToken);
    console.log("==s==", s, "=====");

}





