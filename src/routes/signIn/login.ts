import axios from "axios";
import { UserManager } from "oidc-client";

export const login = async () => {
    const mgr = new UserManager({
        response_type: 'id_token token',
        scope: 'openid profile email eduperson_entitlement',
        authority: 'https://login.cesnet.cz/oidc/',
        client_id: 'ca73360a-c510-4bc0-afb5-f5c5eee603ca',
        redirect_uri: 'http://localhost:4200/callback/',
        post_logout_redirect_uri: 'localhost:4200/signin/',
    })

    const user = await mgr.getUser()

    if (user) {

        try{
        // const respose = await axios.post('https://ip-147-251-124-112.flt.cloud.muni.cz/api//', { token: user.access_token }, {
        const respose = await axios.post('http://localhost:5000/', { token: user.access_token }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
    } catch (err) {
        console.error("SignIn failed");
    }

    } else {
        mgr.signinRedirect();
    }

    return user;

}