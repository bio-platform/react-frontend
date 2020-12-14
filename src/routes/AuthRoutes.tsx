import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { LogIn } from "../components/LogIn";

export const AuthRoutes = () => {
    // TODO add AuthProvider with login
    return (
        <Switch>
            <Route exact path="/auth/login" component={LogIn} />
            <Redirect to="/auth/login" from="/auth" />
        </Switch>
    )};
