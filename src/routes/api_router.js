const router=require('express').Router()
const ax=require('axios')

const API=require("../APIS/api")

const allProducts=  new Promise( (res,rej)=>{
        try{
        res( ax.get(API.AllProducts));    
        }catch(err){rej(err)}
})

module.exports={"allProducts":allProducts}


