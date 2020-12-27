import React from "react"
import { makeStyles, createStyles, Button, Theme } from "@material-ui/core"
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        buttons: {
            '& > *': {
                margin: theme.spacing(1),
            },
        }
    }),
);

export const CreateButtons = () => {
    const classes = useStyles();

    return (

        <div className={classes.buttons}>
            <Button
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<AddCircleIcon />}
            >

                Create Ubuntu
                    </Button>
            <Button
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<AddCircleIcon />}
            >
                Create Windows
                    </Button>
            <Button
                variant="outlined"
                color="secondary"
                size="large"
                startIcon={<AddCircleIcon />}
            >
                Create custom instance
                    </Button>
        </div>

    )
}
