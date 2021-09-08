import { AuthContext } from "../contexts/authContext";
import { useContext } from "react";

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}