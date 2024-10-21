import React, { useState } from 'react';
import Sprite from './component/Sprite';
import Header from './Header';
import './styles.css';

const App = () => {
    const [sprites, setSprites] = useState([]);
    const [selectedSpriteIndex, setSelectedSpriteIndex] = useState(null);
    const [steps, setSteps] = useState(10);
    const [message, setMessage] = useState('');
    const [userText, setUserText] = useState('');
    const [background, setBackground] = useState('#e9ecef'); // Default background

    const backgroundOptions = [
        { name: 'Light Gray', value: '#e9ecef' },
        { name: 'Pale Blue', value: '#d1e7fd' },
        { name: 'Mint Green', value: '#d1f0d1' },
        { name: 'Peach', value: '#ffe5d1' },
        { name: 'Lavender', value: '#e4d1f0' },
    ];

    const addSprite = () => {
        const newSprite = {
            id: Date.now(),
            src: 'https://www.stemdetectivelab.com/wp-content/uploads/2019/07/scratch-mascot.png',
            position: { x: 200, y: 200 },
            rotation: 0,
            text: '',
            spriteBackground: '#ffffff', // Default sprite background
        };
        setSprites([...sprites, newSprite]);
        setMessage('Sprite added!');
    };

    const handleMove = (dx, dy) => {
        if (selectedSpriteIndex === null) return;
        const updatedSprites = [...sprites];
        const sprite = updatedSprites[selectedSpriteIndex];
        sprite.position = {
            x: sprite.position.x + dx * steps,
            y: sprite.position.y + dy * steps,
        };
        setSprites(updatedSprites);
        setMessage(`Moved sprite ${dx > 0 ? 'right' : dx < 0 ? 'left' : dy > 0 ? 'down' : 'up'}`);
    };

    const handleRotate = (angle) => {
        if (selectedSpriteIndex === null) return;
        const updatedSprites = [...sprites];
        const sprite = updatedSprites[selectedSpriteIndex];
        sprite.rotation = (sprite.rotation + angle) % 360;
        setSprites(updatedSprites);
        setMessage(`Rotated sprite by ${angle} degrees`);
    };

    const handleTextChange = (e) => {
        setUserText(e.target.value);
        if (selectedSpriteIndex !== null) {
            const updatedSprites = [...sprites];
            updatedSprites[selectedSpriteIndex].text = e.target.value;
            setSprites(updatedSprites);
        }
    };

    const handleBackgroundChange = (color) => {
        setBackground(color);
    };

    const handleSpriteBackgroundChange = (color) => {
        if (selectedSpriteIndex !== null) {
            const updatedSprites = [...sprites];
            updatedSprites[selectedSpriteIndex].spriteBackground = color;
            setSprites(updatedSprites);
            setMessage(`Sprite background changed!`);
        }
    };

    // Function to delete the selected sprite
    const deleteSprite = () => {
        if (selectedSpriteIndex === null) return;
        const updatedSprites = sprites.filter((_, index) => index !== selectedSpriteIndex);
        setSprites(updatedSprites);
        setSelectedSpriteIndex(null);
        setMessage('Sprite removed!');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: background }}>
            <Header />
            <div style={{ display: 'flex', flexGrow: 1, padding: '20px' }}>
                <div style={{ padding: '20px', borderRight: '1px solid #ccc', width: '250px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
                    <h3 style={{ textAlign: 'center' }}>Sprite Control</h3>
                    <button onClick={addSprite} className="button">Add Sprite</button>

                    {/* Button to delete the selected sprite */}
                    <button
                        onClick={deleteSprite}
                        className="button"
                        disabled={selectedSpriteIndex === null}
                        style={{ backgroundColor: selectedSpriteIndex === null ? '#ccc' : '#dc3545' }}
                    >
                        Remove Sprite
                    </button>

                    {/* Background Selection */}
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="background">Select Background:</label>
                        <select
                            id="background"
                            onChange={(e) => handleBackgroundChange(e.target.value)}
                            style={{ marginLeft: '10px', borderRadius: '5px', border: '1px solid #ccc', padding: '5px' }}
                        >
                            {backgroundOptions.map((option) => (
                                <option key={option.value} value={option.value}>{option.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Sprite Background Selection */}
                    {selectedSpriteIndex !== null && (
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="spriteBackground">Change Sprite Background:</label>
                            <select
                                id="spriteBackground"
                                onChange={(e) => handleSpriteBackgroundChange(e.target.value)}
                                style={{ marginLeft: '10px', borderRadius: '5px', border: '1px solid #ccc', padding: '5px' }}
                            >
                                {backgroundOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.name}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="steps">Move by steps:</label>
                        <input
                            type="number"
                            id="steps"
                            value={steps}
                            onChange={(e) => setSteps(Number(e.target.value))}
                            style={{ marginLeft: '10px', width: '60px', borderRadius: '5px', border: '1px solid #ccc', padding: '5px' }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {['right', 'left', 'down', 'up'].map((direction) => (
                            <button key={direction} onClick={() => handleMove(direction === 'right' ? 1 : direction === 'left' ? -1 : 0, direction === 'down' ? 1 : direction === 'up' ? -1 : 0)} className="button">
                                Move {direction.charAt(0).toUpperCase() + direction.slice(1)}
                            </button>
                        ))}
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="rotation">Rotate by degrees:</label>
                        <select id="rotation" onChange={(e) => handleRotate(Number(e.target.value))} style={{ marginLeft: '10px', borderRadius: '5px', border: '1px solid #ccc', padding: '5px' }}>
                            <option value="0">Select angle</option>
                            {[15, 30, 45, 60, 90, 180, 360].map(angle => (
                                <option key={angle} value={angle}>{angle}°</option>
                            ))}
                        </select>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="userText">Sprite says:</label>
                        <input
                            type="text"
                            id="userText"
                            value={userText}
                            onChange={handleTextChange}
                            placeholder="Type a message"
                            style={{ marginLeft: '10px', width: '150px', borderRadius: '5px', border: '1px solid #ccc', padding: '5px' }}
                        />
                    </div>
                    <div style={{ marginTop: '10px', color: 'green', textAlign: 'center' }}>{message}</div>
                </div>
                <div style={{ position: 'relative', flexGrow: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '10px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
                    {sprites.map((sprite, index) => (
                        <div key={sprite.id} style={{ display: 'inline-block', margin: '10px', position: 'relative', backgroundColor: sprite.spriteBackground, borderRadius: '8px', padding: '10px' }}>
                            <Sprite
                                src={sprite.src}
                                position={sprite.position}
                                rotation={sprite.rotation}
                                text={sprite.text}
                            />
                            <button
                                onClick={() => {
                                    setSelectedSpriteIndex(index);
                                    setUserText(sprite.text);
                                }}
                                className={`button ${selectedSpriteIndex === index ? 'active' : ''}`}
                            >
                                Select
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;
