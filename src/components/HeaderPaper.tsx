import React from "react";
import { makeStyles, Theme, createStyles, Paper, Typography } from "@material-ui/core";

type Props = {
    title: string;
    children?: React.ReactNode;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            marginTop: 35,
        },
        paperHeader: {
            marginTop: -35,
            padding: theme.spacing(2),
            backgroundColor: theme.palette.info.main,
            color: theme.palette.primary.contrastText,
            borderRadius: 4,
        }
    }),
);

export const HeaderPaper = (props : Props) => {
    const styles = useStyles();

    return (
        <Paper className={styles.paper}>
            <div className={styles.paperHeader}>
                <Typography variant='h6'>{props.title}</Typography>
            </div>
            {props.children}
        </Paper>
    )
}