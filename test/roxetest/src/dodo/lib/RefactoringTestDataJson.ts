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


(async function () {
    await testRefactoring();

})();
