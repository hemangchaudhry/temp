import React, { useContext } from 'react'
import  {SocketContext} from '../SocketContext';

const UserDetails = () => {
    const {  onlineUsers } = useContext(SocketContext);

    console.log('online users', onlineUsers)
  return (
    <div>
        <h1>Welcome in Jai Info Pvt. Ltd</h1>
    </div>
  )
}

export default UserDetails