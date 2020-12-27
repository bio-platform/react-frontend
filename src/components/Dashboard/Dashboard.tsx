import React from "react"
import { Container, Typography, makeStyles, createStyles } from "@material-ui/core"
import { InstancesTable } from "./InstancesTable";
import { Limits } from "./Limits";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);

export const Dashboard = () => {
    const styles = useStyles();
    //todo add spacing

    return (
        <div className={styles.root} >
            <Container maxWidth='xl'>
                <Typography variant='h2'> Create new instance </Typography>
                <Typography variant='h2'> Overview </Typography>
                <Typography variant='h3'> Limits </Typography>
                <Limits />
                <Typography variant='h3'> Instances </Typography>
                <InstancesTable />
            </Container>
        </div>
    )
}
