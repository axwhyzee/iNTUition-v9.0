import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import TelegramBot from 'node-telegram-bot-api';

dotenv.config();
const token = process.env.JIRAJI_BOT_KEY;
const app = express();
app.use(cors())
app.use(express.json({limit:'50mb'}));

app.get('/',(req,res) =>{
    res.send({message:"hello world"});
})

const startServer = async() =>{
    try{    
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () =>{
            console.log('Server started on port http://localhost:8080');
        })
    }
    catch(error){
        console.log(error);
    }
}

// // Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});


// replace the value below with the Telegram token you receive from @BotFather
if (process.env.NODE_ENV === 'production') {
    const bot = new TelegramBot(token);
    bot.setWebHook(process.env.HEROKU_URL + bot.token);
 } else {
    // const bot = new TelegramBot(token, {polling: true});
 }



// Listen for any kind of message. There are different kinds of
// messages.

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    
    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, 'Jiraji-Bot connected.');
});


bot.onText(/\/connect/, (msg, match) => {
    const chatId = msg.chat.id;
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
 
    console.log(chatId)

});

const sendReminder = (chatId, message) =>{

}

startServer();
