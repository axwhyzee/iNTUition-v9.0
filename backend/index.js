import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import TelegramBot from 'node-telegram-bot-api';
import User from './mongodb/models/user.js';
import Project from './mongodb/models/project.js';
import Task from './mongodb/models/task.js';
import Meeting from './mongodb/models/meeting.js';

dotenv.config();
const token = process.env.JIRAJI_BOT_KEY;
const app = express();
app.use(cors())
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
    res.send({ message: "hello world" });
})
// app.use("/login", userRouter);
// app.use("/signup", userRouter);
// app.use("/", projectRouter);
// app.use("/tasks", taskRouter);

// SIGN UP POST REQUEST
app.post('/signup', async (req, res) => {
    try {
        const { username, password, allProjects,schedule } = req.body;
        // const newPassword = await bcrypt.hash(password, 10);

        await User.create({
            username,
            password,
            allProjects, // supposed to be anempty projects list
            schedule
        })
        res.json({ status: 'OK' })
    } catch (error) {
        res.json({ status: 'error', error: error.message })
    }
})

// LOGIN POST REQUEST
app.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    console.log(user);
    if (!user) {
        return {
            status: 'error',
            error: 'Invalid Login'
        }
    }
    console.log(user);
    const isPasswordValid = req.body.password === user.password;
    if (isPasswordValid) {
        // const token = jwt.sign(
        //     {
        //         username: user.username,
        //         projects: user.projects
        //     }
        // )
        return res.json({ status: 'OK ', user: user })
    } else {
        return res.json({ status: 'Error', user: false })
    }

})

// CREATE PROJECTS POST REQUEST
app.post('/createProject', async (req, res) => {
    try {
        const { projectName, projectDescription, allTasks, projectMembers, projectMeetings } = req.body;
        // const newPassword = await bcrypt.hash(password, 10);
        const telegramChatId = '-1234567';
        await Project.create({
            projectName,
            projectDescription,
            telegramChatId,
            allTasks, // supposed to be anempty projects list
            projectMembers,
            projectMeetings
        })
        res.json({ status: 'OK' })
    } catch (error) {
        res.json({ status: 'error', error: error.message })
    }
})

// CREATE TASKS POST REQUEST
app.post('/createTask', async (req, res) => {
    try {
        const { project, description, dueDate, allocatedUser } = req.body;
        // const newPassword = await bcrypt.hash(password, 10);
        
        const telegramChatId = project.telegramChatId;
        await Task.create({
            project,
            telegramChatId,
            description, // supposed to be anempty projects list
            dueDate,
            allocatedUser
        })
        res.json({ status: 'OK' })
    } catch (error) {
        res.json({ status: 'error', error: error.message })
    }
})

// CREATE MEETINGS POST REQUEST
app.post('/createMeetings', async (req, res) => {
    try {
        const { meetingTitle, meetingStartTime, meetingLink, meetingPassword, meetingDate } = req.body;
        // const newPassword = await bcrypt.hash(password, 10);

        await Meeting.create({
            meetingTitle,
            meetingStartTime,
            meetingLink, // supposed to be anempty projects list
            meetingPassword,
            meetingDate
        })
        res.json({ status: 'OK' })
    } catch (error) {
        res.json({ status: 'error', error: error.message })
    }
})

//ADD MEMBERS TO PROJECT PATCH REQUEST
//NEED TESTING
app.patch("/updateMembers", async (req, res) => {
    try {
        const {memberId ,members, projectId, projects} = req.body;

        await Project.updateOne({_id: projectId}, {projectMembers: members});
        await User.updateOne({_id:memberId}, {allProjects: projects});

        res.json({status: "OK"})
    } catch (error) {
        res.json({status:"error", error: error.message})
    }
})

//ADD MEETINGS TO PROJECT PATCH REQUEST
//NEED TESTING
// app.patch("/updateMeetings", async (req, res) => {
//     try {
//         const {}
//     }
// })

// UPDATE REQUESTS PATCH REQUEST
app.patch('/updateSchedule', async (req, res) => {
    try {
        const {userId, schedule} = req.body;
        // const newPassword = await bcrypt.hash(password, 10);

        await User.updateOne({_id: userId}, {schedule: schedule})
        res.json({ status: 'OK' })
        res.modifiedCount;
        res.upsertedCount;
    } catch (error) {
        res.json({ status: 'error', error: error.message })
    }
})

// GET SCHEDULE
app.get('/getSchedule/', async(req,res) =>{
    console.log('test');
    try{
        const userId = req.query.id;
        console.log(userId);
        // console.log(typeof(userId));
        const userSchedule = await User.findById({_id:userId}, 'schedule');
        res.json({status:'OK', schedule:userSchedule});
    }
    catch(error){   
        res.json({status:'error', error:error.message})
    }
})

// GET LIST OF PROJECTS
app.get('/getProjects/', async(req,res) =>{
    try {
        const {userId} = req.query.id;
        // const newPassword = await bcrypt.hash(password, 10);
        const allProjects = await User.findById({_id: userId}, 'allProjects')
        res.json({status:'OK', allProjects: allProjects});
    } catch (error) {
        res.json({ status: 'error', error: error.message })
    }
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => {
            console.log('Server started on port http://localhost:8080');
        })
    }
    catch (error) {
        console.log(error);
    }
}

// -----------------------------------------------------------
// //                TELEGRAM BOT 
// // -----------------------------------------------------------

// // // Create a bot that uses 'polling' to fetch new updates
// const bot = new TelegramBot(token, { polling: true });


// // replace the value below with the Telegram token you receive from @BotFather
// if (process.env.NODE_ENV === 'production') {
//     const bot = new TelegramBot(token);
//     bot.setWebHook(process.env.HEROKU_URL + bot.token);
// } else {
//     // const bot = new TelegramBot(token, {polling: true});
// }



// // Listen for any kind of message. There are different kinds of
// // messages.

// bot.on('message', (msg) => {
//     const chatId = msg.chat.id;

//     // send a message to the chat acknowledging receipt of their message
//     bot.sendMessage(chatId, 'Jiraji-Bot connected.');
// });


// bot.onText(/\/connect/, (msg, match) => {
//     const chatId = msg.chat.id;
//     // 'msg' is the received Message from Telegram
//     // 'match' is the result of executing the regexp above on the text content
//     // of the message

//     console.log(chatId)

// });

// const sendReminder = (chatId, message) => {

// }

startServer();
