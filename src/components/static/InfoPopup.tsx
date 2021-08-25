import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@material-ui/core";
import InfoIcon from '@material-ui/icons/Info';
import React, { useState } from "react";
import { Instructions } from '../../models/Instructions';

type InfoPopupProps = {
    instruction : Instructions | undefined;
}


export const InfoPopup = ({instruction} : InfoPopupProps) => {
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