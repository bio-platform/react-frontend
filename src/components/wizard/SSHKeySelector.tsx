import { Box, FormControl, InputLabel, Select, Typography } from "@material-ui/core";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { getKeys, postKey } from "../../api/UserApi";
import { KeyPair } from "../../models/KeyPair";
import { PostKey } from "../../models/PostKey";
import { AuthContext } from "../../routes/AuthProvider";
import { LoadingPage } from "../static/LoadingPage";
import { NewSSHKeyDialog } from "./NewSSHKeyDialog";

export type SSHKeySelectorProps = {
    selectedKey?: number | string;
    setDefaultKey: (keyName: string) => void;
    setSelectedKey: (event: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => void;
}

export const SSHKeySelector = ({ selectedKey, setDefaultKey, setSelectedKey }: SSHKeySelectorProps) => {
    const [keyPairs, setKeyPairs] = useState<KeyPair[] | undefined>([])
    const [loading, setLoading] = useState(true);

    const context = useContext(AuthContext);

    const uploadNewKey = async (key: PostKey) => {
        // todo does not work with the backend. futher work with Andrej is needed
        setLoading(true);
        try {
            await postKey(key);
            const response = await getKeys();
            setKeyPairs(response);
            setDefaultKey(response[0].name);
            setLoading(false);
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
                console.log("Session expired");
                context?.logout();
            }
            else {
                throw err;
            }
        }
    }, [context])

    if (loading) {
        return <LoadingPage size={20} />
    }

    return (<>
        <Box>
            {keyPairs!.length > 0 ? (<FormControl fullWidth>
                <InputLabel htmlFor="ssh-key">SSH Key</InputLabel>
                <Select
                    fullWidth
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
            </FormControl>) : <Typography>You don't have any ssh keys. Upload new one.</Typography>}
        </Box>
        <Box mt={2}>
            <NewSSHKeyDialog uploadKey={uploadNewKey} />
        </Box>
    </>);
}