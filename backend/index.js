import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import TelegramBot from 'node-telegram-bot-api';
import connectDB from './mongodb/connect.js';

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json({limit:'50mb'}));

app.get('/',(req,res) =>{
    res.send({message:"hello world"});
})
// console.log(process.env.JIRAJI_BOT_KEY);

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.JIRAJI_BOT_KEY;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
  
    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, 'Received your message');
});

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
startServer();
