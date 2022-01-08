import { Grid } from '@material-ui/core';
import React from 'react';

type Props = {
	children: JSX.Element | JSX.Element[];
};

export const CenterStack = (props: Props) => (
	<Grid container justify="center" alignItems="center" direction="column">
		{props.children}
	</Grid>
);
