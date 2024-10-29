import { io } from "socket.io-client";

const socket = io("https://my-messaging-app-strf.onrender.com", {
  "force new connection": true,
});

export default socket;
