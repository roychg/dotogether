// Socket IO middleware

const socketMiddleWare = socket => store => {
  socket.on("action", store.dispatch);
  return next => action => {
    if (action.meta && action.meta.server) {
      socket.emit("action", action);
    }
    return next(action);
  };
};

export default socketMiddleWare;
