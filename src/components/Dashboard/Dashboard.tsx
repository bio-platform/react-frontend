import React, { useContext, useEffect, useState } from "react"
import { Container, Typography, Box, Divider, IconButton, LinearProgress } from "@material-ui/core"
import { InstancesTable } from "./InstancesTable";
import { Limits } from "./Limits";
import { DashboardDrawerList } from "../../constants/RoutesConstants";
import { AuthContextType, AuthContext } from "../../routes/AuthProvider";
import { Limit } from "../../models/Limit";
import { getLimits, getNetworks } from "../../api/UserApi";
import { LoadingPage } from "../static/LoadingPage";
import { getConfigurations, getFloatingIps, getInstances } from "../../api/InstanceApi";
import { Instance } from "../../models/Instance";
import { Network } from "../../models/Network";
import { ConfigurationData } from "../../models/ConfigurationData";
import RefreshIcon from '@material-ui/icons/Refresh';
import { ConfigurationTabs } from "./ConfigurationTabs";
import { FloatingIPData } from "../../models/FloatingIPData";

export type DashboardProps = {
    setConfiguration: (data: ConfigurationData) => void
}

export const Dashboard = ({ setConfiguration }: DashboardProps) => {
    const [limit, setLimit] = useState<Limit | undefined>(undefined);
    const [instances, setInstances] = useState<Instance[]>([])
    const [configurationData, setConfigurationData] = useState<ConfigurationData[]>([]);
    const [networks, setNetworks] = useState<Network[]>([]);
    const [floatingIps, setFloatingIps] = useState<FloatingIPData[]>([])
    const [loading, setLoading] = useState(true);
    const [minorLoading, setMinorLoading] = useState(false);
    const context = useContext<AuthContextType>(AuthContext);

    const reloadData = async () => {
        try {
            const responses = await Promise.all([getLimits(), getInstances(), getNetworks(), getConfigurations(), getFloatingIps()]);
            setLimit(responses[0]);
            setInstances(responses[1]);
            setNetworks(responses[2]);
            setConfigurationData(responses[3]);
            setFloatingIps(responses[4]);
            setLoading(false);
            setMinorLoading(false);
        } catch (err) {
            if (err.response.status === 401) {
                console.log("Session expired");
                context?.logout();
            }
            else {
                throw err;
            }
        }
    }

    const reloadDataWithDelay = async () => {
        setMinorLoading(true);
        setTimeout(() => {
            reloadData();
        }, 5000);
    }

    useEffect(() => {
        (async () => {
            await reloadData();
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

                <Box>
                    <ConfigurationTabs configurations={configurationData} setConfiguration={setConfiguration} />
                </Box>
                <Box mt={2} mb={3}>
                    <Typography variant='h2'> Overview </Typography>
                    <Divider />
                </Box>
                <Box mt={2} mb={3} id={DashboardDrawerList[1][2].toString()}>
                    <Typography variant='h3'> Limits </Typography>
                </Box>
                <Limits limit={limit} />
                <Box mt={2} mb={3} id={DashboardDrawerList[2][2].toString()}>
                    <Typography variant='h3'> Instances
                        <IconButton onClick={async () => {
                            setMinorLoading(true);
                            reloadData();
                        }}>
                            <RefreshIcon />
                        </IconButton>
                    </Typography>
                    {minorLoading && <LinearProgress />}
                </Box>
                <InstancesTable floatingIps={floatingIps} instances={instances} reloadData={reloadDataWithDelay} />
            </Container>
        </div >
    )
}
