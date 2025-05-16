import { io, Socket } from 'socket.io-client';

const apiDev = process.env.REACT_APP_DEV ?? 'http://localhost:4000';

const apiUrl =
  process.env.REACT_APP_ENVIROMENT === 'production' ? process.env.REACT_APP_PROD : apiDev;

export const socket: Socket = io(apiUrl, {
  reconnection: true, // permite reconectar (pode deixar false se quiser desativar totalmente)
  reconnectionAttempts: 3, // tenta reconectar no máximo 3 vezes
  reconnectionDelay: 2000, // espera 2s entre as tentativas
  timeout: 5000, // tempo limite para considerar a conexão falhou
  transports: ['websocket'], // força o uso apenas de WebSocket (evita fallback para polling)
});
