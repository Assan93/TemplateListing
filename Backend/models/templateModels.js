const { Schema, model } = require('../connection');
const mySchema = new Schema({
    TemplateId: String,
    TemplateName: String,
    Category: String,
    Description:String,
    Price : Number,
    Rating : Number,
    Tags : String,
    Author: String,
    DateCreated: Date,
    Populate : String
}) 

module.exports = (model('Template', mySchema))