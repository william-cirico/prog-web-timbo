import { io } from "socket.io-client";

export const socket = io("http://localhost:8080", { autoConnect: false });

socket.onAny((event, ...args) => {
    console.log(event, args);
});