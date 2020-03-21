import React from 'react'

const SocketContext: React.Context<SocketIOClient.Socket | null> = React.createContext<SocketIOClient.Socket | null>(null)

export default SocketContext