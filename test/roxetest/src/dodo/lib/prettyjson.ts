const prettier = require("prettier");


export const prettyJson = async (log:any) => {
    console.log(prettier.format(JSON.stringify(log), { semi: false, parser: "json" }));
    // let jsonstr = await jq.run('.', JSON.stringify(log), { input: 'string', output: 'pretty' });
    // console.log(JSON.stringify(log));
};

// module.exports = {prettyJson};