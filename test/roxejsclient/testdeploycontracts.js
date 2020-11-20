const { Api, JsonRpc, RpcError } = require('roxejs')
const { JsSignatureProvider } = require('roxejs/dist/roxejs-jssig')      // development only
const fetch = require('node-fetch')                                   // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util')

const defaultPrivateKey = "5KS2QMfShmDjHaLAZEPJgehVXAobgo5YfVw1mzPBHaPpGfKbkZL";
const signatureProvider = new JsSignatureProvider([defaultPrivateKey])
const rpc = new JsonRpc('http://47.91.226.192:7878', { fetch })

const api = new Api({ 
    rpc, 
    signatureProvider, 
    textDecoder: new TextDecoder(), 
    textEncoder: new TextEncoder() 
})

const transactWithConfig = async () => await api.transact({
    actions: [{
        account: 'roxe.token',
        name: 'transfer',
        authorization: [{
            actor: 'defi',
            permission: 'active',
        }],
        data: {
            from: 'defi',
            to: 'roxe',
            quantity: '0.0001 ROC',
            memo: '',
        },
    }]
}, {
    blocksBehind: 3,
    expireSeconds: 30,
});

const transactWithoutConfig = async () => {
    console.log(111)
    const transactionResponse = await transactWithConfig();
    console.log(transactionResponse)
    const blockInfo = await rpc.get_block(transactionResponse.processed.block_num - 3);
    console.log(blockInfo)
}
// transactWithoutConfig()






const wasmFilePath = './hello.wasm'
 const abiFilePath = './hello.abi'
 const fs = require('fs')
 const { Api, JsonRpc, Serialize } = require('eosjs');
 const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');
 const fetch = require('node-fetch'); //node only
 const { TextDecoder, TextEncoder } = require('util'); //node only
 let privateKey1   = '5J***********'
 const privateKeys = [privateKey1];

 const signatureProvider = new JsSignatureProvider(privateKeys);
 const rpc = new JsonRpc('https://jungle2.cryptolions.io:443', { fetch }); //required to read blockchain state
 const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() }); 


 const wasmHexString = fs.readFileSync(wasmFilePath).toString('hex')

 const buffer = new Serialize.SerialBuffer({
     textEncoder: api.textEncoder,
     textDecoder: api.textDecoder,
 })

 let abiJSON = JSON.parse(fs.readFileSync(abiFilePath, 'utf8'))
 const abiDefinitions = api.abiTypes.get('abi_def')
 abiJSON = abiDefinitions.fields.reduce(
     (acc, { name: fieldName }) =>
         Object.assign(acc, { [fieldName]: acc[fieldName] || [] }),
         abiJSON
     )
 abiDefinitions.serialize(buffer, abiJSON)
 let serializedAbiHexString = Buffer.from(buffer.asUint8Array()).toString('hex')

 deployContract();

 async function deployContract(){

 try{
 const wasmFilePath = './hello.wasm'
 const abiFilePath = './hello.abi'
 const fs = require('fs')
 const { Api, JsonRpc, Serialize } = require('eosjs');
 const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');  // development only
 const fetch = require('node-fetch'); //node only
 const { TextDecoder, TextEncoder } = require('util'); //node only
 let privateKey1   = '5J***********'
 const privateKeys = [privateKey1];

 const signatureProvider = new JsSignatureProvider(privateKeys);
 const rpc = new JsonRpc('https://jungle2.cryptolions.io:443', { fetch }); //required to read blockchain state
 const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() }); 

 const wasmHexString = fs.readFileSync(wasmFilePath).toString('hex')

 const buffer = new Serialize.SerialBuffer({
     textEncoder: api.textEncoder,
     textDecoder: api.textDecoder,
 })

 let abiJSON = JSON.parse(fs.readFileSync(abiFilePath, 'utf8'))
 const abiDefinitions = api.abiTypes.get('abi_def')
 abiJSON = abiDefinitions.fields.reduce(
     (acc, { name: fieldName }) =>
         Object.assign(acc, { [fieldName]: acc[fieldName] || [] }),
         abiJSON
     )
 abiDefinitions.serialize(buffer, abiJSON)
 let serializedAbiHexString = Buffer.from(buffer.asUint8Array()).toString('hex')

 deployContract();

 async function deployContract(){
   try{
       await api.transact(
           {
             actions: [
               {
                 account: 'eosio',
                 name: 'setcode',
                 authorization: [
                   {
                     actor: user_name,
                     permission: 'active',
                   },
                 ],
                 data: {
                   account: user_name,
                   vmtype: '0',
                   vmversion: '0',
                   code: wasmHexString,
                 },
               },
               {
                 account: 'eosio',
                 name: 'setabi',
                 authorization: [
                   {
                     actor: user_name,
                     permission: 'active',
                   },
                 ],
                 data: {
                   account: user_name,
                   abi: serializedAbiHexString,
                 },
               },
             ],
           },
           {
             blocksBehind: 3,
             expireSeconds: 30,
           }
         )
       }
       catch(e){
           console.log(e)
       }
    };
 };
 }


