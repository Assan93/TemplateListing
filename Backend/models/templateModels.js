const { Schema, model } = require('../connection');
const mySchema = new Schema({
    name: String,
    category: String,
    description: String,
    price: Number,
    tags: String,
    author: String,
    createdAt: Date,
    image: String,
    cloudinary_id: String,
})

module.exports = model('Template', mySchema)