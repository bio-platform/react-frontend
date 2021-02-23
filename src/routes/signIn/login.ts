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

    console.log('jedna')

    const user = await mgr.getUser()

    if (user) {
        
    } else {
        mgr.signinRedirect();
    }

    // if (user) {
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ token: user.id_token })
    //     };
    //     await fetch('https://ip-147-251-124-112.flt.cloud.muni.cz/api/', requestOptions)
    // }

    return user;

}