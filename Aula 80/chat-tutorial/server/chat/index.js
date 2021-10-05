const { Server } = require("socket.io");

const io = new Server({ cors: { origin: "http://localhost:3000" } });

const onlineUsers = [];

io.on("connection", (socket) => {  
  const userId = socket.handshake.auth.userId;  
  console.log("O usuário com o ID: " + userId + " se conectou");

  const userAlreadyOnline = onlineUsers.find(user => user === userId);
  if (!userAlreadyOnline) {
    onlineUsers.push(userId);
  }

  socket.emit("online users", onlineUsers);

  socket.on("join chats", chatsIds => {
    chatsIds.forEach(chatId => {
      socket.join(`chat:${chatId}`);
    });
    console.log(socket.rooms);
  });

  socket.on("send message", message => {
    console.log(`Essa mensagem foi recebida: ${JSON.stringify(message, null, 4)}`);
    io.to(`chat:${message.chat_id}`).emit("new message", message);
  });  
});

io.listen(8080);