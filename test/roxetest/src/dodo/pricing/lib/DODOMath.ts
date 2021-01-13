/*

    Copyright 2020 DODO ZOO.
    SPDX-License-Identifier: Apache-2.0

*/


import "../utils/number.extensions";
import { SafeMath } from "./SafeMath";
import { DecimalMath } from "./DecimalMath";
const Decimal = require('decimal.js');

import BigNumber from "bignumber.js";
// or
// import { BigNumber } from "bignumber.js";


/**
 * @title DODOMath
 * @author DODO Breeder
 *
 * @notice s for complex calculating. Including ONE Integration and TWO Quadratic solutions
 */
export class DODOMath {

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
        console.log("_GeneralIntegrate==i, V1, V2=", i, V0, V1, V2);

        let fairAmount: number = Decimal(DecimalMath.mul(i, Decimal(V1).sub(V2)) * DecimalMath.ONE).floor(0); // i*delta

        const mm0 = new BigNumber(V0);
        const mm1 = new BigNumber(V1);
        const mm2 = new BigNumber(V2);
        const mmm0 = Decimal(mm0.multipliedBy(mm0).toString()).floor(0);
        const mmm1 = Decimal(new BigNumber(mmm0).dividedBy(mm1).toString()).floor(0);
        const mmm = Decimal(new BigNumber(mmm1 * DecimalMath.ONE).dividedBy(mm2).toString()).ceil(0);
        console.log("==mmm, mmm1, mmm0, ===",  mmm0,mmm1,mmm);
        let V0V0V1V20: number = mmm0;//V0.mul(V0);
        let V0V0V1V21: number = mmm1;//V0.mul(V0).div(V1);
        let V0V0V1V2: number = mmm;//Decimal(Decimal(mmm).div(V2)).ceil(0);//DecimalMath.divCeil(V0.mul(V0).div(V1), V2);
        let penalty: number = Decimal(DecimalMath.mul(k, V0V0V1V2)).floor(0); // k(V0^2/V1/V2)

        console.log("_GeneralIntegrate===", fairAmount, V0V0V1V20, V0V0V1V21, V0V0V1V2, penalty);
        const r0 = Decimal(DecimalMath.ONE).sub(k);
        const r1 = Decimal(DecimalMath.ONE).sub(k).add(penalty);
        const r = DecimalMath.mul(fairAmount, Decimal(DecimalMath.ONE).sub(k).add(penalty));
        console.log("_GeneralIntegrate===", r0, r1, r);

        return DecimalMath.mul(fairAmount, Decimal(DecimalMath.ONE).sub(k).add(penalty));
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
        console.log("==_SolveQuadraticForTrade==", ideltaB, deltaBSig, k, Q0, Q1, DecimalMath.mul(k, Q0), Decimal(DecimalMath.mul(k, Q0).mul(Q0)));

        // calculate -b value and sig
        // -b = (1-k)Q1-kQ0^2/Q1+i*deltaB
        const s = Decimal(DecimalMath.mul(k, Q0)).floor(0);
        let kQ02Q1: number = Decimal(Decimal(s).mul(Q0).div(Q1)).floor(0); // kQ0^2/Q1
        let b: number = Decimal(DecimalMath.mul(Decimal(DecimalMath.ONE).sub(k), Q1)).floor(0); // (1-k)Q1
        let minusbSig: boolean = true;
        console.log("==_SolveQuadraticForTrade=73=", b, kQ02Q1);
        ideltaB = ideltaB * DecimalMath.ONE;
        if (deltaBSig) {
            b = b.add(ideltaB); // (1-k)Q1+i*deltaB
        } else {
            kQ02Q1 = Decimal(kQ02Q1).add(ideltaB); // i*deltaB+kQ0^2/Q1
        }
        console.log("==_SolveQuadraticForTrade=80=", b, kQ02Q1);

        if (Number(b) >= Number(kQ02Q1)) {
            console.log("==_SolveQuadraticForTrade=b >= kQ02Q1=", minusbSig, b, kQ02Q1);
            b = Decimal(b).sub(kQ02Q1);
            minusbSig = true;
        } else {
            b = Decimal(kQ02Q1).sub(b);
            minusbSig = false;
        }
        console.log("==_SolveQuadraticForTrade=88=", minusbSig, b, kQ02Q1);


