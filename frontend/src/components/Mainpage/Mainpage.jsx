import React, { useState } from "react";
import { Checkbox, FormControlLabel, FormGroup, Paper, Typography } from '@mui/material';
import Addtask from '../Addtask/Addtask';
import Addmember from '../Addmember/Addmember';
import './mainpage.css';


function Mainpage() {
    const [tasks, setTasks] = useState(["task 1", "task 2", "task 3"]);
    const [completed, setCompleted] = useState([]);

    //retrieve from backend
    const deletetask = (e) => {
        const temp = [...tasks];
        temp.splice(temp.indexOf(e.target.value), 1);
        setTasks(temp);
        const tempC = [...completed, e.target.value]
        setCompleted(tempC)
    }

    return (
        <div className='main-wrapper'>
            <h1 className='project-title'>Project Jiraji</h1>
            <p className='project-desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed bibendum turpis quis iaculis condimentum. Vestibulum euismod, ex vitae convallis porta, odio magna venenatis mauris, eget pellentesque velit ante eu erat. Praesent ac tincidunt nunc. Donec enim lectus, malesuada porta imperdiet ultrices, mollis in ipsum. Duis euismod, sapien quis tincidunt consectetur, metus lectus placerat massa, a malesuada nisi massa vel quam. Integer euismod ut lectus eu bibendum. Duis nec lobortis magna. Phasellus augue metus, maximus vitae malesuada sit amet, sagittis sit amet lectus. Duis venenatis bibendum risus. Phasellus fringilla erat id ipsum scelerisque hendrerit. Vestibulum ac mi vel nisi viverra finibus quis sed magna.</p>
            <div className='btn-wrapper'>
                <Addtask />
                <Addmember />
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
            </div>
        </div>
    )
}
// {/* <List sx={{bgcolor: 'background.paper' }}
//             component="nav"
//             subheader={
//             <ListSubheader component="div" id="projects-list-subheader">
//                 Projects
//             </ListSubheader>
//             }>
//                 <ListItemButton onClick={handleClick}>
//                     {/* Make dynamic */}
//                     <ListItemText primary="BC2407"/>
//                 </ListItemButton>
//                 <Collapse in={open} timeout="auto" unmountOnExit>
//                     <FormGroup row={false}>
//                         {checks}
//                     </FormGroup>
//                 </Collapse>
//             </List> */}
export default Mainpage;

