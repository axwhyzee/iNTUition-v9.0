import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormGroup, TextField } from '@mui/material';
import { useState } from 'react';

function Addmember() {
    const [modal, setModal] = useState(false)
    const openModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    }


    //send array of all the members
    const addMember = () => {
        //send member
    }


    return (
        <div>
            <Button sx={{ m: 1, bgcolor: "#E85A4F", ":hover":{bgcolor:"#e8a74f"} }} variant="contained" onClick={openModal}>Add member</Button>
            <Dialog open={modal} onClose={closeModal}>
                <form onSubmit={addMember} autoComplete="off" style={{ backgroundColor: "#EAE7DC" }}>
                    <DialogTitle>Add member</DialogTitle>
                    <DialogContent>
                        <FormGroup row={false} sx={{ "& .MuiTextField-root": { my: 0.5 } }}>
                            <TextField variant="outlined" id="Projectmem" name="projectmem" label='Member name' />
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

export default Addmember;