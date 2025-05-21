import { io, Socket } from 'socket.io-client';

const apiDev = process.env.REACT_APP_DEV ?? 'http://localhost:4000';

const apiUrl =
  process.env.REACT_APP_ENVIROMENT === 'production' ? process.env.REACT_APP_PROD : apiDev;

export const socket: Socket = io(apiUrl, {
  reconnection: true, // permite reconectar (pode deixar false se quiser desativar totalmente)
  reconnectionAttempts: 10, // tenta reconectar no máximo 10 vezes
  reconnectionDelay: 3000, // espera 3s entre as tentativas
  timeout: 9000, // tempo limite para considerar a conexão falhou
  transports: ['websocket'], // força o uso apenas de WebSocket (evita fallback para polling)
});
