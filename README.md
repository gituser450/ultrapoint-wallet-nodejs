# ultrapoint-wallet-nodejs

A Node.js wallet manager for interacting with `ultrapoint-wallet-rpc` over JSON-RPC. 

For more information about Ultrapoint, visit: https://ultrapoint.org

Donations:

UPX: `7Ey8jHDkWqYDSpoSssv5EmAcsXCct4hum4mhHxT6ruaof9C7JM1ekjsYFa8dQEUL4QMai15akL2az2Me48ShgNMWV3yBkSV`

## Install the package 

### via NPM

```sh
npm install ultrapoint-wallet
```

### Or clone the Github repository

```sh
git clone https://github.com/ultrapoint/ultrapoint-wallet-nodejs.git
```

## Initializing a wallet

Require the module:

```js
const UltrapointWallet = require('ultrapoint-wallet');
```

Create a new instance of the wallet:

```js
let wallet = new UltrapointWallet();
```

This creates a wallet using the following `ultrapoint-wallet-rpc` default RPC settings:
   
* `hostname` - '127.0.0.1'
* `port` - 17092

To connect to a wallet with different settings, pass in the values:

```js
let wallet = new UltrapointWallet($HOSTNAME, $PORT);

// or with rpc authentification needed
$wallet = new UltrapointWallet($HOSTNAME, $PORT, $USERNAME, $PASSWORD);

```

**Note: versions of ultrapoint-wallet-nodejs prior to 3.0 require `hostname` with the 'http://' prefix, 3.0 and greater only require the IP address.**

## Testing

Some basic tests can now be run locally to verify the library and your `ultrapoint-wallet-rpc` instance are communicating. The tests assume RPC wallet will be listening at the default config settings. Tests are run via mocha.
To run the tests, clone the repository and then:
    
    npm install
    npm test

## Example Usage

```js
wallet.getBalance().then(function(balance) {
    console.log(balance);
});
```

## Run an Instance of the RPC Wallet

For internal communication through library and RPC wallet, following options are optional:

```sh
--rpc-bind-port
--rpc-bind-ip
--daemon-host
--confirm-external-bind
```

**Note**: more informations can be found using `--help` option.

### Without authentification

```sh
ultrapoint-wallet-rpc --password "$wallet_password" --wallet-file $wallet_filepath --rpc-bind-port 17092 --rpc-bind-ip $external_ip --daemon-host $external_ip --confirm-external-bind --disable-rpc-login
```

### With authentification

```sh
ultrapoint-wallet-rpc --password "$wallet_password" --wallet-file $wallet_filepath --rpc-bind-port 17092 --rpc-bind-ip $external_ip --daemon-host $external_ip --confirm-external-bind --rpc-login 'upxrpc_user:rpc_password'
```

### Multi-wallets usage

```sh
ultrapoint-wallet-rpc --password "$wallet_password" --wallet-file $wallet_filepath --rpc-bind-port 17092 --rpc-bind-ip $external_ip --daemon-host $external_ip --confirm-external-bind --rpc-login 'upxrpc_user:rpc_password' --wallet-dir $wallet_dirpath
```


## Wallet Methods

### createWallet

Usage:

```js
// used when rpc wallet is started with `--wallet-dir` option

wallet.createWallet('upx_wallet', 'ultrapoint', 'English');
```

Creates a new wallet.
    
Parameters:

* `filename` - filename of wallet to create (*string*)
* `password` - wallet password (*string*)
* `language` - language to use for mnemonic phrase (*string*)

Example response: 

```js
{}
```

Returns an object with `error` field if unsuccessful.

### openWalllet

Usage:

```js
// used when rpc wallet is started with `--wallet-dir` option

wallet.openWallet('upx_wallet', 'ultrapoint');
```

Opens a wallet.
    
Parameters:

* `filename` - filename of wallet to open (*string*)
* `password` -wallet password (*string*)

Example response: 

```js
{}
```

Returns an object with `error` field if unsuccessful.

### getBalance

Usage:

```js
wallet.getBalance();
```

Responds with the current balance and unlocked (spendable) balance of the wallet in atomic units. Divide by 1e8 to convert.
    
Example response: 

```
{ balance: 361198014257, unlocked_balance: 361198014257 }
```

### getAddress

Usage:

```js
wallet.getAddress();
```

Responds with the Ultrapoint address of the wallet.

Example response:

```js
{ address: '7Ey8jHDkWqYDSpoSssv5EmAcsXCct4hum4mhHxT6ruaof9C7JM1ekjsYFa8dQEUL4QMai15akL2az2Me48ShgNMWV3yBkSV' }
```

### transfer

Usage:

```js
wallet.transfer(options);
```

Transfers Ultrapoint to a single recipient OR a group of recipients in a single transaction. Responds with the transaction hash of the payment.

Parameters:

* `options` - an object with the following properties (*optional*): 

