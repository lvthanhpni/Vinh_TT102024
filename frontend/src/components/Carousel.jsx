// Carousel.jsx
import React from 'react';

function Carousel() {
    return ( // Added the return statement here
        <div id="carousel" className="carousel slide" data-bs-ride="carousel">
            {/* Indicators/dots */}
            <div className="carousel-indicators">
                <button
                    type="button"
                    data-bs-target="#carousel"
                    data-bs-slide-to="0"
                    className="active"
                    style={{ backgroundColor: 'black', height: '16px', width: '16px', borderRadius: '50%' }}
                ></button>
                <button
                    type="button"
                    data-bs-target="#carousel"
                    data-bs-slide-to="1"
                    style={{ backgroundColor: 'black', height: '16px', width: '16px', borderRadius: '50%' }}
                ></button>
                <button
                    type="button"
                    data-bs-target="#carousel"
                    data-bs-slide-to="2"
                    style={{ backgroundColor: 'black', height: '16px', width: '16px', borderRadius: '50%' }}
                ></button>
            </div>

            {/* The slideshow/carousel */}
            <div className="row" style={{ height: '700px' }}>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="container mt-3">
                            <img
                                src="/static/Resources/Model.png"
                                alt="Model"
                                className="mx-auto d-block"
                                style={{ width: '75%' }}
                            />
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="container mt-3 text-center">
                            <img
                                src="/static/Resources/Star.png"
                                alt="Star"
                                className="mx-auto d-block"
                                style={{ width: '60%', maxWidth: '100%' }}
                            />
                            <button type="button" className="btn btn-primary">
                                <a href="/EOB/Member" style={{ color: 'white' }}>
                                    Đăng ký
                                </a>
                            </button>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="container mt-3 text-center">
                            <img
                                src="/static/Resources/Product.png"
                                alt="Product"
                                className="mx-auto d-block"
                                style={{ width: '60%', maxWidth: '100%' }}
                            />
                            <button type="button" className="btn btn-primary">
                                <a href="/EOB/VLXD" style={{ color: 'white' }}>
                                    Đăng ký
                                </a>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Carousel;
