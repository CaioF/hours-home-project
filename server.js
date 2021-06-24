const express = require('express');
const app = express();
const server = require('http').createServer(app);

const dev = process.env.NODE_ENV !== 'production';
const next = require('next');
const next_app = next({dev});
const next_handler = next_app.getRequestHandler();

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

next_app.prepare().then(() => {

  app.use(express.json());

  app.get('*', (req, res) => {
    return next_handler(req, res);
  })

  let users = [];
  let sessionID;
  io.on('connection', (socket) => {

    socket.on('addUser', (data) => {
      sessionID = data.session_id;
      socket.join(`${sessionID}`);

      users.push({ session_id: sessionID, id: socket.id, userName: data.user_name });
      users = users.filter( user => String(user.session_id) == String(sessionID))

      io.to(`${sessionID}`).emit('users', JSON.stringify(users));
    });

    socket.on('message', (msg) => {
      io.to(`${sessionID}`).emit('getMessage', msg);
    });

    socket.once('disconnect', () => {
      let index = -1;
      if (users.length >= 0) {
        index = users.findIndex(e => e.id == socket.id);
      }
      if (index >= 0)
        users.splice(index, 1);
      io.to(`${sessionID}`).emit('users', JSON.stringify(users));
    });
  });

  const port = process.env.PORT || 3001;
  server.listen(port, () => console.log(`Listening on port ${port}`));
})


