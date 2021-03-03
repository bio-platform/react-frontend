import axios from "axios";
import { UserManager } from "oidc-client";
import { User } from "../../models/User";

export const login = async (): Promise<User | null> => {
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

        mgr.startSilentRenew();

        try {
            // const respose = await axios.post('https://ip-147-251-124-112.flt.cloud.muni.cz/api//', { token: user.access_token }, {
            const respose = await axios.post('http://localhost:5000/', { token: user.access_token }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
        } catch (err) {
            console.error("SignIn failed");
            return null;
        }

    } else {
        mgr.signinRedirect();
        return null;
    }

    const customUser: User = { token: user.access_token, email: user.profile.email!, name: user.profile.name! };

    return customUser;

}