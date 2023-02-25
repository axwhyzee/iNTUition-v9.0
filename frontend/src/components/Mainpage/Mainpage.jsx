import React, { useState } from "react";
import { Checkbox, FormControlLabel, FormGroup, List, ListItemButton, ListItemText, Collapse, ListSubheader, Paper, Typography, Box} from '@mui/material';



function Mainpage() {
    const [tasks, setTasks] = useState(["task 1", "task 2", "task 3"]);
    const [completed, setCompleted] = useState([]);
    const [open, setOpen] = useState(false);

    //retrieve from backend

    const deletetask = (e) => {
        const temp = [...tasks];
        temp.splice(temp.indexOf(e.target.value),1);
        setTasks(temp);
        const tempC = [...completed, e.target.value]
        setCompleted(tempC)
    }

    const handleClick = () => {
        setOpen(!open);
    }

    return (
        <div>
            <Box sx={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <Paper elevation="2">
                    <Typography variant="h3">To-do</Typography>
                    <FormGroup row={false}>
                        {tasks.map(x => {
                            return (
                                <FormControlLabel value={x} control={<Checkbox value={x} checked={false} name={x} onChange={deletetask}/>} label={x} labelPlacement='right'/>
                            )
                        })}
                    </FormGroup>
                </Paper>
                <Paper elevation="2">
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

