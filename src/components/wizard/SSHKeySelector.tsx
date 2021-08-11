import { FormControl, InputLabel, Select, Typography } from "@material-ui/core";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { getKeys } from "../../api/UserApi";
import { KeyPair } from "../../models/KeyPair";
import { AuthContext } from "../../routes/AuthProvider";
import { LoadingPage } from "../static/LoadingPage";

export type SSHKeySelectorProps = {
    selectedKey?: number | string;
    setDefaultKey: (keyName: string) => void;
    setSelectedKey: (event: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => void;
}

export const SSHKeySelector = ({ selectedKey, setDefaultKey, setSelectedKey }: SSHKeySelectorProps) => {
    const [keyPairs, setKeyPairs] = useState<KeyPair[] | undefined>([])
    const [loading, setLoading] = useState(true);

    const context = useContext(AuthContext);

    useEffect(() => {
        try {
        (async () => {
            const response = await getKeys();
            setKeyPairs(response);
            setDefaultKey(response[0].name);
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
    }, [])

    if (loading) {
        return <LoadingPage size={20}/>
    }

    return (<>
    <Typography>Select ssh key</Typography>
        {keyPairs!.length > 0 && (<FormControl>
            {/* <InputLabel htmlFor="ssh-key">SSH Key</InputLabel> */}
            <Select
                value={selectedKey || keyPairs![0].name}
                onChange={setSelectedKey}
                inputProps={{
                    name: "ssh-key",
                    id: "ssh-key",
                }}
            >
                {keyPairs!.map((key) => {
                    return <option key={key.name} value={key.name}>{key.name}</option>
                })}
            </Select>
        </FormControl>)}
        {/* todo  add new key */}
    </>);
}