import React from "react"
import { Container, Typography, makeStyles, createStyles, Theme, Box, Divider } from "@material-ui/core"
import { InstancesTable } from "./InstancesTable";
import { Limits } from "./Limits";
import { CreateButtons } from "./CreateButtons";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        buttons: {
            '& > *': {
                margin: theme.spacing(1),
            },
        }
    }),
);

export const Dashboard = () => {
    const classes = useStyles();

    return (
        <div className={classes.root} >
            <Container maxWidth='xl'>
                <Box mt={2} mb={3}>
                    <Typography variant='h2'> Create new instance </Typography>
                    <Divider />
                </Box>
                <CreateButtons />
                <Box mt={2} mb={3}>
                    <Typography variant='h2'> Overview </Typography>
                    <Divider />
                </Box>
                <Box mt={2} mb={3}>
                    <Typography variant='h3'> Limits </Typography>
                </Box>
                <Limits />
                <Box mt={2} mb={3}>
                    <Typography variant='h3'> Instances </Typography>
                </Box>
                <InstancesTable />
            </Container>
        </div >
    )
}
