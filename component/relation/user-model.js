const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const CONFIG = require('../../config/config');
var crypto = require('crypto');
var algorithm = 'aes256';
const mongooseLeanGetter = require('mongoose-lean-getters');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
        set: encrypt,
        get: decrypt
    },
    phone: {
        type: String,
        required: true,
        index: true,
        unique: true,
        set: encrypt,
        get: decrypt
    }
}, {
    versionKey: false,
    toObject: { getters: true, setters: true },
    toJSON: { getters: true, setters: true },
    runSettersOnQuery: true,
});

userSchema.plugin(mongooseLeanGetter);
userSchema.plugin(timestamps);

function encrypt(data) {
    var cipher = crypto.createCipheriv(algorithm, CONFIG.secret_key, "5183666c72eec9e4");
    var encrypted = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
    return encrypted
}
function decrypt(data) {
    var decipher = crypto.createDecipheriv(algorithm, CONFIG.secret_key, "5183666c72eec9e4");
    var decrypted = decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');
    return decrypted
}

module.exports = mongoose.model('User', userSchema);
