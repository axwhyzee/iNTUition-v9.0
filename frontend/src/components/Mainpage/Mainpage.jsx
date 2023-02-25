import React, { useState } from "react";
import { Checkbox, FormControlLabel, FormGroup, Paper, Typography, Box} from '@mui/material';
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";



function Mainpage() {
    const [tasks, setTasks] = useState(["task 1", "task 2", "task 3"]);
    const [completed, setCompleted] = useState([]);

    //retrieve from backend

    const deletetask = (e) => {
        const temp = [...tasks];
        temp.splice(temp.indexOf(e.target.value),1);
        setTasks(temp);
        const tempC = [...completed, e.target.value]
        setCompleted(tempC)
    }

    return (
        <div>
            <Navbar/>
            <Sidebar/>
            <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center", gap:3}}>
                <Paper elevation="2" sx={{bgcolor:"#D8C3A5"}}>
                    <Typography variant="h3">To-do</Typography>
                    <FormGroup row={false}>
                        {tasks.map(x => {
                            return (
                                <FormControlLabel value={x} control={<Checkbox value={x} checked={false} name={x} onChange={deletetask}/>} label={x}/>
                            )
                        })}
                    </FormGroup>
                </Paper>
                <Paper elevation="2" sx={{bgcolor:"#D8C3A5"}}>
                    <Typography variant="h3">Completed</Typography>
                        {completed.map(x => {
                            return(
                                <Typography sx={{textDecoration:"line-through"}}>{x}</Typography>
                            )
                        })}
                </Paper>
            </Box>
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

