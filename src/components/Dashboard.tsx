import React from "react"
import { Paper, Grid, Container, Typography, makeStyles, createStyles, Theme } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);

export const Dashboard = () => {
    const classes = useStyles();

    //todo add spacing

    return (
        <div className={classes.root} >
            <Container maxWidth='xl'>
                <Typography variant='h1'> Dashboard </Typography>
                <Typography variant='h3'> Limits </Typography>
                <Grid container spacing={6}>
                    <Grid sm={6} md={4} lg={3} >
                        <Paper className={classes.paper}>
                            <p>todo chart</p>
                            <Typography variant='h6'>Instances x/y</Typography>
                        </Paper>
                    </Grid>
                    <Grid sm={6} md={4} lg={3} >
                        <Paper className={classes.paper}>
                            <p>todo chart</p>
                            <Typography variant='h6'>Instances x/y</Typography>
                        </Paper>
                    </Grid>
                    <Grid sm={6} md={4} lg={3} >
                        <Paper className={classes.paper}>
                            <p>todo chart</p>
                            <Typography variant='h6'>Instances x/y</Typography>
                        </Paper>
                    </Grid>
                    <Grid sm={6} md={4} lg={3} >
                        <Paper className={classes.paper}>
                            <p>todo chart</p>
                            <Typography variant='h6'>Instances x/y</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
