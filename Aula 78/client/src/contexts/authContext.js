import { createContext, useState } from "react";
import authServices from "../services/authServices";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("access-token")); 

    async function signIn(email, password) {
        const { accessToken } = await authServices.login(email, password);

        localStorage.setItem("access-token", accessToken);
        
        setAccessToken(accessToken);
    }    

    function signOut() {
        setAccessToken(null);
        localStorage.clear();
    }

    return (
        <AuthContext.Provider value={{ accessToken, signIn, signOut }}>
          { children }
        </AuthContext.Provider>
    );
}