import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, IconButton } from "@material-ui/core"
import InfoIcon from '@material-ui/icons/Info';
import React, { useState } from "react";
import { Instructions } from '../../models/Instructions';

type ConfirmationDialogProps = {
    open: boolean;
    handleClose: () => void;
    title: string;
    description: string;
    handleConfirm: () => void;
}

export const ConfirmationDialog = (props: ConfirmationDialogProps) => {
    return (<Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {props.description}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => { props.handleClose(); }} color="primary">
                Cancel
          </Button>
            <Button onClick={() => { props.handleConfirm(); props.handleClose(); }} color="primary" autoFocus>
                Confirm
          </Button>
        </DialogActions>
    </Dialog>)
}


type InfoDialogProps = {
    instruction : Instructions | undefined;
}


export const InfoDialog = ({instruction} : InfoDialogProps) => {
    const [open, setOpen] = useState(false);


    return (<>
        <IconButton aria-label="info" onClick={() => {
            setOpen(true);
        }}>
            <InfoIcon />
        </IconButton>
        <Dialog
        open={open}
        scroll={'paper'}
        onClose={() => {setOpen(false)}}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Instructions</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={-1}
          >
           {instruction?.instructions}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setOpen(false)}} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

    </>);
}