import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

// https://my-messaging-app-strf.onrender.com

export default socket;
