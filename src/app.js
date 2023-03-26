const express =require("express")
const mongoos=require('mongoose')
const hbs=require('hbs')

const server=express();
const urlcloude="mongodb+srv://risabvishwakarma:m76EMRWHA3ZlNaAm@cluster0.6bq38zd.mongodb.net/DynemicWebDB"
// const url='mongodb://localhost:27017/DynemicWebDB'
const PORT=process.env.PORT|8087
mongoos.connect(urlcloude)
const db_connection=mongoos.connection


const main=require("./routes/main")
const Detail=require("./model/Details")
const Slider=require("./model/slider")

db_connection.on('open',()=>{
    console.log("connected...");
//     Slider.create(
      
//     [{
//         title:"Title 1",
//         subTitle:"subt",
//         url:"/static/images/s1.png",
//         class:"active"
//     },
//     {
//         title:"Title 2",
//         subTitle:"sub Title",
//         url:"/static/images/s1.png",
//         class:"active"
//     }
// ]

//     )
})

server.use('/static',express.static("public"))
server.use('',main);

server.set('view engine','hbs');
server.set("views","views")
hbs.registerPartials("views/partials")



server.listen(PORT,(req,res)=>{
    console.log("Running...")
})


