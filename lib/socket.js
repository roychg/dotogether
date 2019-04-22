const socket = require("socket.io");
module.exports = http => {
  const io = socket(http);

  io.on("connect", socket => {
    // console.log('socket connected')

    socket.on("action", ({ payload }) => {
      switch (payload.type) {
        case "JOIN": {
          // console.log("JOIN CALLED ", payload.room);
          setRoom("join", socket, payload.room);
          break;
        }

        case "LEAVE": {
          // console.log("LEAVE CALLED ", socket.room);
          setRoom("leave", socket, null);
          break;
        }

        default: {
          if (isReorder(payload.type)) {
            // console.log('reorder')
            socket.to(socket.room).emit("action", payload);
          } else {
            io.in(socket.room).emit("action", payload);
          }
        }
      }
    });

    socket.on("disconnect", () => console.log("client disconnected"));
  });
  return io;
};
const setRoom = (type, socket, room) => {
  if (type === "leave") {
    socket.leave(socket.room);
    delete socket.room;
  } else {
    socket.room = room;
    socket.join(room);
  }
};

const isReorder = type => type.split("_")[0] === "REORDER";
