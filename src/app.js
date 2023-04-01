const express =require("express")
const mongoos=require('mongoose')
const hbs=require('hbs')
const bodyParser = require('body-parser')
const ax=require('axios')

const server=express();
// const urlcloude="mongodb+srv://risabvishwakarma:m76EMRWHA3ZlNaAm@cluster0.6bq38zd.mongodb.net/DynemicWebDB"
const urlcloude='mongodb+srv://risabvishwakarma:m76EMRWHA3ZlNaAm@cluster0.6bq38zd.mongodb.net/FinalProject'
const PORT=process.env.PORT|8087
mongoos.connect(urlcloude)
const db_connection=mongoos.connection

server.use(bodyParser.urlencoded({ extended: false }))

server.use(bodyParser.json())


const main=require("./routes/main")
const api_router=require("./routes/api_router")
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
// server.use('/api',api_router);

server.set('view engine','hbs');
server.set("views","views")
hbs.registerPartials("views/partials")

server.get("/order",async(req,res)=>{
    console.log("response");
    try {
        const response = await ax.get('http://localhost:8080/order/');
        console.log(response);
      } catch (error) {
        console.error(error);
      }
})


server.listen(PORT,(req,res)=>{
    console.log("Running...")
})


