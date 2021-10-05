import "./styles.css";
import { BsSearch } from 'react-icons/bs';
import { BiSend } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { Chat } from "../../components/Chat";
import { Message } from "../../components/Message";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { socket } from "../../services/chat";

export function ChatPage() {
    const { authActions } = useAuth();
    const messagesRef = useRef(null);

    const [currentUser, setCurrentUser] = useState(null); 
    const [currentChat, setCurrentChat] = useState(null);
    const [chats, setChats] = useState([]);  
    const [messages, setMessages] = useState([]); 
    const [inputMessage, setInputMessage] = useState("");   
    const [, updateState] = useState({});


    updateState({});

    useEffect(() => {
        async function getUser() {
            try {
                const user = (await api.get("/users/me")).data;

                socket.auth = { userId: user.id };
                socket.connect();
                setCurrentUser(user);
            } catch (error) {
                console.log(error);
                if (error.response.status === 401) {
                    authActions.signOut();
                }
            }
        }

        async function getChats() {
            try {
                const chats = (await api.get("/chats")).data;

                const chatsIds = chats.map(chat => chat.id);
                socket.emit("join chats", chatsIds);
                setChats(chats);
            } catch (error) {
                console.log(error);
            }
        }

        getUser();
        getChats();

        socket.on("new message", message => {
            console.log(`Mensagem recebida: ${JSON.stringify(message)}`);
            setMessages(prevMessages => [...prevMessages, message]);
            messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight);
        });

        socket.on("online users", onlineUsers => {
            console.log("Os usuários online: ", onlineUsers);
        });
        
        return () => {
            socket.off("new message");
            socket.off("online users");
        }
    }, []);    
    
    async function openMessagesFromChat(chatId) {
        try {
            const messages = (await api.get(`/messages/${chatId}`)).data;            
            setMessages(messages);
            messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight);
            setCurrentChat(chatId);
        } catch (error) {
            console.log(error);
        }
    }

    async function sendMessage(e) {
        e.preventDefault();

        if (!currentChat) return;

        try {
            const message = (await api.post(`/messages`, { 
                message: inputMessage, 
                chatId: currentChat 
            })).data;            

            socket.emit("send message", message);            
            setInputMessage("");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container-chat">
            <div className="chats-list">
                <header className="chats-list__header">
                    <h2>{currentUser?.name}</h2>
                    <button onClick={() => authActions.signOut()}>Sign Out</button>
                </header>
                <form className="search-user__form">
                    <input type="text" placeholder="Procurar usuário" />
                    <button><BsSearch /></button>
                </form>
                {
                    chats.map(chat => {
                        const chatName = chat.name ? 
                            chat.name : 
                            chat.users[0]?.id === currentUser?.id ?
                            chat.users[1]?.name :
                            chat.users[0]?.name;

                        return (
                            <Chat 
                                key={chat.id}
                                chatName={chatName} 
                                lastMessage={chat.lastMessage?.message} 
                                date={chat.lastMessage?.createdAt} 
                                onClick={() => openMessagesFromChat(chat.id)}
                            />
                        )
                    })
                }
            </div>
            <div className="chat-message">
                <ul className="chat-message__messages" ref={messagesRef}>
                    { 
                        messages.map(message => {
                            const self = message.user_id === currentUser?.id;

                            return <Message key={message.id} self={self} message={message.message} date={message.createdAt} />
                        })
                    }
                </ul>
                <form className="chat-message__form" onSubmit={sendMessage}>
                    <input 
                        placeholder="Digite sua mensagem" 
                        value={inputMessage} 
                        onChange={e => setInputMessage(e.target.value)} />
                    <button><BiSend /></button>
                </form>
            </div>
        </div>
    )
}