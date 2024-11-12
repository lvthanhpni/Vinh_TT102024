// Carousel.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Carousel() {
    const navigate = useNavigate();

    return (
        <div>
            <h2>This is Carousel</h2>
            <button onClick={() => navigate('/')}>Go to Base</button>
            <button onClick={() => navigate('/Homepage')}>Go to Homepage</button>
        </div>
    );
}

export default Carousel;
