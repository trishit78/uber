import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// eslint-disable-next-line react-refresh/only-export-components
export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('http://localhost:3001');
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;