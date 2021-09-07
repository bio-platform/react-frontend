import React, { useEffect, useState } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, makeStyles, Typography, Box } from '@material-ui/core';
import { Instance } from '../../models/Instance';
import { DeleteInstanceButton } from '../static/CustomButtons';
import { getInstructions } from '../../api/InstanceApi';
import { Network } from '../../models/Network';
import { Instructions } from '../../models/Instructions';
import { LoadingPage } from '../static/LoadingPage';
import { FloatingIpDialog, InfoDialog } from '../static/Dialogs';
import { FloatingIPData } from '../../models/FloatingIPData';

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
    floatingIps: FloatingIPData[] | undefined;
}

export const InstancesTable = ({ instances, reloadData, floatingIps }: Props) => {
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
            const responses = await Promise.all(instances!.map(instance => { return getInstructions(instance) }));
            for (let i = 0; i < responses.length; i++) {
                instructions.set(instances![i].id, responses[i] || {floating_ip: null, instructions: null});
            }
            setInstructions(new Map<string, Instructions>(instructions));
            setLoading(false);
        })();
    }, [instances])

    if (instances === undefined) {
        return (<Typography>Cannot load instances</Typography>)
    }

    if (loading) {
        return <LoadingPage size={50} />;
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
                                <TableCell align="left">
                                    {instructions.get(instance.id)?.floating_ip !== null ?
                                        instructions.get(instance.id)?.floating_ip :
                                        <FloatingIpDialog setLoading={setLoading} floatingIPs={floatingIps || []} instanceId={instance.id} reloadData={reloadData} />
                                    }
                                </TableCell>
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