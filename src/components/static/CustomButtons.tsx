import { IconButton } from "@material-ui/core"
import React, { useContext } from "react"
import { deleteInstance } from "../../api/InstanceApi"
import { Instance } from "../../models/Instance"
import DeleteIcon from '@material-ui/icons/Delete';
import { ConfirmationDialog } from "./Dialogs";
import { AuthContext } from "../../routes/AuthProvider";

type DeleteInstanceButtonProps = {
    instance: Instance;
    reloadData: () => void;
}

export const DeleteInstanceButton = (props: DeleteInstanceButtonProps) => {
    const [open, setOpen] = React.useState(false);
    const context = useContext(AuthContext);

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
                try {
                    await deleteInstance(props.instance);
                    await props.reloadData();
                } catch (err) {
                    if (err.response.status === 401) {
                        // todo check errors for not autenticated user
                        console.log("Session expired");
                        context?.logout();
                    }
                    else {
                        throw err;
                    }
                }
            }}
        />
        <IconButton aria-label="delete" onClick={handleClickOpen}>
            <DeleteIcon />
        </IconButton></>)
}