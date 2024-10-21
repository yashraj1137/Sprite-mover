// Sprite.js
import React from 'react';

const Sprite = ({ src, position, rotation, text, isNew }) => {
    return (
        <div style={{ position: 'absolute', left: position.x, top: position.y }}>
            <div style={{ textAlign: 'center', color: 'black', fontWeight: 'bold' }}>
                {text}
            </div>
            <div
                className={`sprite ${isNew ? 'sprite-appear' : ''}`} // Apply animation class for new sprites
                style={{
                    transform: `rotate(${rotation}deg)`,
                }}
            >
                <img src={src} alt="Sprite" style={{ width: '100px', height: '100px' }} />
            </div>
        </div>
    );
};

export default Sprite;
