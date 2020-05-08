import IO from 'socket.io-client';
import { socketPort } from '../config';

class Socket {
  constructor(port) {
    this.port = port || 3001;
    const url = `http://localhost:${port}`;
    // this.io = IO(url);
    this.msg = IO(url + '/messages');
  }
}

export default new Socket(socketPort);
