import { createContext, useEffect, useState } from "react";
import authServices from "../services/authServices";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("access-token")); 
    const [role, setRole] = useState(() => {
        if (!accessToken) {
            return null;
        }

        return authServices.getRoleFromAccessToken(accessToken);
    });

    useEffect(() => {        
        async function verifyToken() {
            try {
                await authServices.verifyToken(accessToken);                
            } catch (error) {
                setAccessToken(null);
                setRole(null)
            }
        }

        verifyToken();
    });

    async function signIn(email, password) {
        const { accessToken, refreshToken } = await authServices.login(email, password);

        localStorage.setItem("access-token", accessToken);
        localStorage.setItem("refresh-token", refreshToken);
        
        setAccessToken(accessToken);
        setRole(authServices.getRoleFromAccessToken(accessToken));
    }    

    function signOut() {
        setAccessToken(null);
        setRole(null);
        localStorage.clear();
    }

    return (
        <AuthContext.Provider value={{ accessToken, role, signIn, signOut }}>
          { children }
        </AuthContext.Provider>
    );
}