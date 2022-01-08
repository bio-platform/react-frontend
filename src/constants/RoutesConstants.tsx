import React from 'react';
import ListIcon from '@material-ui/icons/List';
import InfoIcon from '@material-ui/icons/Info';
import AddCircleIcon from '@material-ui/icons/AddCircle';

export const DashboardDrawerList = [
	['Create new instance', <AddCircleIcon />, 'createNewInstance'],
	['Limits', <InfoIcon />, 'limits'],
	['Instances', <ListIcon />, 'instances']
];
