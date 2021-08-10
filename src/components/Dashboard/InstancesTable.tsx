import React, { useContext } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, makeStyles, Typography, Box, Button } from '@material-ui/core';
import { Instance } from '../../models/Instance';
import { DeleteInstanceButton } from '../static/CustomButtons';
import { addFloatingIP } from '../../api/InstanceApi';
import { AuthContextType, AuthContext } from '../../routes/AuthProvider';
import { Network } from '../../models/Network';

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
    const context = useContext<AuthContextType>(AuthContext);

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

    if (instances === undefined) {
        return (<Typography>Cannot load instances</Typography>)
    }

    return (
        <Box mb={6}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="instances table">
                    <TableHead>
                        <TableRow className={classes.tableRow}>
                            <TableCell>Instance name</TableCell>
                            <TableCell align="left">Status</TableCell>
                            {/* <TableCell align="left">Floating IP</TableCell> */}
                            <TableCell align="left">Cores</TableCell>
                            <TableCell align="left">RAM</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {instances.map((instance) => (
                            <TableRow className={classes.tableRow} key={instance.id}>
                                <TableCell component="th" scope="row">
                                    {instance.name + "  ---  " + instance.id}
                                </TableCell>
                                <TableCell align="left">{instance.status}</TableCell>
                                {/* todo floating ip is not showed */}
                                {/* <TableCell align="left">{instance.access_ipv4 === "" ? "None" : instance.access_ipv4}</TableCell> */}
                                <TableCell align="left">{instance.flavor.vcpus}</TableCell>
                                <TableCell align="left">{Math.floor(instance.flavor.ram / 1024)} GB</TableCell>
                                <TableCell align="center">
                                    <DeleteInstanceButton instance={instance} reloadData={reloadData} />
                                    <Button variant="outlined" onClick={() => {
                                        addFloatingIP({ network_id: selectTestNetwork(), instance_id: instance.id });
                                    }}>Alocate IP</Button>
                                    {/* todo infor button with popup */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}