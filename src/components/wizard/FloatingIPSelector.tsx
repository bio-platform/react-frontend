import { FormControl, InputLabel, Select, Typography } from "@material-ui/core";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { getFloatingIps } from "../../api/InstanceApi";
import { FloatingIPData } from "../../models/FloatingIPData";
import { AuthContextType, AuthContext } from "../../routes/AuthProvider";
import { LoadingPage } from "../static/LoadingPage";

export type FloatingIPSelectorProps = {
    selectedFloatingIP?: number | string;
    setDefaultFloatingIP: (keyName: string) => void;
    setSelectedFloatingIP: (event: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => void;
}

export const FloatingIPSelector = ({ selectedFloatingIP, setDefaultFloatingIP, setSelectedFloatingIP }: FloatingIPSelectorProps) => {
    const [floatingIPs, setFloatingIPs] = useState<FloatingIPData[] | undefined>([])
    const [loading, setLoading] = useState(true);

    const context = useContext<AuthContextType>(AuthContext)

    useEffect(() => {
        try {
            (async () => {
                const response = await getFloatingIps();
                setFloatingIPs(response);
                setDefaultFloatingIP(response[0].name);
                setLoading(false);
            })();
        } catch (err) {
            if (err.response.status === 401) {
                // todo check errors for not autenticated user
                console.log("Session expired");
                context?.logout();
            }
            else {
                throw err;
            }
        }
    }, []);

    if (loading) {
        return <LoadingPage size={20} />
    }

    return (<>
        {floatingIPs!.length > 0 && (<FormControl>
            <InputLabel htmlFor="floating-ip">Floating IP</InputLabel>
            <Select
                value={selectedFloatingIP || floatingIPs![0].name}
                onChange={setSelectedFloatingIP}
                inputProps={{
                    name: "floating-ip",
                    id: "floating-ip",
                }}
            >
                {floatingIPs!.map((floatingIP: FloatingIPData) => {
                    return <option key={floatingIP.name} value={floatingIP.name}>{floatingIP.name}</option>
                })}
            </Select>
        </FormControl>)}
    </>);
}