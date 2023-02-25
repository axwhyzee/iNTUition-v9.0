import React, { useState } from "react";
import { Checkbox, FormControlLabel, FormGroup, List, ListItemButton, ListItemText, Collapse, ListSubheader} from '@mui/material';


function Mainpage() {
    const [tasks, setTasks] = useState(["task 1", "task 2", "task 3"]);
    const [open, setOpen] = useState(false);

    //retrieve from backend

    const deletetask = (e) => {
        const temp = [...tasks];
        temp.splice(temp.indexOf(e.target.value),1);
        setTasks(temp);
    }

    const checks = tasks.map(x => {
        return (
            <FormControlLabel value={x} control={<Checkbox value={x} checked={false} name={x} onChange={deletetask}/>} label={x} labelPlacement='right'/>
        )
       })

    const handleClick = () => {
        setOpen(!open);
    }

    return (
        <List sx={{bgcolor: 'background.paper' }}
        component="nav"
        subheader={
          <ListSubheader component="div" id="projects-list-subheader">
            Projects
          </ListSubheader>
        }>
            <ListItemButton onClick={handleClick}>
                {/* Make dynamic */}
                <ListItemText primary="BC2407"/>
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <FormGroup row={false}>
                    {checks}
                </FormGroup>
            </Collapse>
            
        </List>
    )
}

export default Mainpage;

