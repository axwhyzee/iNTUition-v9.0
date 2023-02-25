import React, { useState, useEffect } from "react";
import { Checkbox, FormControlLabel, FormGroup, Link, Paper, Typography } from '@mui/material';
import Addtask from '../Addtask/Addtask';
import Addmember from '../Addmember/Addmember';
import './mainpage.css';
import Addmeeting from "../Addmeeting/Addmeeting";
import CollatedCalendar from "../CollatedCalendar/CollatedCalendar";
import ClearIcon from '@mui/icons-material/Clear';

function Mainpage({ project }) {
    const [tasks, setTasks] = useState([]);
    const [members, setMembers] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [meetings, setMeetings] = useState([{ "title": "meeting 1", "date": new Date("2023-3-1"), "time": "9:00 PM", "link": "zoom.com", "pwd": "1234" }]);

    useEffect(() => {
        const newTasks = [];
        const newCompleted = [];
        if (!project) return;

        for (const task of project['project_tasks']) {
            if (task['completed']) newTasks.push(task['title']);
            else newCompleted.push(task['title']);

            setTasks(newTasks);
            setCompleted(newCompleted);
        }
    }, [project]);

    //retrieve from backend
    const deletetask = (e) => {
        const temp = [...tasks];
        const tempC = [...completed, e.target.name];
        console.log(temp.indexOf(e.target.value), "index");
        temp.splice(temp.indexOf(e.target.value), 1);
        setTasks(temp);
        setCompleted(tempC);
    }
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
                                        <FormControlLabel value={x} control={<Checkbox value={x} checked={false} name={x} onChange={deletetask} />} label={x} />
                                        {/* <div>
                                        <Typography fontSize={9}>Due: {x.date}</Typography>
                                        <Typography fontSize={9}>Assigned: {x.assigned}</Typography>
                                        </div> */}
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
                                
                                <Typography sx={{ textDecoration: "line-through" }}>{c}</Typography>
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
                                    <FormControlLabel value={c} control={<Checkbox value={c} checked={false} name={c} onChange={deleteMember} />} label={c} />
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
