import React, { useContext, useEffect, useState } from "react"
import { Container, Typography, Box, Divider, Button } from "@material-ui/core"
import { InstancesTable } from "./InstancesTable";
import { Limits } from "./Limits";
import { CreateButtons } from "./CreateButtons";
import { DashboardDrawerList } from "../../constants/RoutesConstants";
import { AuthContextType, AuthContext } from "../../routes/AuthProvider";
import { Limit } from "../../models/Limit";
import { getKeys, getLimits, getNetworks } from "../../api/UserApi";
import { LoadingPage } from "../static/LoadingPage";
import { getConfigurations, getInstances, postInstance } from "../../api/InstanceApi";
import { Instance } from "../../models/Instance";
import { Network } from "../../models/Network";
import { KeyPair } from "../../models/KeyPair";
import { ConfigurationData } from "../../models/ConfigurationData";

export const Dashboard = () => {
    const [limit, setLimit] = useState<Limit | undefined>(undefined);
    const [instances, setInstances] = useState<Instance[]>([])
    const [configurationData, setConfigurationData] = useState<ConfigurationData[]>([]);
    const [networks, setNetworks] = useState<Network[]>([]);
    const [keyPairs, setKeyPairs] = useState<KeyPair[]>([])
    const [loading, setLoading] = useState(true);
    const context = useContext<AuthContextType>(AuthContext);

    const selectTestNetwork = () => {
        for (let network of networks) {
            if (network.name === "78-128-250-pers-proj-net") {
                return network.id;
            }
        }
        return '';
    }

    const reloadData = async () => {
        try {
            const responses = await Promise.all([getLimits(), getInstances(), getNetworks(), getKeys(), getConfigurations()]);
            setLimit(responses[0]);
            setInstances(responses[1]);
            setNetworks(responses[2]);
            setKeyPairs(responses[3]);
            setConfigurationData(responses[4]);
            setLoading(false);
        } catch (err) {
            if  (err.response.status === 401) {
                // todo check errors for not autenticated user
                console.log("error 401");
            } 
            else {
                throw err;
            }
        }
        
       
        
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
                <Button onClick={async () => {
                    const metaData = { Bioclass_user: context?.user?.name!, Bioclass_email: context?.user?.email! };
                    const instanceData = {
                        flavor: "standard.2core-16ram", image: "debian-9-x86_64_bioconductor",
                        key_name: keyPairs[0].name, servername: 'Bioconductor', network_id: selectTestNetwork(), metadata: metaData
                    };

                    // await postInstance(instanceData);
                    await reloadData();
                }}>
                    Test bioconductor
                </Button>
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
                <InstancesTable instances={instances} reloadData={reloadData} networks={networks} />
            </Container>
        </div >
    )
}
