import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from "@material-ui/core";
import React, { useState } from "react";

export const NewSSHKeyPopup = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (<div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Upload new SSH Key
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Upload new SSH Key</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We will send updates
                    occasionally.
            </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="ssh-key"
                    label="SSH Key"
                    type="text"
                    fullWidth
                    onChange={() => {
                        // todo
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => {
                    // todo
                }} color="primary">
                    Upload
                </Button>
            </DialogActions>
        </Dialog>
    </div>);
}