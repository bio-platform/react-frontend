import React from "react"
import { Paper, Grid, Container, Typography, makeStyles, createStyles, Theme } from "@material-ui/core"
import { VictoryPie } from "victory";
import { useTheme } from '@material-ui/core/styles';
import { HeaderPaper } from "./HeaderPaper";

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
            color: theme.palette.primary.contrastText,
            borderRadius: 4,
        }
    }),
);

export const Dashboard = () => {
    const styles = useStyles();
    const theme = useTheme();

    //todo add spacing

    return (
        <div className={styles.root} >
            <Container maxWidth='xl'>
                <Typography variant='h1'> Dashboard </Typography>
                <Typography variant='h3'> Limits </Typography>
                <Grid container spacing={3}>
                    <Grid sm={6} md={4} lg={3} item={true}>
                        <HeaderPaper title="Instances x/y">
                            <VictoryPie
                                    colorScale={[theme.palette.error.main, theme.palette.success.main]}
                                    data={[{ x: "Used", y: 60 }, { x: "Available", y: 40 }]} 
                                    style={{ labels: { fontSize: 20, fill: "white" } }} 
                                    labelRadius={50} />
                        </HeaderPaper>
                    </Grid>
                    <Grid sm={6} md={4} lg={3} item={true}>
                        <Paper className={styles.paper}>
                            <p>todo chart</p>
                            <Typography variant='h6'>Instances x/y</Typography>
                        </Paper>
                    </Grid>
                    <Grid sm={6} md={4} lg={3} item={true}>
                        <Paper className={styles.paper}>
                            <p>todo chart</p>
                            <Typography variant='h6'>Instances x/y</Typography>
                        </Paper>
                    </Grid>
                    <Grid sm={6} md={4} lg={3} item={true}>
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
