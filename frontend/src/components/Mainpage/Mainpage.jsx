import React, { useState } from "react";
import { Checkbox, FormControlLabel, FormGroup, Link, Paper, Typography } from '@mui/material';
import Addtask from '../Addtask/Addtask';
import Addmember from '../Addmember/Addmember';
import './mainpage.css';
import Addmeeting from "../Addmeeting/Addmeeting";


function Mainpage() {
    const [tasks, setTasks] = useState(["task 1", "task 2", "task 3"]);
    const [completed, setCompleted] = useState([]);
    const [meetings, setMeetings] = useState([{ "title": "meeting 1", "date": new Date("2023-3-1"), "time": "9:00 PM", "link": "zoom.com", "pwd": "1234" }]);

    //retrieve from backend
    const deletetask = (e) => {
        const temp = [...tasks];
        temp.splice(temp.indexOf(e.target.value), 1);
        setTasks(temp);
        const tempC = [...completed, e.target.value]
        setCompleted(tempC)
    }

    const deletemeeting = (e) => {
        const temp = [...meetings];
        temp.splice(temp.indexOf(e.target.value), 1);
        setMeetings(temp);
    }


    return (
        <div className='main-wrapper'>
            <h1 className='project-title'>Project Jiraji</h1>
            <p className='project-desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed bibendum turpis quis iaculis condimentum. Vestibulum euismod, ex vitae convallis porta, odio magna venenatis mauris, eget pellentesque velit ante eu erat. Praesent ac tincidunt nunc. Donec enim lectus, malesuada porta imperdiet ultrices, mollis in ipsum. Duis euismod, sapien quis tincidunt consectetur, metus lectus placerat massa, a malesuada nisi massa vel quam. Integer euismod ut lectus eu bibendum. Duis nec lobortis magna. Phasellus augue metus, maximus vitae malesuada sit amet, sagittis sit amet lectus. Duis venenatis bibendum risus. Phasellus fringilla erat id ipsum scelerisque hendrerit. Vestibulum ac mi vel nisi viverra finibus quis sed magna.</p>
            <div className='btn-wrapper'>
                <Addtask />
                <Addmember />
                <Addmeeting />
            </div>
            <div className='kanban-board'>
                <Paper className='single-board' elevation={2}>
                    <div className='board-title'>To-do</div>
                    <div className='board-content'>
                        <FormGroup row={false}>
                            {tasks.map(x => {
                                return (
                                    <FormControlLabel value={x} control={<Checkbox value={x} checked={false} name={x} onChange={deletetask} />} label={x} />
                                )
                            })}
                        </FormGroup>
                    </div>
                </Paper>
                <Paper className='single-board' elevation={2}>
                    <div className='board-title'>Completed</div>
                    <div className='board-content'>
                        {completed.map(x => {
                            return (
                                <Typography sx={{ textDecoration: "line-through" }}>{x}</Typography>
                            )
                        })}
                    </div>
                </Paper>
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
                                                <Checkbox value={x} checked={false} name={x} onChange={deletemeeting} />
                                                <Typography variant="h4" >{x.title}</Typography>
                                            </div>
                                            <Typography variant="h5" >{x.time}</Typography>
                                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                                <Link variant="h7" href={x.link}>Meeting link</Link>
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
            </div>
        </div>
    )
}

export default Mainpage;
