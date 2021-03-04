import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { AuthContextType, AuthContext } from "./AuthProvider";
import { AuthRoutes } from "./AuthRoutes";
import {DashboardRoutes} from "./DashboardRoutes";
import { LoginRedirect } from "./signIn/LoginRedirect";

export const ApplicationRoutes = () => {
    const context = useContext<AuthContextType>(AuthContext);

    return (
        <Router>
            <Switch>
                <Route path="/dashboard" component={DashboardRoutes}/>
                <Route path="/auth" component={AuthRoutes} />
                <Route path="/callback" component={LoginRedirect} />
                {context?.user ? <Redirect to="/dashboard" from= "/" /> : <Redirect to="/auth" from= "/" />}
            </Switch>
        </Router>
    );
}
