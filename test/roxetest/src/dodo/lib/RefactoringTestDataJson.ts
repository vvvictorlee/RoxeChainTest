import { loadJson } from "../../lib/util"
async function refactoringTestJson(testdatajson: any) {
    let actions = testdatajson.actions;
    let u2gactions = actions.filter((action: any) =>
        action.action_trace.act.data.hasOwnProperty("dodo_name")
        && action.action_trace.act.data.dodo_name == "usd2gbp44444"
        && (action.action_trace.act.name == "depositquote"
            || action.action_trace.act.name == "depositbase" ||
            action.action_trace.act.name == "withdrawquote" ||
            action.action_trace.act.name == "buybasetoken" ||
            action.action_trace.act.name == "sellbastoken"
        )
    );

    let allactions = u2gactions.map((action: any) => {
        let o = Object.assign({ name: action.action_trace.act.name }, action.action_trace.act.data);
        delete o.msg_sender;
        delete o.dodo_name;
        const fields = ["amt", "amount", "minReceiveQuote", "maxPayQuote"];
        for (let field of fields) {
            if (o.hasOwnProperty(field)) {
                o[field] = o[field].quantity.split(" ")[0].replace(".", "");
            }
        }

        return Object.values(o);
    });


    return allactions;
}

export async function testRefactoring() {
    const testdata = await loadJson("../data/actionsallp.json");
    let testjson = await refactoringTestJson(testdata);
    console.log(testjson);
    return testjson;
}


// (async function () {
//     await testRefactoring();
// })();


const s = {
    "created_date": "2019-01-29T04:04:03.258323",
    "order_hash": "0x3f8d16507c4d9905815e860324d64b9c9f5933a70e59c2a07a63320459f67826",
    "metadata": {
        "asset": {
            "id": "505",
            "address": "0x16baf0de678e52367adc69fd067e5edd1d33e3bf"
        },
        "schema": "ERC721"
    },
    "exchange": "0x5206e78b21ce315ce284fb24cf05e0585a93b1d9",
    "maker": {
        "user": {
            "username": "alex2"
        },
        "profile_img_url": "https://storage.googleapis.com/opensea-static/opensea-profile/11.png",
        "address": "0xe96a1b303a1eb8d04fb973eb2b291b8d591c8f72",
        "config": "affiliate"
    },
    "taker": {
        "user": null,
        "profile_img_url": "https://storage.googleapis.com/opensea-static/opensea-profile/1.png",
        "address": "0x0000000000000000000000000000000000000000",
        "config": ""
    },
    "current_price": "10000000000000000",
    "current_bounty": "100000000000000.0",
    "maker_relayer_fee": "100",
    "taker_relayer_fee": "250",
    "maker_protocol_fee": "0",
    "taker_protocol_fee": "0",
    "maker_referrer_fee": "0",
    "fee_recipient": {
        "user": null,
        "profile_img_url": "https://storage.googleapis.com/opensea-static/opensea-profile/1.png",
        "address": "0x0000000000000000000000000000000000000000",
        "config": ""
    },
    "fee_method": 1,
    "side": 1,
    "sale_kind": 0,
    "target": "0x16baf0de678e52367adc69fd067e5edd1d33e3bf",
    "how_to_call": 0,
    "calldata": "0x23b872dd000000000000000000000000e96a1b303a1eb8d04fb973eb2b291b8d591c8f72000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001f9",
    "replacement_pattern": "0x000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000000",
    "static_target": "0x0000000000000000000000000000000000000000",
    "static_extradata": "0x",
    "payment_token": "0xc778417e063141139fce010982780140aa0cd5ab",
    "payment_token_contract": {
        "address": "0xc778417e063141139fce010982780140aa0cd5ab",
        "image_url": null,
        "name": "Wrapped Ether",
        "symbol": "WETH",
        "decimals": 18,
        "eth_price": "1.000000000000000"
    },
    "base_price": "10000000000000000",
    "extra": "0",
    "listing_time": 1548734810,
    "expiration_time": 0,
    "salt": "83006245783548033686093530747847303952463217644495033304999143031082661844460",
    "v": 28,
    "r": "0x2a0b0f3b8e6705cdf7894d9f1fb547646c5502a9d1d993c308ed0310620cf660",
    "s": "0x19211a9a0c3ab3bb94b840774a2f9badf637b95d90b68965a4cf3734d5eaba98",
    "cancelled": false,
    "finalized": false,
    "marked_invalid": false,
    "prefixed_hash": "0x98a07dfb9e4da7ffc0ad0fb230afc8684dc4a0ac44623eded6a4c42e1df99954"
};

function test(s: any,pre:any) {
    for (let k of Object.keys(s)) {
        const v = s[k];
        if (typeof v  === 'object' && v !== null) {
            test(v,pre+k+".");
        }
        else {
            console.log('OrderField::new(b\"'+pre+k+'", b"'+v+'"),');
        }
    }
}

test(s,"");

