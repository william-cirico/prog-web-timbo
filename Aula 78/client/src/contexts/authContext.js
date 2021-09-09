import { createContext, useEffect, useState } from "react";
import { authServices } from "../services/authServices";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("access-token")); 
    const [role, setRole] = useState(() => {
        const { role } = jwtDecode(accessToken);
        return role;
    });

    async function signIn(email, password) {
        const { accessToken } = await authServices.login(email, password);        

        const { role } = jwtDecode(accessToken);
        setRole(role);

        localStorage.setItem("access-token", accessToken);
        
        setAccessToken(accessToken);
    }

    function signOut() {
        setAccessToken(null);
        localStorage.clear();
    }
    
    useEffect(() => {
        console.log("Verificou o access-token");
        async function verifyToken() {
            try {
                await authServices.verifyToken(accessToken);
            } catch (error) {
                setAccessToken(null);
                setRole(null);
            }            
        }

        verifyToken();
    }, [accessToken]);

    return (
        <AuthContext.Provider value={{ accessToken, role, signIn, signOut }}>
          { children }
        </AuthContext.Provider>
    );
}