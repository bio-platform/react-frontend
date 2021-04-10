import React from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, makeStyles, Typography, Box } from '@material-ui/core';
import { Instance } from '../../models/Instance';
import { DeleteInstanceButton } from '../static/CustomButtons';

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
}

export const InstancesTable = ({ instances, reloadData }: Props) => {
    const classes = useStyles();

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
                                <TableCell align="left">{instance.access_ipv4 === "" ? "None" : instance.access_ipv4}</TableCell>
                                <TableCell align="left">{instance.flavor.vcpus}</TableCell>
                                <TableCell align="left">{Math.floor(instance.flavor.ram/1024)} GB</TableCell>
                                <TableCell align="center">
                                    <DeleteInstanceButton instance={instance} reloadData={reloadData} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}