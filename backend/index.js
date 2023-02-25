import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import TelegramBot from 'node-telegram-bot-api';
import  jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import userModel from './mongodb/models/user.js';
import User from './mongodb/models/user.js';
// import userRouter from './routes/user.routes.js';
// import projectRouter from './routes/project.routes.js';
// import taskRouter from './routes/task.routes.js';

dotenv.config();
const token = process.env.JIRAJI_BOT_KEY;
const app = express();
app.use(cors())
app.use(express.json({limit:'50mb'}));

app.get('/',(req,res) =>{
    res.send({message:"hello world"});
})
// app.use("/login", userRouter);
// app.use("/signup", userRouter);
// app.use("/", projectRouter);
// app.use("/tasks", taskRouter);

app.post('/signup', async (req,res)=>{
    try{
        const {username,password, allProjects} = req.body;
        const newPassword = await bcrypt.hash(password,10);
        
        await User.create({
            username,
            password,
            allProjects // supposed to be anempty projects list
        })
        res.json({status:'OK'})
    }catch(error){
        res.json({status: 'error', error: error.message})
    }
})

app.post('/login', async (req,res)=>{
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return {
                status:'error',
                error:'Invalid Login'
            }
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
        if( isPasswordValid){
            const token = jwt.sign(
                {
                    username:user.username,           
                    projects:user.projects     
                }
            )
            return res.json({status:'OK ', user:token})
        }else{
            return res.json({status:'Error',user:false})
        }

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
