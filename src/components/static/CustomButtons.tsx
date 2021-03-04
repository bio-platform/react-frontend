import { IconButton } from "@material-ui/core"
import React from "react"
import { deleteInstance } from "../../api/InstanceApi"
import { Instance } from "../../models/Instance"
import DeleteIcon from '@material-ui/icons/Delete';
import { ConfirmationDialog } from "./Dialogs";

type DeleteInstanceButtonProps = {
    instance: Instance;

}

export const DeleteInstanceButton = (props: DeleteInstanceButtonProps) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (<>
        <ConfirmationDialog
            title={`Delete Instance ${props.instance.name}`}
            description={'Are you sure? All data and proceses on this instance will be deleted.'} 
            handleClose={handleClose}
            open={open}
            handleConfirm={async () => {
                await deleteInstance(props.instance)
            }}
            />
        <IconButton aria-label="delete" onClick={handleClickOpen}>
            <DeleteIcon />
        </IconButton></>)
}