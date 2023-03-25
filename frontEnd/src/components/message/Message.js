import React from 'react';

const Message = ({status, message}) => {
  
  return ( 
    <div className={`${status} message`}>
      {message}
    </div>
   );
}
 
export default Message;

