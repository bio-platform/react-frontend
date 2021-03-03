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

        axios.defaults.withCredentials = true;

        const restApi = axios.create({
            baseURL: "http://localhost:5000/",
        });

        restApi.interceptors.request.use(
            function (config) {
                config.headers.withCredentials = true;
                return config;
            },
            function (err) {
                return Promise.reject(err);
            }
        );
        // const respose = await axios.post('https://ip-147-251-124-112.flt.cloud.muni.cz/api//', { token: user.access_token }, {
        const respose = await axios.post('https://ip-147-251-124-112.flt.cloud.muni.cz/api//', { token: user.access_token }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        // fetch('https://ip-147-251-124-112.flt.cloud.muni.cz/api//', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     credentials: 'include',
        //     body: JSON.stringify({ token: user.access_token }),
        // })

        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://ip-147-251-124-112.flt.cloud.muni.cz/api//', true);

        //Send the proper header information along with the request
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () { // Call a function when the state changes.
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                 console.log("request succesful");
            }
        }
        xhr.send(JSON.stringify({ token: user.access_token }));

    } else {
        mgr.signinRedirect();
    }

    return user;

}