        // calculate sqrt
        const squareRootv0 = Decimal(Decimal(DecimalMath.ONE).sub(k).mul(4)).floor(0);
        const squareRootv010 = Decimal(DecimalMath.mul(k, Q0)).floor(0);// Decimal(DecimalMath.mul(k, Q0).mul(Q0)).floor(0);
        const squareRootv01 = Decimal(Decimal(squareRootv010).mul(Q0)).floor(0);

        //  const m1 = (Decimal(squareRootv0/ DecimalMath.ONE).mul(Decimal(squareRootv01/ DecimalMath.ONE)) );
        //  const m2 = m1* DecimalMath.ONE;
        // console.log("m1,m2===",m1,m2);
        const mm1 = new BigNumber(squareRootv0);
        const mm2 = new BigNumber(squareRootv01);
        const mmm = Decimal(mm1.multipliedBy(mm2).dividedBy(DecimalMath.ONE).toString()).floor(0);
        console.log("mm1,mm2===", mmm, mm1, mm2);

        let squareRootv1: number = mmm;//Decimal(DecimalMath.mul(squareRootv0,squareRootv01));//.floor(0); // 4(1-k)kQ0^2
        console.log("==_SolveQuadraticForTrade=squareRootv1=", squareRootv0, squareRootv010, squareRootv01, squareRootv1);
        let squareRoot = Decimal(b.mul(b).add(squareRootv1).sqrt()).floor(0); // sqrt(b*b+4(1-k)kQ0*Q0)

        // final res
        let denominator: number = Decimal(DecimalMath.ONE).sub(k).mul(2); // 2(1-k)
        let numerator: number;
        if (minusbSig) {
            numerator = Decimal(b).add(squareRoot);
        } else {
            numerator = Decimal(squareRoot).sub(b);
        }

        console.log("(numerator,==== denominator)", squareRoot, minusbSig, numerator, denominator);

        if (deltaBSig) {
            console.log("DecimalMath.divFloor(numerator,***** denominator)", DecimalMath.divFloor(numerator, denominator));
            return DecimalMath.divFloor(numerator, denominator).floor(0);
        } else {
            console.log("DecimalMath.divCeil(numerator, denominator)", DecimalMath.divCeil(numerator, denominator).ceil(0));
            return DecimalMath.divCeil(numerator, denominator).ceil(0);
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
        fairAmountd: number
    ) {
        const fairAmount = Decimal(fairAmountd).floor(0);
        console.log("V1, k, fairAmount==", V1, k, fairAmount);
        // V0 = V1+V1*(sqrt-1)/2k
        let sq: number = DecimalMath.mul(k, fairAmount);
        let sqrtv0: number = Decimal(sq).mul(4);
        let sqrtv1: number = Decimal(sqrtv0/V1);
        let sqrtv: number = sqrtv1 * DecimalMath.ONE;
        // let sqrt: number = (DecimalMath.divCeil(DecimalMath.mul(k, fairAmount).mul(4), V1)) * DecimalMath.ONE;
        let sqrt = sqrtv.add(DecimalMath.ONE).mul(DecimalMath.ONE).sqrt();
        let premium: number = Decimal(DecimalMath.divCeil(Decimal(sqrt).sub(DecimalMath.ONE), k.mul(2))).floor(0);
        console.log("===sq, sqrtv0, sqrtv1, sqrtv, sqrt, premium=", sq, sqrtv0, sqrtv1, sqrtv, sqrt, premium);
        // V0 is greater than or equal to V1 according to the solution
        const r = Decimal(DecimalMath.mul(V1, DecimalMath.ONE.add(premium))).floor(0);
        console.log("r= ", r);
        // premium=1.254822;
        //console.log("DecimalMath.mul(V1, DecimalMath.ONE.add(premium))", DecimalMath.mul(V1, Decimal(DecimalMath.ONE).add(Decimal(premium*DecimalMath.ONE).floor(0))));
        return r;
    }
}
