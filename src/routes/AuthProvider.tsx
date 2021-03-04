import axios from 'axios';
import { UserManager } from 'oidc-client';
import React, { createContext, useState } from 'react';
import { API_URL, OIDC_AUTHORITY, OIDC_CLIENT_ID, OIDC_POST_LOGOUT_REDIRECT_URI, OIDC_REDIRECT_URI } from '../constants/Environment';
import { Project } from '../models/Project';
import { User } from '../models/User';

export type AuthContextType = {
    user: User | undefined;
    setUser: (user: User) => void;
    project: Project | undefined;
    setProject: (project: Project) => void;
    loadingAuthState: boolean;
    mgr: UserManager;
    login: () => Promise<void>;
} | null;

export const AuthContext = createContext<AuthContextType>(null);

type AuthProviderProps = {
    children: React.ReactElement;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [project, setProject] = useState<Project | undefined>(undefined);
    const [loadingAuthState, setLoadingAuthState] = useState(false);

    const mgr = new UserManager({
        response_type: 'id_token token',
        scope: 'openid profile email eduperson_entitlement',
        authority: OIDC_AUTHORITY,
        client_id: OIDC_CLIENT_ID,
        redirect_uri: OIDC_REDIRECT_URI,
        post_logout_redirect_uri: OIDC_POST_LOGOUT_REDIRECT_URI,
    })

    const login = async () => {

        const oidcUser = await mgr.getUser()

        if (oidcUser) {

            mgr.startSilentRenew();

            // const respose = await axios.post('https://ip-147-251-124-112.flt.cloud.muni.cz/api//', { token: user.access_token }, {
            const respose = await axios.post(API_URL, { token: oidcUser.access_token }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            setUser({ token: oidcUser.access_token, email: oidcUser.profile.email!, name: oidcUser.profile.name! });
            console.log("got logged");
        } else {
            mgr.signinRedirect();
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                project,
                setProject,
                loadingAuthState,
                mgr,
                login,
            }}>
            {children}
        </AuthContext.Provider>
    );
};
