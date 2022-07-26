const PORT = 5000;
const io = require('socket.io')(PORT, {
    cors: {
        origin: '*'
    }
});

let users = [];

const addusers = (userId, socketId) => {
    !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
}

const removeusers = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId)
}

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

io.on('connection', function (socket) {
    // console.log(socket);
    // take userid and userid from user

    socket.on('addUser', (userId) => {
        addusers(userId, socket.id);
        io.emit('getusers', users);
    })

    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
        });
    });


    io.on('disconnect', function (socket) {
        console.log('disconnect');
        removeusers(socket.id);
        io.emit('getusers', users);
    })
})


console.log('socket io listening on port ' + PORT);



