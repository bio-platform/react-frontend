import React from "react"
import { Grid, Container, Typography, makeStyles, createStyles, Theme } from "@material-ui/core"
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
                <Typography variant='h2'> Create new instance </Typography>
                <Typography variant='h2'> Overview </Typography>
                <Typography variant='h3'> Limits </Typography>
                <Grid container spacing={3}>
                    <Grid sm={6} md={4} lg={3} item={true}>
                        <HeaderPaper title="Floating IPs x/y">
                            <VictoryPie
                                colorScale={[theme.palette.error.main, theme.palette.success.main]}
                                data={[{ x: "Used", y: 60 }, { x: "Available", y: 40 }]}
                                style={{ labels: { fontSize: 20, fill: "white" } }}
                                labelRadius={50} />
                        </HeaderPaper>
                    </Grid>
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
                        <HeaderPaper title="Cores x/y">
                            <VictoryPie
                                colorScale={[theme.palette.error.main, theme.palette.success.main]}
                                data={[{ x: "Used", y: 60 }, { x: "Available", y: 40 }]}
                                style={{ labels: { fontSize: 20, fill: "white" } }}
                                labelRadius={50} />
                        </HeaderPaper>
                    </Grid>
                    <Grid sm={6} md={4} lg={3} item={true}>
                        <HeaderPaper title="RAM x/y GB">
                            <VictoryPie
                                colorScale={[theme.palette.error.main, theme.palette.success.main]}
                                data={[{ x: "Used", y: 60 }, { x: "Available", y: 40 }]}
                                style={{ labels: { fontSize: 20, fill: "white" } }}
                                labelRadius={50} />
                        </HeaderPaper>
                    </Grid>
                </Grid>
                <Typography variant='h3'> Instances </Typography>
            </Container>
        </div>
    )
}
