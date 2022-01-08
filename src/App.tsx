import React from 'react';
import { CssBaseline } from '@material-ui/core';

import { ApplicationRoutes } from './routes/ApplicationRoutes';
import { AuthProvider } from './routes/AuthProvider';

const App = () => (
	<>
		<CssBaseline />
		<AuthProvider>
			<ApplicationRoutes />
		</AuthProvider>
	</>
);

export default App;
