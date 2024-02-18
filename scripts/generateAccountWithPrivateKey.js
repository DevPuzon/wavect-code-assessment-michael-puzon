const EthereumTx = require('ethereumjs-tx').Transaction;
const { randomBytes } = require('crypto');
const { privateToAddress, toChecksumAddress } = require('ethereumjs-util');

function generateAddress() {
    let privateKey;
    let address;
 
    do {
        privateKey = Buffer.concat([Buffer.from('00', 'hex'), randomBytes(30), Buffer.from('00', 'hex')]);
    } while (!privateKey || privateKey[0] !== 0 || privateKey[1] !== 0 || privateKey[31] !== 0);
 
    const publicKey = privateToAddress(privateKey);
    const addressBuffer = Buffer.from(publicKey);
    const checksumAddress = toChecksumAddress('0x00' + addressBuffer.toString('hex') + '00');

    address = checksumAddress;

    return { address, privateKey: privateKey.toString('hex') };
}
 
const { address, privateKey } = generateAddress();
console.log("Address:", address);
console.log("Private Key:", privateKey);
