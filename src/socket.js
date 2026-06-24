import { io } from "socket.io-client";

const socket = io(
  "https://lifeflow-backend-5rm3.onrender.com",
  {
    transports: ["websocket"],
    autoConnect: true
  }
);

socket.on("connect", () => {
  console.log(
    "🔌 Socket Connected:",
    socket.id
  );
});

socket.on("disconnect", () => {
  console.log(
    "❌ Socket Disconnected"
  );
});

socket.on("connect_error", (error) => {
  console.error(
    "🚨 Socket Connection Error:",
    error.message
  );
});

export default socket;