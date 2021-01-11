/*

    Copyright 2020 DODO ZOO.
    SPDX-License-Identifier: Apache-2.0

*/


import { SafeMath } from "./SafeMath";
// import "../utils/number.extensions";
const Decimal = require('decimal.js');
const   dotenv = require('dotenv');
dotenv.load();
const ONE_DECIMAL= Decimal(process.env.PRICING_DODO_EARN_ONE_DECIMALS);
/**
 * @title DecimalMath
 * @author DODO Breeder
 *
 * @notice s for fixed point number with 18 decimals
 */
export class DecimalMath {

    static ONE: number = Math.pow(10, ONE_DECIMAL);

    static mul(target: number, d: number) {
        //console.log("====mul=====",target, d);
        return (Decimal(target).mul(Decimal(d)) / DecimalMath.ONE);
    }

    static mulCeil(target: number, d: number) {
        // return Decimal(target).mul(Decimal(d)).divCeil(DecimalMath.ONE);
        return Decimal(target).mul(Decimal(d)).div(DecimalMath.ONE);
    }

    static divFloor(target: number, d: number) {
        return Decimal(target).mul(Decimal(DecimalMath.ONE)).div(Decimal(d));
    }

    static divCeil(target: number, d: number) {
        // return Decimal(target).mul(DecimalMath.ONE).divCeil(Decimal(d));
        return Decimal(target).mul(DecimalMath.ONE).div(Decimal(d));
    }
}

// export default DecimalMath;