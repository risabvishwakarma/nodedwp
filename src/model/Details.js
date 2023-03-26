const database=require('mongoose')
const details =database.Schema({
    brandName:String,
    brandIcon:String,
    links:[{
        label:String,
        url:String
    }]
});

module.exports = database.model("Details",details);