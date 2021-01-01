import React from "react"
import { Container, Typography, Box, Divider } from "@material-ui/core"
import { InstancesTable } from "./InstancesTable";
import { Limits } from "./Limits";
import { CreateButtons } from "./CreateButtons";
import { DashboardDrawerList } from "../../constants/RoutesConstants";

export const Dashboard = () => {
    return (
        <div>
            <Container maxWidth='xl'>
                <Box mt={2} mb={3} id={DashboardDrawerList[0][2].toString()}>
                    <Typography variant='h2'> Create new instance </Typography>
                    <Divider />
                </Box>
                <CreateButtons />
                <Box mt={2} mb={3}>
                    <Typography variant='h2'> Overview </Typography>
                    <Divider />
                </Box>
                <Box mt={2} mb={3} id={DashboardDrawerList[1][2].toString()}>
                    <Typography variant='h3'> Limits </Typography>
                </Box>
                <Limits />
                <Box mt={2} mb={3} id={DashboardDrawerList[2][2].toString()}>
                    <Typography variant='h3'> Instances </Typography>
                </Box>
                <InstancesTable />
            </Container>
        </div >
    )
}
