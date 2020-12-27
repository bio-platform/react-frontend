import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const createData = (name: string, floatingIp: String, cores: number, ram: number) => {
    return { name, floatingIp, cores, ram };
}

const rows = [
    createData('Test 1', "65.42.66.76", 4, 24),
    createData('Test 2', "None", 1, 37),
];

export const InstancesTable = () => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="instances table">
                <TableHead>
                    <TableRow>
                        <TableCell>Instance name</TableCell>
                        <TableCell align="left">Floating IP</TableCell>
                        <TableCell align="left">Cores</TableCell>
                        <TableCell align="left">RAM</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="left">{row.floatingIp}</TableCell>
                            <TableCell align="left">{row.cores}</TableCell>
                            <TableCell align="left">{row.ram} GB</TableCell>
                            <TableCell align="center">
                                <IconButton aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}