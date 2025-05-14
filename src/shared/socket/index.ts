import { io, Socket } from 'socket.io-client';

const apiDev = process.env.REACT_APP_DEV ?? 'http://localhost:4000';

const apiUrl =
  process.env.REACT_APP_ENVIROMENT === 'production' ? process.env.REACT_APP_PROD : apiDev;

export const socket: Socket = io(apiUrl);
