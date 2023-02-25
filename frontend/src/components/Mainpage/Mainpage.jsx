import React, { useState } from "react";
import { Checkbox, FormGroup, Link, Paper, Typography } from '@mui/material';
import Addtask from '../Addtask/Addtask';
import Addmember from '../Addmember/Addmember';
import './mainpage.css';
import Addmeeting from "../Addmeeting/Addmeeting";
import CollatedCalendar from "../CollatedCalendar/CollatedCalendar";
import ClearIcon from '@mui/icons-material/Clear';

const t = {};

function Mainpage() {
    const [tasks, setTasks] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [meetings, setMeetings] = useState([]);

    
    //retrieve from backend
    const deletetask = (e) => {
        const temp = [...tasks];
        const tempC = [...completed, e.target.name];
        console.log(temp.indexOf(e.target.value), "index");
        temp.splice(temp.indexOf(e.target.value), 1);
        setTasks(temp);
        setCompleted(tempC);
    }

    const deletemeeting = (e) => {
        const temp = [...meetings];
        temp.splice(temp.indexOf(e.target.value), 1);
        setMeetings(temp);
    }

    const addTask = (e) => {
        const f = new FormData(e.target);
        console.log(f.get("duedate"))
        const obj = {"desc": f.get("description"), "date":f.get("duedate"), "assigned":f.get("assignedmem")};
        t[f.get("description")] = obj;
        console.log("T", t);
        const temp = [...tasks, f.get("description")];
        setTasks(temp);
    }

    const addMeeting = (e) => {
        const f = new FormData(e.target);
        const obj = {"title": f.get("title"), "date":new Date(f.get("date")), "time":f.get("time"), "link":f.get("link"), "pwd":f.get("pwd")};
        const temp = [...meetings, obj];
        setMeetings(temp);

        console.log(fetch("https://intuition.onrender.com/meetingTime/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: {
                'title': obj.title,
                'date': obj.date,
                "time": obj.time
            },
        }));
    }

    return (
        <div className='main-wrapper'>
            <h1 className='project-title'>Project Jiraji</h1>
            <p className='project-desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed bibendum turpis quis iaculis condimentum. Vestibulum euismod, ex vitae convallis porta, odio magna venenatis mauris, eget pellentesque velit ante eu erat. Praesent ac tincidunt nunc. Donec enim lectus, malesuada porta imperdiet ultrices, mollis in ipsum. Duis euismod, sapien quis tincidunt consectetur, metus lectus placerat massa, a malesuada nisi massa vel quam. Integer euismod ut lectus eu bibendum. Duis nec lobortis magna. Phasellus augue metus, maximus vitae malesuada sit amet, sagittis sit amet lectus. Duis venenatis bibendum risus. Phasellus fringilla erat id ipsum scelerisque hendrerit. Vestibulum ac mi vel nisi viverra finibus quis sed magna.</p>
            <div className='btn-wrapper'>
                <Addtask addTask={addTask}/>
                <Addmember />
                <Addmeeting addMeeting={addMeeting}/>
            </div>
            <div className='kanban-hr'></div>
            <Paper className="single-board-meeting" elevation={2}>
                <div className="board-title">Upcoming meetings</div>
                <div className="board-content">
                    <FormGroup row={false}>
                        {meetings.map(x => {
                            const now = new Date();
                            console.log(x.date.getDate())
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
                                console.log(t[`${x}`])
                                return (
                                    <div>
                                        <div style={{display:"flex", flexDirection:"row"}}>
                                            <Checkbox value={x} checked={false} name={x} onChange={deletetask} />
                                            <Typography sx={{paddingTop:0.5}} variant="h5">{x}</Typography>
                                        </div>
                                        <div>
                                        <Typography fontSize={11}>Due: {t[`${x}`]["date"]}</Typography>
                                        <Typography fontSize={11}>Assigned: {t[`${x}`]["assigned"]}</Typography>
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
            </div>
        </div>
    )
}

export default Mainpage;
