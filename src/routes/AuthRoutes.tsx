import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { SignIn } from "../components/SignIn";

export const AuthRoutes = () => {
    // TODO add AuthProvider with login
    return (
        <Switch>
            <Route exact path="/auth/signin" component={SignIn} />
            <Redirect to="/auth/signin" from="/auth" />
        </Switch>
    )};
