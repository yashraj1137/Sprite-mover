// src/Header.js
import React from 'react';

const Header = () => {
    return (
        <header style={headerStyle}>
            <h1 style={{ margin: 0 }}>Sprite Controller</h1>
            <p style={{ margin: 0 }}>Manage your sprites with ease!</p>
        </header>
    );
};

// Header styles
const headerStyle = {
    backgroundColor: '#282c34',
    color: 'white',
    padding: '20px',
    textAlign: 'center',
};

export default Header;