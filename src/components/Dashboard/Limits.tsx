import React from 'react';
import { Grid, Typography, useTheme } from '@material-ui/core';
import { VictoryPie } from 'victory';

import { HeaderPaper } from '../HeaderPaper';
import { Limit } from '../../models/Limit';

type Props = {
	limit: Limit | undefined;
};

export const Limits = ({ limit }: Props) => {
	const theme = useTheme();

	if (limit === undefined) {
		return <Typography>Cannot load limits</Typography>;
	}

	// helper for cleaner code
	const limitArray = [
		{
			name: 'Floating IPs ',
			used: limit.floating_ips.used,
			limit: limit.floating_ips.limit
		},
		{
			name: 'Instances ',
			used: limit.instances.used,
			limit: limit.instances.limit
		},
		{ name: 'Cores ', used: limit.cores.used, limit: limit.cores.limit },
		{ name: 'RAM ', used: limit.ram.used, limit: limit.ram.limit }
	];

	return (
		<Grid container spacing={3}>
			{limitArray.map(element => (
				<Grid key={element.name} sm={6} md={4} lg={3} item>
					<HeaderPaper
						title={`${element.name + element.used}/${element.limit}${
							element.name === 'RAM ' ? ' MB' : ''
						}`}
					>
						<VictoryPie
							colorScale={[
								theme.palette.error.main,
								theme.palette.success.main
							]}
							data={[
								{ x: 'Used', y: element.used },
								{ x: 'Available', y: element.limit - element.used }
							]}
							style={{ labels: { fontSize: 20, fill: 'white' } }}
							labelRadius={50}
						/>
					</HeaderPaper>
				</Grid>
			))}
		</Grid>
	);
};
