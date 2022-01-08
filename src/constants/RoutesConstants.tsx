import React from 'react';
import ListIcon from '@material-ui/icons/List';
import InfoIcon from '@material-ui/icons/Info';
import AddCircleIcon from '@material-ui/icons/AddCircle';

export const DashboardDrawerList = [
	// eslint-disable-next-line react/jsx-key
	['Create new instance', <AddCircleIcon />, 'createNewInstance'],
	// eslint-disable-next-line react/jsx-key
	['Limits', <InfoIcon />, 'limits'],
	// eslint-disable-next-line react/jsx-key
	['Instances', <ListIcon />, 'instances']
];
