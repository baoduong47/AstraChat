import { io } from "socket.io-client";

const socket = io("http://localhost:8000", {
  "force new connection": true,
});

// https://my-messaging-app-strf.onrender.com

export default socket;
