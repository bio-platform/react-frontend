import React, {createContext, useState} from 'react';
import { User } from '../models/User';

export type AuthContextType = {
    user: User | null;
    setUser: (user: User) => void;
    loadingAuthState: boolean;
} | null;

export const AuthContext = createContext<AuthContextType>(null);

type AuthProviderProps = {
    children: React.ReactElement;
}

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loadingAuthState, setLoadingAuthState] = useState(false);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loadingAuthState,
            }}>
            {children}
        </AuthContext.Provider>
    );
};
