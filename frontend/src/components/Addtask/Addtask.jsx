import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormGroup, TextField } from '@mui/material';
import { useState } from 'react';

function Addtask () {
    const [modal, setModal] = useState(false)
    const openModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    }


    const addTask = () => {
        //send task
    }


    return (
        <div>
            <Button sx={{m:1, bgcolor:"#E98074"}} variant="contained" onClick={openModal}>Add tasks</Button>
            <Dialog open={modal} onClose={closeModal}>
                <form onSubmit={addTask} autoComplete="off" style={{backgroundColor:"#EAE7DC"}}>
                    <DialogTitle>Add tasks</DialogTitle>
                        <DialogContent>
                            <FormGroup row={false} sx={{"& .MuiTextField-root":{my:0.5}}}>
                                <TextField variant="outlined" id="Description" name="description" label='Description'/>
                                <TextField variant="outlined" id="Due date" name="duedate" label="Due Date" InputLabelProps={{
          shrink: true,
        }} type="date"/>
                                <TextField variant="outlined" id="Assignedmem" name="assignedmem" label='Assigned member'/>
                            </FormGroup>
                    </DialogContent>
                    <DialogActions>
                        <Button type='submit' onClick={closeModal} variant="contained" sx={{bgcolor:"#E98074"}}>Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}

export default Addtask;