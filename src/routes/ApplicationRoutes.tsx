import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { AuthRoutes } from "./AuthRoutes";
import {DashboardRoutes} from "./DashboardRoutes";
import { LoginRedirect } from "./signIn/LoginRedirect";

export const ApplicationRoutes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/dashboard" component={DashboardRoutes}/>
                <Route path="/auth" component={AuthRoutes} />
                <Route path="/callback" component={LoginRedirect} />
                <Redirect to="/auth" from= "/" />
            </Switch>
        </Router>
    );
}
