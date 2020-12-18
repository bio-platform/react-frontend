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
        paperHeader: {
            marginTop: -35,
            padding: theme.spacing(2),
            backgroundColor: theme.palette.info.main,
            color:  theme.palette.primary.contrastText,
            borderRadius: 4,
        }
    }),
);

export const Dashboard = () => {
    const styles = useStyles();

    //todo add spacing

    return (
        <div className={styles.root} >
            <Container maxWidth='xl'>
                <Typography variant='h1'> Dashboard </Typography>
                <Typography variant='h3'> Limits </Typography>
                <Grid container spacing={5}>
                    <Grid sm={6} md={4} lg={3}>
                        <Paper className={styles.paper}>
                            <div className={styles.paperHeader}>
                                <p >todo chart</p>
                            </div>
                            <Typography variant='h6'>Instances x/y</Typography>
                        </Paper>
                    </Grid>
                    <Grid sm={6} md={4} lg={3} >
                        <Paper className={styles.paper}>
                            <p>todo chart</p>
                            <Typography variant='h6'>Instances x/y</Typography>
                        </Paper>
                    </Grid>
                    <Grid sm={6} md={4} lg={3} >
                        <Paper className={styles.paper}>
                            <p>todo chart</p>
                            <Typography variant='h6'>Instances x/y</Typography>
                        </Paper>
                    </Grid>
                    <Grid sm={6} md={4} lg={3} >
                        <Paper className={styles.paper}>
                            <p>todo chart</p>
                            <Typography variant='h6'>Instances x/y</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
