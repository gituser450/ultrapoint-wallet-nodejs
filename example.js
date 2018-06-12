const UltrapointWallet = require('./lib/wallet');

let wallet = new UltrapointWallet();

// //# or with rpc authentification needed
 
// let wallet = new UltrapointWallet('127.0.0.1', 17092, 'upxrpcuser', 'passwdrpc');

// examples

// //# used when rpc wallet is started with `--wallet-dir` option

// wallet.createWallet('upx_testy', 'testy').then((result) => {
//     console.log(result);
// });

// wallet.openWallet('upx_testy', 'testy').then((result) => {
//     console.log(result);
// });

// //#

// wallet.makeIntegratedAddress().then((result) => {
//     console.log(result);
// });

// wallet.getBalance().then((response) => {
//     console.log(response);
// });
//
// wallet.getAddress().then((response) => {
//     console.log(response);
// });
//
// wallet.getHeight().then((height) => {
//     console.log(height);
// });
//
// wallet.incomingTransfers('all').then((result) => {
//     console.log(result);
// });

// wallet.getBalance().then((result) => {
//     console.log(result);
// });

var body = {
    destinations: {
        address: '7Ey8jHDkWqYDSpoSssv5EmAcsXCct4hum4mhHxT6ruaof9C7JM1ekjsYFa8dQEUL4QMai15akL2az2Me48ShgNMWV3yBkSV',
        amount: 1
    }
};

wallet.transfer(body).then((result) => {
   console.log(result);
});
