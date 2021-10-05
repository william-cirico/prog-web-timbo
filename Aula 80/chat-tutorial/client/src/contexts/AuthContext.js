import { api } from "../services/api";

const { createContext, useReducer, useContext, useEffect } = require("react");

export const AuthContext = createContext();

const initialState = {
    accessToken: null
};

function reducer(prevState, action) {
    switch (action.type) {
        case "SIGN_IN": 
            return {
                ...prevState,
                accessToken: action.payload
            }
        case "SIGN_OUT":
            return {
                ...prevState,
                accessToken: null
            }
    }
}

export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const accessToken = localStorage.getItem("access-token");

        if (accessToken) {
            api.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
            dispatch({ type: "SIGN_IN", payload: accessToken });
        }
    }, []);

    async function signIn(email, password) {
        try {
            const accessToken = (await api.post("/auth/login", { email, password })).data;

            localStorage.setItem("access-token", accessToken);
            api.defaults.headers["Authorization"] = `Bearer ${accessToken}`;

            dispatch({ type: "SIGN_IN", payload: accessToken });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    function signOut() {
        localStorage.clear();
        api.defaults.headers["Authorization"] = null;

        dispatch({ type: "SIGN_OUT" });
    }

    const authActions = {
        signIn,
        signOut
    };

    return (
        <AuthContext.Provider value={{ accessToken: state.accessToken, authActions }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);