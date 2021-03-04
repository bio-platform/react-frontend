import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, makeStyles, Typography } from '@material-ui/core';
import { Instance } from '../../models/Instance';
import { deleteInstance } from '../../api/InstanceApi';
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

const createData = (name: string, floatingIp: String, cores: number, ram: number) => {
    return { name, floatingIp, cores, ram };
}

const rows = [
    createData('Test 1', "65.42.66.76", 4, 24),
    createData('Test 2', "None", 1, 37),
];

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
                            <TableCell align="left">{instance.status}</TableCell>
                            <TableCell align="left">{instance.status}</TableCell>
                            <TableCell align="left">{instance.status} GB</TableCell>
                            <TableCell align="center">
                                <DeleteInstanceButton instance={instance} reloadData={reloadData} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}