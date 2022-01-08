import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';

import { CenterStack } from './Positioning';

export type LoadingPageProps = {
	size?: number;
};

export const LoadingPage = ({ size }: LoadingPageProps) => (
	<Box mt={3} mb={3}>
		<CenterStack>
			<CircularProgress size={size || 100} />
		</CenterStack>
	</Box>
);