```js
{
    'destinations': (object OR array of objects)
    'mixin': (*int*), // amount of existing transaction outputs to mix yours with (default is 4)
    'unlockTime': (*int*), // number of blocks before tx is spendable (default is 0)
    'pid': (*string*) // optional payment ID (a 64 character hexadecimal string used for identifying the sender of a payment)
    'payment_id': (*string*) // optional payment ID (a 64 character hexadecimal string used for identifying the sender of a payment)
    'do_not_relay': (*boolean*) // optional boolean used to indicate whether a transaction should be relayed or not
    'priority': (*int*) // optional transaction priority
    'get_tx_hex': (*boolean*) // optional boolean used to indicate that the transaction should be returned as hex string after sending
    'get_tx_key': (*boolean*) // optional boolean used to indicate that the transaction key should be returned after sending
}
```

Example:

```js
$options = {
    'destinations': (object) {
        'amount': '1',
        'address': '7Ey8jHDkWqYDSpoSssv5EmAcsXCct4hum4mhHxT6ruaof9C7JM1ekjsYFa8dQEUL4QMai15akL2az2Me48ShgNMWV3yBkSV'
    }
};
```

Example response:

```js
{ tx_hash: '<b9272a68b0f242769baa1ac2f723b826a7efdc5ba0c71a2feff4f292967936d8>', tx_key: '' }
```

### transferSplit

Usage:

```js
wallet.transferSplit(options);
```

Same as `transfer`, but can split into more than one transaction if necessary. Responds with a list of transaction hashes.

Additional property available for the `options` parameter:

* `new_algorithm` - `true` to use the new transaction construction algorithm. defaults to `false`. (*boolean*)

Example response:

```js
{ tx_hash_list: [ '<f17fb226ebfdf784a0f5814e1c5bb78c19ea26930a0d706c9dc1085a250ceb37>' ] }
```

### sweepDust

Usage:

```js
wallet.sweepDust();
```

Sends all dust outputs back to the wallet, to make funds easier to spend and mix. Responds with a list of the corresponding transaction hashes.

Example response:

```js
{ tx_hash_list: [ '<75c666fc96120a643321a5e76c0376b40761582ee40cc4917e8d1379a2c8ad9f>' ] }
```

### sweepAll

Usage:

```js
wallet.sweepAll('7Dty8AeoNi3CgvYRH7rpEoQVRrkCETSdrKAdPE3kVTyYjmh21iiw48z5HEj5nGub1y9pVLLx8gZmwGNKRuLLtaMSLe9QdWx');
```

Sends all spendable outputs to the specified address. Responds with a list of the corresponding transaction hashes.

Example response:

```js
{ tx_hash_list: [ '<75c666fc96120a643321a5e76c0376b40761582ee40cc4917e8d1379a2c8ad9f>' ] }
```

### getPayments

Usage:

```js
wallet.getPayments(paymentID);
```

Returns a list of incoming payments using a given payment ID.

Parameters:

* `paymentID` - the payment ID to scan wallet for included transactions (*string*)

### getBulkPayments

Usage:

```js
wallet.getBulkPayments(paymentIDs, minHeight);
```

Returns a list of incoming payments using a single payment ID or a list of payment IDs from a given height.

Parameters:

* `paymentIDs` - the payment ID or list of IDs to scan wallet for (*array*)
* `minHeight` - the minimum block height to begin scanning from (example: 800000) (*number*)

### incomingTransfers

Usage:

```js
wallet.incomingTransfers(type);
```

Returns a list of incoming transfers to the wallet.

Parameters:

* `type` - accepts `"all"`: all the transfers, `"available"`: only transfers that are not yet spent, or `"unavailable"`: only transfers which have been spent (*string*)

### queryKey

Usage:

```js
wallet.queryKey(type);
```

Returns the wallet's spend key (mnemonic seed) or view private key.

Parameters:

* `type` - accepts `"mnemonic"`: the mnemonic seed for restoring the wallet, or `"view_key"`: the wallet's view key (*string*)

### makeIntegratedAddress

Usage:

```js
wallet.makeIntegratedAddress(paymentID);
```

OR:

```js
wallet.makeIntegratedAddress();
```

Make and return a new integrated address from your wallet address and a payment ID.

Parameters:

* `paymentID` - a 64 character hex string. if not provided, a random payment ID is generated. (*string*, optional)

Example response:

```js
{ integrated_address: '9HCSju123guax69cVdqVP5APVLkcxxjjXdcP9fJWZdNc5mEpn3fXQY1CFmJDvyUXzj2Fy9XafvUgMbW91ZoqwqmQ96NYBVqEd6JAu9j3gk' }
```

### splitIntegratedAddress
Usage:

```js
wallet.splitIntegratedAddress(address);
```

Returns the standard address and payment ID corresponding to a given integrated address.

Parameters:

* `address` - an integrated Ultrapoint address (*string*)

Example response:

```js
{ payment_id: '<61eec5ffd3b9cb57>',
  standard_address: '7Ey8jHDkWqYDSpoSssv5EmAcsXCct4hum4mhHxT6ruaof9C7JM1ekjsYFa8dQEUL4QMai15akL2az2Me48ShgNMWV3yBkSV' }
```

### getHeight 

Usage:

```js
wallet.getHeight();
```

Returns the current block height of the daemon.

Parameters:

* `callback` - a callback function that responds with an error or the response data in the following order: (*error, data*)

Example response:

```js
{ height: 874458 }
```

### store

Usage:

```js
wallet.store();
```

### stopWallet

Usage:

```js
wallet.stopWallet();
```

Cleanly shuts down the current `ultrapoint-wallet-rpc` process.