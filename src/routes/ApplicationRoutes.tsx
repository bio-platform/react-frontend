import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { AuthRoutes } from "./AuthRoutes";
import {DashboardRoutes} from "./DashboardRoutes";

export const ApplicationRoutes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/dashboard" component={DashboardRoutes}/>
                <Route path="/auth" component={AuthRoutes} />
                <Redirect to="/auth" from= "/" />
            </Switch>
        </Router>
    );
}
