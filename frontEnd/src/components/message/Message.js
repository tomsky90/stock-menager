import React from 'react';
import './message.css'

const Message = ({status, message}) => {
  
  return ( 
    <div className={`${status} message`}>
      {message}
    </div>
   );
}
 
export default Message;