// /////////////////////////////////////////

// ////error
// const wasmFilePath = './hello.wasm'
//  const abiFilePath = './hello.abi'
//  const fs = require('fs')
//  const { Api, JsonRpc, Serialize } = require('eosjs');
//  const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');  // development only
//  const fetch = require('node-fetch'); //node only
//  const { TextDecoder, TextEncoder } = require('util'); //node only
//  let privateKey1   = '5J***********'
//  const privateKeys = [privateKey1];

//  const signatureProvider = new JsSignatureProvider(privateKeys);
//  const rpc = new JsonRpc('https://jungle2.cryptolions.io:443', { fetch }); //required to read blockchain state
//  const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() }); 


//  const wasmHexString = fs.readFileSync(wasmFilePath).toString('hex')

//  const buffer = new Serialize.SerialBuffer({
//      textEncoder: api.textEncoder,
//      textDecoder: api.textDecoder,
//  })

//  let abiJSON = JSON.parse(fs.readFileSync(abiFilePath, 'utf8'))
//  const abiDefinitions = api.abiTypes.get('abi_def')
//  abiJSON = abiDefinitions.fields.reduce(
//      (acc, { name: fieldName }) =>
//          Object.assign(acc, { [fieldName]: acc[fieldName] || [] }),
//          abiJSON
//      )
//  abiDefinitions.serialize(buffer, abiJSON)
//  let serializedAbiHexString = Buffer.from(buffer.asUint8Array()).toString('hex')

//  deployContract();

//  async function deployContract(){

//  try{
//  const wasmFilePath = './hello.wasm'
//  const abiFilePath = './hello.abi'
//  const fs = require('fs')
//  const { Api, JsonRpc, Serialize } = require('eosjs');
//  const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');  // development only
//  const fetch = require('node-fetch'); //node only
//  const { TextDecoder, TextEncoder } = require('util'); //node only
//  let privateKey1   = '5J***********'
//  const privateKeys = [privateKey1];

//  const signatureProvider = new JsSignatureProvider(privateKeys);
//  const rpc = new JsonRpc('https://jungle2.cryptolions.io:443', { fetch }); //required to read blockchain state
//  const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() }); 

//  const wasmHexString = fs.readFileSync(wasmFilePath).toString('hex')

//  const buffer = new Serialize.SerialBuffer({
//      textEncoder: api.textEncoder,
//      textDecoder: api.textDecoder,
//  })

//  let abiJSON = JSON.parse(fs.readFileSync(abiFilePath, 'utf8'))
//  const abiDefinitions = api.abiTypes.get('abi_def')
//  abiJSON = abiDefinitions.fields.reduce(
//      (acc, { name: fieldName }) =>
//          Object.assign(acc, { [fieldName]: acc[fieldName] || [] }),
//          abiJSON
//      )
//  abiDefinitions.serialize(buffer, abiJSON)
//  let serializedAbiHexString = Buffer.from(buffer.asUint8Array()).toString('hex')

//  deployContract();

//  async function deployContract(){
//    try{
//        await api.transact(
//            {
//              actions: [
//                {
//                  account: 'eosio',
//                  name: 'setcode',
//                  authorization: [
//                    {
//                      actor: user_name,
//                      permission: 'active',
//                    },
//                  ],
//                  data: {
//                    account: user_name,
//                    code: wasmHexString,
//                  },
//                },
//                {
//                  account: 'eosio',
//                  name: 'setabi',
//                  authorization: [
//                    {
//                      actor: user_name,
//                      permission: 'active',
//                    },
//                  ],
//                  data: {
//                    account: user_name,
//                    abi: serializedAbiHexString,
//                  },
//                },
//              ],
//            },
//            {
//              blocksBehind: 3,
//              expireSeconds: 30,
//            }
//          )
//        }
//        catch(e){
//            console.log(e)
//        }
//     };
//  };   