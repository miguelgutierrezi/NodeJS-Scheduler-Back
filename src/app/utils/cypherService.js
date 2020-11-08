const config = require('../../config/config');
const CryptoJS = require('crypto-js');

exports.decrypt = (cypherText) => {
    const key = config.cypherKey;
    const bytes = CryptoJS.AES.decrypt(cypherText, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}
