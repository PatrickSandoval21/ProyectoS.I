import React from 'react';
import Logo from '../images/favicon.png'
import '../styles/Header.css'
import UserBox from './UserBox';
import RoutesLinks from './RoutesLinks';

function Header(){
    return(
        <div className = "header">
            <div className="restaurantTitle">
                <img src={Logo} alt="logo" className="logo" />;
                <h1 className ="restaurantName">FASTFOOD RESTAURANT</h1>
                
            </div>
            <RoutesLinks/>
            <UserBox/>
        </div>
    );
}
export default Header;