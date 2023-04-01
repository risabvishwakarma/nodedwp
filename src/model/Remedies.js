const database=require('mongoose')
const remedies =database.Schema({
    index:String,
    causes:String,
    details:String,
    remedies:String,
    symptoms:String,
    name:String
});

module.exports = database.model("Remedies",remedies);