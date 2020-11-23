const chain = require('./chain');
const wallet = require('./wallet');
// 47.91.226.192:7878
let HOST = '47.91.226.192';
let CHAIN_PORT = '7878';

// let HOST = '10.100.1.10';
let WALLET_HOST = '10.100.1.10';
// let CHAIN_PORT = '8888';
let WALLET_PORT = '8889';

module.exports = {
    chain: (host, chain_port) => chain(host ? host : HOST, chain_port ? chain_port : CHAIN_PORT),
    wallet: (host, wallet_port) => wallet(host ? host : WALLET_HOST, wallet_port ? wallet_port : WALLET_PORT),
}
