import React, { useState } from 'react';
import Icon from '../images/user.png';

function UserBox(){

    const [nameUser, setNameUser] = useState('');
    return(
        <div className="userInfo">
          <img src={Icon} alt="user_icon" className="avatar_image"/> 
          <p>{nameUser}</p>
          <p>🛒 | </p>
        </div>
    );
}
export default UserBox;