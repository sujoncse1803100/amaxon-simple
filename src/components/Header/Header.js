import React, { Component } from 'react';
import logo from '../../images/logo.png';

const Header = () => {
    
    return (
        <div className="header">
            <img className="header-logo" src={logo} alt="" />
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Review</a>
                <a href="/manage">Manage inventory</a>
            </nav>
        </div>
    );

}

export default Header;