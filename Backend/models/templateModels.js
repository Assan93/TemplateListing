const { Schema, model } = require('../connection');
const mySchema = new Schema({
    name: String,
    category: String,
    description: String,
    price: Number,
    rating: Number,
    tags: String,
    author: String,
    createdAt: Date,
})

module.exports = (model('Template', mySchema))