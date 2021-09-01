import React, { useEffect, useState } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, makeStyles, Typography, Box } from '@material-ui/core';
import { Instance } from '../../models/Instance';
import { DeleteInstanceButton } from '../static/CustomButtons';
import { getInstructions } from '../../api/InstanceApi';
import { Network } from '../../models/Network';
import { Instructions } from '../../models/Instructions';
import { LoadingPage } from '../static/LoadingPage';
import { InfoDialog } from '../static/Dialogs';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    tableRow: {
        '& > *': {
            fontSize: '1rem',
        },
    }
});

type Props = {
    instances: Instance[] | undefined;
    reloadData: () => void;
    networks: Network[] | undefined;
}

export const InstancesTable = ({ instances, reloadData, networks }: Props) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [instructions, setInstructions] = useState(new Map<string, Instructions>());
    
    useEffect(() => {
        (async () => {
            setLoading(true);
            if (instances === undefined) {
                setLoading(false);
                return;
            }
            const responses = await Promise.all(instances!.map(instance => {return getInstructions(instance)}));
            for (let i = 0; i < responses.length; i++) {
                instructions.set(instances![i].id, responses[i]);
            }
            setInstructions(new Map<string, Instructions>(instructions));
            setLoading(false);
        })();
    }, [instances])

    if (instances === undefined) {
        return (<Typography>Cannot load instances</Typography>)
    }

    if (loading) {
        return <LoadingPage size={50}/>;
    }

    const selectTestNetwork = () => {
        if (networks) {
            for (let network of networks) {
                if (network.name === "78-128-250-pers-proj-net") {
                    return network.id;
                }
            }
        }
        return '';
    }

    return (
        <Box mb={6}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="instances table">
                    <TableHead>
                        <TableRow className={classes.tableRow}>
                            <TableCell>Instance name</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left">Floating IP</TableCell>
                            <TableCell align="left">Cores</TableCell>
                            <TableCell align="left">RAM</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {instances.map((instance) => (
                            <TableRow className={classes.tableRow} key={instance.id}>
                                <TableCell component="th" scope="row">
                                    {instance.name}
                                </TableCell>
                                <TableCell align="left">{instance.status}</TableCell>
                                <TableCell align="left">{instructions.get(instance.id)?.floating_ip !== null ? instructions.get(instance.id)?.floating_ip : "Allocate ip todo"}</TableCell>
                                <TableCell align="left">{instance.flavor.vcpus}</TableCell>
                                <TableCell align="left">{Math.floor(instance.flavor.ram / 1024)} GB</TableCell>
                                <TableCell align="center">
                                    <DeleteInstanceButton instance={instance} reloadData={reloadData} />
                                    {/* <Button variant="outlined" onClick={() => {
                                        addFloatingIP({ network_id: selectTestNetwork(), instance_id: instance.id });
                                    }}>Alocate IP</Button> */}
                                    <InfoDialog instruction={instructions.get(instance.id)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}