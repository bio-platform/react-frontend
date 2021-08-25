import React, { useContext, useEffect, useState } from "react"
import { Container, Typography, Box, Divider, Button, IconButton, LinearProgress } from "@material-ui/core"
import { InstancesTable } from "./InstancesTable";
import { Limits } from "./Limits";
import { DashboardDrawerList } from "../../constants/RoutesConstants";
import { AuthContextType, AuthContext } from "../../routes/AuthProvider";
import { Limit } from "../../models/Limit";
import { getLimits, getNetworks } from "../../api/UserApi";
import { LoadingPage } from "../static/LoadingPage";
import { getConfigurations, getInstances } from "../../api/InstanceApi";
import { Instance } from "../../models/Instance";
import { Network } from "../../models/Network";
import { ConfigurationData } from "../../models/ConfigurationData";
import RefreshIcon from '@material-ui/icons/Refresh';
import { useHistory } from "react-router-dom";

export type DashboardProps = {
    setConfiguration: (data: ConfigurationData) => void
}

export const Dashboard = ({ setConfiguration }: DashboardProps) => {
    const [limit, setLimit] = useState<Limit | undefined>(undefined);
    const [instances, setInstances] = useState<Instance[]>([])
    const [configurationData, setConfigurationData] = useState<ConfigurationData[]>([]);
    const [networks, setNetworks] = useState<Network[]>([]);
    const [loading, setLoading] = useState(true);
    const [minorLoading, setMinorLoading] = useState(false);
    const context = useContext<AuthContextType>(AuthContext);
    const history = useHistory();

    const reloadData = async () => {
        try {
            const responses = await Promise.all([getLimits(), getInstances(), getNetworks(), getConfigurations()]);
            setLimit(responses[0]);
            setInstances(responses[1]);
            setNetworks(responses[2]);
            setConfigurationData(responses[3]);
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
                    {/* todo tabs */}
                    {configurationData.map((data) => (<Button key={data.name} onClick={() => {
                        setConfiguration(data);
                        history.push("/dashboard/create-new-instance");
                    }}>{data.name}</Button>)
                    )}

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
                <InstancesTable instances={instances} reloadData={reloadDataWithDelay} networks={networks} />
            </Container>
        </div >
    )
}
