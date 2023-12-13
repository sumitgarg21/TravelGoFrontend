import React from 'react';

export const Cityitem = (props) => {
    const { item } = props;

    const handleClick = () => {
        // Perform the same action as clicking the "Explore" button
        window.location.href = item.explore_link;
    };

    return (
        <a href={item.explore_link} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div
                className="card mx-md-4 my-3"
                style={{
                    color: 'white',
                    position: 'relative',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    overflow: 'hidden', // Ensure smooth corners with overflow hidden
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Increased shadow effect
                    transition: 'transform 0.2s ease-in-out', // Added transition for the zoom effect
                }}
                onClick={handleClick}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                <img
                    src={item.image_url}
                    className="card-img-top"
                    alt="cityimage"
                    style={{
                        height: '200px',
                        objectFit: 'cover',
                        filter: 'brightness(70%)',
                        borderTopLeftRadius: '8px',
                        borderTopRightRadius: '8px',
                    }}
                />
                <div className="card-img-overlay">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                </div>
            </div>
        </a>
    );
};
