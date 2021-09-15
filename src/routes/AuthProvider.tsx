import axios from 'axios';
import { UserManager } from 'oidc-client';
import React, { createContext, useEffect, useState } from 'react';
import { API_URL, OIDC_AUTHORITY, OIDC_CLIENT_ID, OIDC_POST_LOGOUT_REDIRECT_URI, OIDC_REDIRECT_URI } from '../constants/Environment';
import { Project } from '../models/Project';
import { User } from '../models/User';

export type AuthContextType = {
    user: User | undefined;
    setUser: (user: User | undefined) => void;
    project: Project | undefined;
    setProject: (project: Project | undefined) => void;
    mgr: UserManager;
    login: () => Promise<void>;
    logout: () => void;
} | null;

export const AuthContext = createContext<AuthContextType>(null);

type AuthProviderProps = {
    children: React.ReactElement;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [project, setProject] = useState<Project | undefined>(undefined);

    useEffect(() => {
        if (sessionStorage.getItem('userToken') && sessionStorage.getItem('userName') && sessionStorage.getItem('userEmail')) {
            setUser({
                token: sessionStorage.getItem('userToken')!,
                name: sessionStorage.getItem('userName')!,
                email: sessionStorage.getItem('userEmail')!
            });
        }
        if (sessionStorage.getItem('projectId') && sessionStorage.getItem('projectName')) {
            setProject({
                id: sessionStorage.getItem('projectId')!,
                name: sessionStorage.getItem('projectName')!
            });
        }
    }, [])


    const handleSetUser = (user: User | undefined) => {
        if (user) {
            sessionStorage.setItem('userToken', user.token);
            sessionStorage.setItem('userName', user.name);
            sessionStorage.setItem('userEmail', user.email);
        } else {
            sessionStorage.removeItem('userToken');
            sessionStorage.removeItem('userName');
            sessionStorage.removeItem('userEmail');
        }
        setUser(user);
    }

    const handleSetProject = (project: Project | undefined) => {
        if (project) {
            sessionStorage.setItem('projectId', project.id);
            sessionStorage.setItem('projectName', project.name);
        } else {
            sessionStorage.removeItem('projectId');
            sessionStorage.removeItem('projectName');
        }
        setProject(project);
    }

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
            await axios.post(API_URL, { token: oidcUser.access_token }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            handleSetUser({ token: oidcUser.access_token, email: oidcUser.profile.email!, name: oidcUser.profile.preferred_username! });
        } else {
            mgr.signinRedirect();
        }
    }

    const logout = () => {
        sessionStorage.removeItem('userToken');
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('userEmail');
        sessionStorage.removeItem('projectId');
        sessionStorage.removeItem('projectName');
        setProject(undefined);
        setUser(undefined);
        mgr.signoutRedirect();
    }
    
    return (
        <AuthContext.Provider
            value={{
                user: user,
                setUser: handleSetUser,
                project: project,
                setProject: handleSetProject,
                mgr: mgr,
                login: login,
                logout: logout,
            }}>
            {children}
        </AuthContext.Provider>
    );
};
