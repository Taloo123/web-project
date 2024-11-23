const express = require ('express');
const app = express();
 app.get("/",function(req,res){
    res.send("i am a mof starboy")
 })
 
 app.get("/profile", function(req,res){
    res.send("i am a mf starboy2")

 })

 app.listen(4000);