import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core"
import React from "react"

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