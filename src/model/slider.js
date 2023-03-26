const sliderdata=require("mongoose")

const slider=sliderdata.Schema({
    title:String,
    subTitle:String,
    url:String,
    class:String


});

module.exports=sliderdata.model("Slider",slider)