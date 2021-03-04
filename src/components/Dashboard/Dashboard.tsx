import React, { useContext, useEffect, useState } from "react"
import { Container, Typography, Box, Divider } from "@material-ui/core"
import { InstancesTable } from "./InstancesTable";
import { Limits } from "./Limits";
import { CreateButtons } from "./CreateButtons";
import { DashboardDrawerList } from "../../constants/RoutesConstants";
import { AuthContextType, AuthContext } from "../../routes/AuthProvider";
import { Limit } from "../../models/Limit";
import { getLimits } from "../../api/UserApi";
import { LoadingPage } from "../static/LoadingPage";
import { getInstances } from "../../api/InstanceApi";
import { Instance } from "../../models/Instance";

export const Dashboard = () => {
    const [limit, setLimit] = useState<Limit | undefined>(undefined);
    const [instances, setInstances] = useState<Instance[]>([])
    const [loading, setLoading] = useState(true);
    const context = useContext<AuthContextType>(AuthContext);

    useEffect(() => {
        (async () => {
            const responses = await Promise.all([getLimits(), getInstances()]);
            setLimit(responses[0]);
            setInstances(responses[1]);
            setLoading(false);
        })();
    }, [])

    if (loading) {
        return <LoadingPage />
    }

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
                <Limits limit={limit} />
                <Box mt={2} mb={3} id={DashboardDrawerList[2][2].toString()}>
                    <Typography variant='h3'> Instances </Typography>
                </Box>
                <InstancesTable instances={instances}/>
            </Container>
        </div >
    )
}
