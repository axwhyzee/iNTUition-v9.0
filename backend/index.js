import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import TelegramBot from 'node-telegram-bot-api';
import User from './mongodb/models/user.js';
import Project from './mongodb/models/project.js';
import Task from './mongodb/models/task.js';
import Meeting from './mongodb/models/meeting.js';
import fetch from 'node-fetch';

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
        const { username, password, allProjects, schedule } = req.body;
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
        const {userId ,projectMembers, projectId, projects} = req.body;

        await Project.findByIdAndUpdate({_id: projectId}, {projectMembers: projectMembers});
        await User.findByIdAndUpdate({_id:userId}, {allProjects: projects});

        res.json({ status: "OK" })
    } catch (error) {
        res.json({ status: "error", error: error.message })
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
        console.log('test');
        const {userId, schedule} = req.body;
        // const newPassword = await bcrypt.hash(password, 10);
        console.log(schedule);
        await User.findByIdAndUpdate({_id: userId}, {schedule: schedule});
        res.json({ status: 'OK' })
        res.modifiedCount;
        res.upsertedCount;
    } catch (error) {
        res.json({ status: 'error', error: error.message })
    }
})

// UPDATE REQUESTS PATCH REQUEST
app.patch('/updateMeetings', async (req, res) => {
    try {
        const {meetingId, meetingStartTime} = req.body;
        // const newPassword = await bcrypt.hash(password, 10);
        console.log(meetingStartTime);
        await User.findByIdAndUpdate({_id: meetingId}, {meetingStartTime: meetingStartTime});
        res.json({ status: 'OK' })
        res.modifiedCount;
        res.upsertedCount;
    } catch (error) {
        res.json({ status: 'error', error: error.message })
    }
})


// GET SCHEDULE
app.get('/getSchedule/', async (req, res) => {
    console.log('test');
    try {
        const userId = req.query.id;
        console.log(userId);
        // console.log(typeof(userId));
        const userSchedule = await User.findById({ _id: userId }, 'schedule');
        res.json({ status: 'OK', schedule: userSchedule });
    }
    catch (error) {
        res.json({ status: 'error', error: error.message })
    }
})

// GET LIST OF PROJECTS
app.get('/getProjects/', async (req, res) => {
    try {
        const userId = req.query.id;
        // const newPassword = await bcrypt.hash(password, 10);
        const allProjects = await User.findById({ _id: userId }, 'allProjects')
        res.json({ status: 'OK', allProjects: allProjects });
    } catch (error) {
        res.json({ status: 'error', error: error.message })
    }
})

// GET LIST OF TASKS
app.get('/getTasks/', async(req,res) =>{
    try {
        const projectId = req.query.id;
        // const newPassword = await bcrypt.hash(password, 10);
        const allTasks = await Project.findById({_id: projectId}, 'allTasks')
        res.json({status:'OK', allTasks: allTasks});
    } catch (error) {
        res.json({ status: 'error', error: error.message })
    }
})

// GET LIST OF MEETINGS
app.get('/getMeetings/', async(req,res) =>{
    try {
        const projectId= req.query.id;
        // const newPassword = await bcrypt.hash(password, 10);
        const allMeetings = await Project.findById({_id: projectId}, 'projectMeetings')
        res.json({status:'OK', allMeetings: allMeetings});
    } catch (error) {
        res.json({ status: 'error', error: error.message })
    }
})

// DELETE PROJECT
app.delete('/deleteProject/', async(req,res) =>{
    try {
        const {projectId} = req.body;
        // const newPassword = await bcrypt.hash(password, 10);
        // const allProjects = await User.findById.select({allProjects:1, _id:0});
        // console.log(allProjects);
        // const filtered = allProjects.filter(function(project,index,arr){
        //     return project._id != projectId;
        // })
        // console.log(filtered);
        // // await User.findOneAndDelete({_id:}
        await Project.deleteOne({_id: projectId})
        res.json({status:'OK'});
    } catch (error) {
        res.json({ status: 'error', error: error.message })
    }
})

// DELETE MEETINGS
app.delete('/deleteMeeting/', async(req,res) =>{
    try {
        const {meetingId} = req.body;
        // const newPassword = await bcrypt.hash(password, 10);
        // const allProjects = await User.findById.select({allProjects:1, _id:0});
        // console.log(allProjects);
        // const filtered = allProjects.filter(function(project,index,arr){
        //     return project._id != projectId;
        // })
        // console.log(filtered);
        // // await User.findOneAndDelete({_id:}
        await Meeting.deleteOne({_id: meetingId})
        res.json({status:'OK'});
    } catch (error) {
        res.json({ status: 'error', error: error.message })
    }
})

// DELETE TASKS
app.delete('/deleteTask/', async(req,res) =>{
    try {
        const {taskId} = req.body;
        // const newPassword = await bcrypt.hash(password, 10);
        // const allProjects = await User.findById.select({allProjects:1, _id:0});
        // console.log(allProjects);
        // const filtered = allProjects.filter(function(project,index,arr){
        //     return project._id != projectId;
        // })
        // console.log(filtered);
        // // await User.findOneAndDelete({_id:}
        await Task.deleteOne({_id: taskId})
        res.json({status:'OK'});
    } catch (error) {
        res.json({ status: 'error', error: error.message })
    }
})



const startServer = async () => {
    try {
        connectDB('mongodb+srv://wchong036:ninabedog1@cluster0.9nhomnm.mongodb.net/?retryWrites=true&w=majority');
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


// // Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });


// // replace the value below with the Telegram token you receive from @BotFather
// if (process.env.NODE_ENV === 'production') {
//     const bot = new TelegramBot(token);
//     bot.setWebHook(process.env.HEROKU_URL + bot.token);
// } else {
//     // const bot = new TelegramBot(token, {polling: true});
// }



// // Listen for any kind of message. There are different kinds of
// // messages.

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    // send a message to the chat acknowledging receipt of their message
    // bot.sendMessage(chatId, 'Jiraji-Bot connected.');
});


bot.onText(/\/connect/, (msg, match) => {
    const chatId = msg.chat.id;
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    console.log(chatId);
    bot.sendMessage(chatId, 'Jiraji-Bot connected.');
});

bot.onText(/when is the task due/, (msg, match) => {
    const chatId = msg.chat.id;
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    bot.sendMessage(chatId, `Your task: BC2407 Analytics Proposal is due tomorrow. Please remember to finish it!`);
});

bot.onText(/what are my tasks/, (msg, match) => {
    const chatId = msg.chat.id;
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    bot.sendMessage(chatId, 'Research on CC0006 Topics\nWrite two problems within the proposal\nWrite a solution within the proposal');
});

bot.onText(/meeting/, (msg, match) => {
    const chatId = msg.chat.id;
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    bot.sendMessage(chatId, "Reminder: ML0004 Meeting tomorrow!");
});

// fetch data
const response = await fetch("https://intuition.onrender.com/meetingTime");
console.log(response);

startServer();
