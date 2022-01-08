import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { SignIn } from '../components/SignIn';

import { AuthContextType, AuthContext } from './AuthProvider';

export const AuthRoutes = () => {
	const context = useContext<AuthContextType>(AuthContext);

	if (context?.user) {
		return <Redirect to="/dashboard" />;
	}

	return (
		<Switch>
			<Route exact path="/auth/signin" component={SignIn} />
			<Redirect to="/auth/signin" from="/auth" />
		</Switch>
	);
};
