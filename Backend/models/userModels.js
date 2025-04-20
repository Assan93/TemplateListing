const { Schema, model } = require('../connection');
const userSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String, required: true },
    city: { type: String, default: 'unknown' },
    createdAt: { type: Date, default: Date.now },
})


module.exports = model('users', userSchema);