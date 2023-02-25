import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormGroup, TextField } from '@mui/material';
import { useState } from 'react';

function Addmeeting({addMeeting}) {
    const [modal, setModal] = useState(false)
    const openModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    }


    return (
        <div>
            <Button sx={{ m: 1, bgcolor: "#E85A7F", ":hover":{bgcolor: "#e87c5a"}}} variant="contained" onClick={openModal}>Add meeting</Button>
            <Dialog open={modal} onClose={closeModal}>
                <form onSubmit={(e) => {e.preventDefault(); addMeeting(e);}} autoComplete="off" style={{ backgroundColor: "#EAE7DC" }}>
                    <DialogTitle>Add meeeting</DialogTitle>
                    <DialogContent>
                        <FormGroup row={false} sx={{ "& .MuiTextField-root": { my: 0.5 } }}>
                            <TextField variant="outlined" id="Title" name="title" label='Meeting title' />
                            <TextField variant="outlined" id="Date" name="date" label="Meeting date" InputLabelProps={{
          shrink: true,
        }} type="date"/>
                            <TextField variant="outlined" id="Time" name="time" label="Meeting time" InputLabelProps={{
          shrink: true,
        }} type="time"/>
                            <TextField variant="outlined" id="Link" name="link" label="Meeting link" />
                            <TextField variant="outlined" id="Pwd" name="pwd" label="Meeting password" /> 
                        </FormGroup>
                    </DialogContent>
                    <DialogActions>
                        <Button type='submit' onClick={closeModal} variant="contained" sx={{ bgcolor: "#E98074" }}>Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}

export default Addmeeting;