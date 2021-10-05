import { useAuth } from "../contexts/AuthContext";
import { ChatPage } from "../pages/ChatPage";
import { LoginPage } from "../pages/LoginPage";

export function Routes() {
    const { accessToken } = useAuth();

    return (
        <>
            {
                accessToken ?
                <ChatPage /> :
                <LoginPage />
            } 
        </> 
    );
}