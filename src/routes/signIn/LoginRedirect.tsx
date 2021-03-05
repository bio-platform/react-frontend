import React, { useContext } from "react"
import { UserManager } from "oidc-client";
import { AuthContextType, AuthContext } from "../AuthProvider";
import { useHistory } from "react-router-dom";

export const LoginRedirect = () => {
    const history = useHistory();
    const context = useContext<AuthContextType>(AuthContext);

    new UserManager({}).signinRedirectCallback().then(async () => {
        await context?.login();
        history.push('/dashboard');
    }).catch((e) => {
        console.log(e);
    });

    return <></>
}
