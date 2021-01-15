/*

    Copyright 2020 DODO ZOO.
    SPDX-License-Identifier: Apache-2.0

*/
const Decimal = require('decimal.js');
import { SafeMath } from "../lib/SafeMath";
import { DecimalMath } from "../lib/DecimalMath";
import { Types_RStatus } from "../lib/Types";
import { Pricing } from "./Pricing";
// import "../utils/number.extensions";

const dotenv = require('dotenv');
dotenv.load();
const TokenDecimal = Math.pow(10, Number(process.env.PRICING_DODO_EARN_ONE_DECIMALS));


/**
 * @title Trader
 * @author DODO Breeder
 *
 * @notice s for trader operations
 */
export class Trader extends Pricing {

    // ============ Query s ============


    querySellBaseTokenDetail(amount: number) {
        let [receiveQuote, lpFeeQuote, mtFeeQuote, newRStatus, newQuoteTarget, newBaseTarget] = this._querySellBaseToken(amount)
        return {
            receiveQuote: receiveQuote,
            lpFeeQuote: lpFeeQuote,
            mtFeeQuote: mtFeeQuote,
            newRStatus: newRStatus,
            newQuoteTarget: newQuoteTarget,
            newBaseTarget: newBaseTarget
        }
    }

    queryBuyBaseTokenDetail(amount: number) {
        let [payQuote, lpFeeBase, mtFeeBase, newRStatus, newQuoteTarget, newBaseTarget] = this._queryBuyBaseToken(amount)
        return {
            payQuote: (payQuote == undefined ? 0 : payQuote) / TokenDecimal,
            lpFeeBase: (lpFeeBase == undefined ? 0 : lpFeeBase) / TokenDecimal,
            mtFeeBase: (mtFeeBase == undefined ? 0 : mtFeeBase) / TokenDecimal,
            newRStatus: newRStatus,
            newQuoteTarget: newQuoteTarget,
            newBaseTarget: newBaseTarget
        }
    }

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
            //console.log("===case 1=receiveQuote=======", receiveQuote);
            newRStatus = Types_RStatus.BELOW_ONE;
        } else if (this._R_STATUS_ == Types_RStatus.ABOVE_ONE) {
            let backToOnePayBase: number = Decimal(newBaseTarget).sub(this._BASE_BALANCE_);
            //console.log("=======backToOnePayBase====", backToOnePayBase);
            let backToOneReceiveQuote: number = Decimal(this._QUOTE_BALANCE_).sub(newQuoteTarget);
            //console.log("===backToOneReceiveQuote========", backToOneReceiveQuote);
            // case 2: R>1
            // complex case, R status depends on trading amount
            if (sellBaseAmount < backToOnePayBase) {
                // case 2.1: R status do not change
                receiveQuote = this._RAboveSellBaseToken(sellBaseAmount, this._BASE_BALANCE_, newBaseTarget);
                newRStatus = Types_RStatus.ABOVE_ONE;
                //console.log("===case 2.1=receiveQuote=======", receiveQuote);

                if (Number(receiveQuote) > Number(backToOneReceiveQuote)) {
                    // [Important corner case!] may enter this branch when some precision problem happens. And consequently contribute to negative spare quote amount
                    // to make sure spare quote>=0, mannually set receiveQuote=backToOneReceiveQuote
                    receiveQuote = backToOneReceiveQuote;
                    //console.log("===case 2.1.1=receiveQuote=======", receiveQuote);

                }
            } else if (sellBaseAmount == backToOnePayBase) {
                // case 2.2: R status changes to ONE
                receiveQuote = backToOneReceiveQuote;
                //console.log("==case 2.2:==backToOneReceiveQuote=receiveQuote=", backToOneReceiveQuote, receiveQuote);

                newRStatus = Types_RStatus.ONE;
            } else {
                // case 2.3: R status changes to BELOW_ONE
                receiveQuote = backToOneReceiveQuote.add(
                    this._ROneSellBaseToken(Decimal(sellBaseAmount).sub(backToOnePayBase), newQuoteTarget)
                );
                //console.log("==case 2.3:==backToOneReceiveQuote=receiveQuote=", backToOneReceiveQuote, receiveQuote);

                newRStatus = Types_RStatus.BELOW_ONE;
            }
        } else {
            // _R_STATUS_ == Types_RStatus.BELOW_ONE
            // case 3: R<1
            receiveQuote = this._RBelowSellBaseToken(sellBaseAmount, this._QUOTE_BALANCE_, newQuoteTarget);
            //console.log("===case 3=receiveQuote=======", receiveQuote);
            newRStatus = Types_RStatus.BELOW_ONE;
        }

        // count fees
        lpFeeQuote = Math.floor(DecimalMath.mul(receiveQuote, this._LP_FEE_RATE_));
        mtFeeQuote = Math.floor(DecimalMath.mul(receiveQuote, this._MT_FEE_RATE_));
        console.log("==before=this.transfer_fee=receiveQuote=======", this.transfer_fee, receiveQuote);
        receiveQuote = Decimal(receiveQuote).sub(lpFeeQuote).sub(mtFeeQuote).sub(this.transfer_fee);

        console.log('receiveQuote, lpFeeQuote, mtFeeQuote, newRStatus, newQuoteTarget, newBaseTarget', receiveQuote, lpFeeQuote, mtFeeQuote, newRStatus, newQuoteTarget, newBaseTarget);
        return [receiveQuote, lpFeeQuote, mtFeeQuote, newRStatus, newQuoteTarget, newBaseTarget];
    }

    _queryBuyBaseToken(amount: number) {
        let payQuote, lpFeeBase, mtFeeBase, newRStatus, newQuoteTarget, newBaseTarget;
        [newBaseTarget, newQuoteTarget] = this.getExpectedTarget();
        console.log(amount, "==_queryBuyBaseToken===newBaseTarget, newQuoteTarget====", newBaseTarget, newQuoteTarget);
        // charge fee from user receive amount
        lpFeeBase = Math.floor(DecimalMath.mul(amount, this._LP_FEE_RATE_));
        mtFeeBase = Math.floor(DecimalMath.mul(amount, this._MT_FEE_RATE_));

        let buyBaseAmount: number = amount.add(lpFeeBase).add(mtFeeBase).add(this.transfer_fee);
        console.log(amount, this.transfer_fee, "==_queryBuyBaseToken===amount,this.transfer_fee,===buyBaseAmount=", buyBaseAmount);

        if (this._R_STATUS_ == Types_RStatus.ONE) {
            // case 1: R=1
            payQuote = this._ROneBuyBaseToken(buyBaseAmount, newBaseTarget);
            newRStatus = Types_RStatus.ABOVE_ONE;
        } else if (this._R_STATUS_ == Types_RStatus.ABOVE_ONE) {
            // case 2: R>1
            payQuote = this._RAboveBuyBaseToken(buyBaseAmount, this._BASE_BALANCE_, newBaseTarget);
            newRStatus = Types_RStatus.ABOVE_ONE;
        } else if (this._R_STATUS_ == Types_RStatus.BELOW_ONE) {
            let backToOnePayQuote: number = Decimal(newQuoteTarget).sub(this._QUOTE_BALANCE_);
            let backToOneReceiveBase: number = Decimal(this._BASE_BALANCE_).sub(newBaseTarget);// / DecimalMath.ONE;
            ////console.log("==_queryBuyBaseToken=BELOW_ONE==buyBaseAmount=backToOnePayQuote, backToOneReceiveBase===",buyBaseAmount, backToOnePayQuote, backToOneReceiveBase);

            // case 3: R<1
            // complex case, R status may change
            if (Number(buyBaseAmount) < Number(backToOneReceiveBase)) {
                // case 3.1: R status do not change
                // no need to check payQuote because spare base token must be greater than zero
                payQuote = this._RBelowBuyBaseToken(buyBaseAmount, this._QUOTE_BALANCE_, newQuoteTarget);
                ////console.log("==_queryBuyBaseToken=BELOW_ONE===case 3.1==payQuote=", payQuote);

                newRStatus = Types_RStatus.BELOW_ONE;
            } else if (buyBaseAmount == backToOneReceiveBase) {
                // case 3.2: R status changes to ONE
                payQuote = backToOnePayQuote;
                newRStatus = Types_RStatus.ONE;
            } else {
                // case 3.3: R status changes to ABOVE_ONE
                payQuote = Decimal(backToOnePayQuote.add(
                    this._ROneBuyBaseToken(Decimal(buyBaseAmount).sub(backToOneReceiveBase), newBaseTarget)
                )).floor(0);
                ////console.log("==_queryBuyBaseToken=BELOW_ONE===case 3.3=payQuote==",buyBaseAmount,backToOneReceiveBase, payQuote);

                newRStatus = Types_RStatus.ABOVE_ONE;
            }
        }

        console.log("===payQuote, lpFeeBase, mtFeeBase, newRStatus, newQuoteTarget, newBaseTarget===", payQuote, lpFeeBase, mtFeeBase, newRStatus, newQuoteTarget, newBaseTarget);
        return [payQuote, lpFeeBase, mtFeeBase, newRStatus, newQuoteTarget, newBaseTarget];
    }
}


