import { FormControl, InputLabel, Select } from "@material-ui/core";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { getNetworks } from "../../api/UserApi";
import { Network } from "../../models/Network";
import { AuthContext } from "../../routes/AuthProvider";
import { LoadingPage } from "../static/LoadingPage";

export type LocalNetworkIdSelectorProps = {
    selectedNetwork?: number | string;
    setDefaultNetwork: (keyName: string) => void;
    setSelectedNetwork: (event: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => void;
}

export const LocalNetworkIdSelector = ({ selectedNetwork, setDefaultNetwork, setSelectedNetwork }: LocalNetworkIdSelectorProps) => {
    const [networks, setNetworks] = useState<Network[] | undefined>([])
    const [loading, setLoading] = useState(true);

    const context = useContext(AuthContext);

    useEffect(() => {
        try{
        (async () => {
            const response = await getNetworks();
            setNetworks(response);
            setDefaultNetwork(response[0].id);
            setLoading(false);
        })();
    } catch (err) {
        if (err.response.status === 401) {
            console.log("Session expired");
            context?.logout();
        }
        else {
            throw err;
        }
    }
    }, [context])

    if (loading) {
        return <LoadingPage size={20}/>
    }

    return (<>
        {networks!.length > 0 && (<FormControl>
            <InputLabel htmlFor="network">Network</InputLabel>
            <Select
                value={selectedNetwork || networks![0].id}
                onChange={setSelectedNetwork}
                inputProps={{
                    name: "network",
                    id: "network",
                }}
            >
                {networks!.map((network : Network) => {
                    return <option key={network.id} value={network.id}>{network.name}</option>
                })}
            </Select>
        </FormControl>)}
    </>);
}