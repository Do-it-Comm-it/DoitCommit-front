import { useCallback, useEffect, useState } from 'react';

const SOCKET_URL = 'ws://localhost:8888';

const websocket = new WebSocket(SOCKET_URL);

const useSocket = () => {
  const [socket, setSocket] = useState<WebSocket>(websocket);

  //disconnection event for websocket
  useEffect(() => {
    const onClose = () => {
      setTimeout(() => {
        setSocket(new WebSocket(SOCKET_URL));
      }, 3000);
    };

    socket.addEventListener('close', onClose);

    return () => {
      socket.removeEventListener('close', onClose);
    };
  }, [socket]);

  return socket;
};

//send alarm websocket message custom hook.
export const useSendAlarm = () => {
  const socket = useSocket();

  const sendAlarm = useCallback(
    (message: string) => {
      socket.send(message);
    },
    [socket]
  );

  return sendAlarm;
};

export default useSocket;
