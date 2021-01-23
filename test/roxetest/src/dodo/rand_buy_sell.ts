
import { Dos } from "./client_data_prod_test";
import { prettyJson } from "../lib/prettyjson";
// const { deployContractjs } = require('../lib/deployContract_api_utils')
import { Client } from "../lib/client";
import { ClientUtil } from "../lib/client_util";

const dotenv = require('dotenv');
const dotenvParseVariables = require('dotenv-parse-variables');

let env = dotenv.config({})
if (env.error) throw env.error;
env = dotenvParseVariables(env.parsed);


const arg_offset = 2;
const user_arg_offset = 0;

var argumentss: any = process.argv.splice(arg_offset);
console.log('所传递的参数是：', argumentss);

// // //////////////////////////
// // // print process.argv
process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
});


const cron = require('node-cron')
async function runJob() {
    /**
     * 基本使用
     * 第一個參數：排成格式
     * 第二個參數：要執行的 function
     * 第三個參數：是否要立即執行
     **/
    let counter = 0;
    var lasttimestamp =0 ;
    let task = cron.schedule('*/5 * * * * *', async () => {
         var currtimestamp = +new Date();
        if (currtimestamp > lasttimestamp) {
            var s = await GetRandomNum(5, 10);
            console.log('hello world',s, counter++, new Date().getSeconds())
            lasttimestamp = currtimestamp + s;
        }

    }, true)

    task.start()
    // task.stop()
    // task.destroy()

    /**
     * 檢驗是否是有效的排程格式
     **/
    cron.validate('* * * * * *')

    // cron-table


    // /**
    //  * 一段時間後自動執行
    // **/
    // '* * * * * *'			// 每秒跑一次
    // '*/2 * * * *'			// 兩分鐘跑一次

    // /**
    //  * 特定時間執行
    //  **/
    // '1,3,4,5 * * * *'		// 每到分鐘數為 1, 3, 4, 5 時執行
    // '1-5 * * * *'			// 分鐘數為 1, 2, 3, 4, 5 時執行
    // 安裝
    // 1
    // $ npm install node-cron
}



async function GetRandomNum(Min: any, Max: any) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}


runJob()