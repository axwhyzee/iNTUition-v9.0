import React, { useState, useEffect } from "react";
import { Checkbox, FormControlLabel, FormGroup, Link, Paper, Typography } from '@mui/material';
import Addtask from '../Addtask/Addtask';
import Addmember from '../Addmember/Addmember';
import './mainpage.css';
import Addmeeting from "../Addmeeting/Addmeeting";
import CollatedCalendar from "../CollatedCalendar/CollatedCalendar";
import ClearIcon from '@mui/icons-material/Clear';
import PersonIcon from '@mui/icons-material/Person';

const JIRAJI_BOT_KEY = process.env.JIRAJI_BOT_KEY;
function Mainpage({ project }) {
    const [tasks, setTasks] = useState([]);
    const [members, setMembers] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [meetings, setMeetings] = useState([]);
    
    useEffect(() => {
        const newTasks = [];
        const newCompleted = [];
        if (!project) return;

        for (const task of project['project_tasks']) {
            if (task['completed']) newTasks.push({"title": task["title"], "date":task["date"], "assigned":task["assigned"]});
            else newCompleted.push(task['title']);

            setTasks(newTasks);
            setCompleted(newCompleted);
        }
    }, [project]);

    //retrieve from backend
    const deletetask = (e) => {
        const temp = [...tasks];
        temp.splice(temp.indexOf(e.target.value), 1);
        setTasks(temp);
    }

    const completeTask = (e) => {
        console.log(e.target.name);
        const temp = [...completed, e.target.name];
        setCompleted(temp)
    };
    const deleteMember = (e) => {
        const temp = [...members];
        temp.splice(temp.indexOf(e.target.value), 1);
        setMembers(temp);
    }
    const deletemeeting = (e) => {
        const temp = [...meetings];
        temp.splice(temp.indexOf(e.target.value), 1);
        setMeetings(temp);
    }

    const addTask = (e) => {
        const f = new FormData(e.target);
        console.log(f.get("duedate"))
        const obj = {"title": f.get("description"), "date":f.get("duedate"), "assigned":f.get("assignedmem")};
        const temp = [...tasks, obj];
        setTasks(temp);
    }

    const addMeeting = (e) => {
        const f = new FormData(e.target);
        const obj = {"title": f.get("title"), "date":new Date(f.get("date")), "time":f.get("time"), "link":f.get("link"), "pwd":f.get("pwd")};
        const temp = [...meetings, obj];
        setMeetings(temp);
        console.log(obj);
        const sendMessage = (e) => {
            const chat_id = '-1001845261817';
            const message = `Meeting set!\nTitle of meeting: ${obj.title}\nMeeting Date: ${obj.date}\nMeeting time: ${obj.time}`;
            const url = `https://api.telegram.org/bot${JIRAJI_BOT_KEY}/sendMessage?chat_id=${chat_id}&text=${message}`;
            const xht = new XMLHttpRequest();
            xht.open("GET", url);
            xht.send();
        }
        sendMessage(e);
    }

    const addMember = (e) => {
        const f = new FormData(e.target)
        const temp = [...members,f.get('projectmem')]
        setMembers(temp);
    }
    return (
        <div className='main-wrapper'>
            <h1 className='project-title'>{project ? project['project_title'] : ''}</h1>
            <p className='project-desc'>{project ? project['project_desc'] : ''}</p>
            <div className='btn-wrapper'>
                <Addtask addTask={addTask}/>
                <Addmember addMember={addMember}/>
                <Addmeeting addMeeting={addMeeting}/>
            </div>
            <div className='kanban-hr'></div>
            <Paper className="single-board-meeting" elevation={2}>
                <div className="board-title">Upcoming meetings</div>
                <div className="board-content">
                    <FormGroup row={false}>
                        {meetings.map(x => {
                            const now = new Date();
                            if (x.date.getMonth() > now.getMonth() || (x.date.getMonth() === now.getMonth() && x.date.getDate() >= now.getDate())) {
                                return (
                                    <div>
                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                            <Checkbox icon={<ClearIcon/>} value={x} checked={false} name={x} onChange={deletemeeting} />
                                            <Typography variant="h4" >{x.title}</Typography>
                                        </div>
                                        <Typography variant="h5" >{x.time}</Typography>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "left" }}>
                                            <Link variant="h7" href={x.link}>Meeting link</Link>
                                            &nbsp;
                                            &nbsp;
                                            &nbsp;
                                            <Typography variant="h7">Password: {x.pwd}</Typography>
                                        </div>
                                    </div>
                                )
                            }
                            return null;
                        })}
                    </FormGroup>
                </div>
            </Paper>
            <div className='kanban-board'>
                <CollatedCalendar />
                <Paper className='single-board' elevation={2}>
                    <div className='board-title'>To-do</div>
                    <div className='board-content'>
                            {tasks.map(x => {
                                return (
                                    <div>
                                        <div style={{display:"flex", flexDirection:"row"}}>
                                            <Checkbox value={x} checked={false} name={x.title} onChange={(e) => {deletetask(e); completeTask(e);}} />
                                            <Typography sx={{paddingTop:0.5}} variant="h5">{x.title}</Typography>
                                        </div>
                                        <div>
                                        <Typography fontSize={11}>Due: {x.date}</Typography>
                                        <Typography fontSize={11}>Assigned: {x.assigned}</Typography>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </Paper>
                <Paper className='single-board' elevation={2}>
                    <div className='board-title'>Completed</div>
                    <div className='board-content'>
                        {completed.map(c => {
                            return (
                                
                                <Typography variant="h5" sx={{ textDecoration: "line-through" }}>{c}</Typography>
                            )
                        })}
                    </div>
                </Paper>
                <Paper className="single-board" elevation={2}>
                        <div className="board-title">Member List</div>
                        <div className='board-content'>
                        {members.map(c => {
                            return (
                                <div>
                                    <FormControlLabel value={c} control={<Checkbox icon={<PersonIcon/>} value={c} checked={false} name={c} onChange={deleteMember} />} label={c} />
                                </div>
                            )
                        })}
                    </div>
                </Paper>
            </div>
        </div>
    )
}

export default Mainpage;
