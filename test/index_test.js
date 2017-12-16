'use strict';
var ultrapointWallet = require('../lib/wallet');

describe('ultrapointWallet', () => {
    const Wallet = new ultrapointWallet();

    describe('constructor', () => {
        it('should have default host set to `127.0.0.1`', () => {
            new ultrapointWallet().hostname.should.equal('127.0.0.1');
        });

        it('should have default port set to 17072', () => {
            new ultrapointWallet().port.should.equal(17072);
        });
    });

    describe('methods', () => {
        describe('balance()', () => {
            it('should retrieve the account balance', (done) => {
                Wallet.balance().then(function(result){
                    result.balance.should.be.a.Number();
                    done();
                })
            })
        })

        describe('address()', () => {
            it('should return the account address', (done) => {
                Wallet.address().then(function(result){
                    result.address.should.be.a.String();
                    done();
                })
            })
        })
    })
})
