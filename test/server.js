// server.js
/*** attach Socket.io 
to our HTTP server ***/
var io = require('socket.io').listen(1337);

// handle incoming connections from clients

// handle incoming connections from clients
io.sockets.on('connection', function(socket) {
    
    /**
    * once a client has connected, we expect to get a ping from them saying what room they want to join
    * or ... make e'm a new one 
    */
    socket.on('initialization', function(room) {
        room = room || 'room__' + socket.id;
        socket.join(room);
        console.log('connected: ' + socket.id);
        socket.emit('initialization', {roomId: room, remoteId: socket.id});
    });
    
	/**
	 * tell everyone!
	 */
	socket.on('transmission', function(data) {
		// if(data.roomId) console.log(JSON.stringify(data));
		if (data.type == 'score'){
		io.sockets.in(data.roomId).emit('score', data);
		return;
		}
		if(data.roomId) io.sockets.in(data.roomId).emit('transmission', data);
	});

	/**
	 * disconnecting ghost the player,
	 */
	socket.on('disconnect', function() {
		// tell others he's out same room
		if(socket.room) io.sockets.in(socket.roomId).emit('ghosted', {remoteId: socket.id});
		console.log("disconnecting: "+socket.id);
	});
    
});