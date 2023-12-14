import React from 'react';
import { BASE_URL } from './BackendUrl';

export const TicketItems = (props) => {
    const { Object, Data } = props;

    const book = async (e) => {
        e.preventDefault();
        const response = await fetch(`${BASE_URL}/ticket/saveticket`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authtoken: localStorage.getItem('token'),
            },
            body: JSON.stringify({
                mode: Data,
                name: Object.name,
            }),
        });
        const json = await response.json();
        console.log(json.success);
        if (json.success) {
            if (Data === 'Train') {
                window.open('https://www.irctc.co.in/nget/train-search', '_blank');
            } else if (Data === 'Hotel') {
                window.open(`${Object.url}`, '_blank');
            }
        } else {
            alert('Invalid credentials');
        }
    };

    const stars = Array.from({ length: Object.hotel_class }, (_, index) => (
        <span key={index}>⭐</span>
    ));

    return (
        <div className="container mt-4">
            <div className={`card ${Data === 'Hotel' ? 'mb-3' : 'w-75 mx-auto'}`}>
                <div className="card-body">
                    <h5 className="card-title">{Object.name}</h5>
                    {Data === 'Hotel' && (
                        <>
                            <p className="card-text">
                                Address - {Object.address} {Object.city}
                            </p>
                            <p className="card-text">{stars}</p>
                            <p className="card-text">Description - {Object.hotel_description}</p>
                        </>
                    )}
                    {Data === 'Train' && (
                        <>
                            <p className="card-text">
                                <strong>Departure:</strong> {Object.train_from}, {Object.data.departTime}
                            </p>
                            <p className="card-text">
                                <strong>Arrival:</strong> {Object.train_to}, {Object.data.arriveTime}
                            </p>
                            <p className="card-text">
                                <strong>Classes:</strong> {Object.data.classes.join(', ')}
                            </p>
                        </>
                    )}
                    <button onClick={book} className="btn btn-outline-warning">
                        {Data === 'Hotel' ? 'Book now' : 'Check'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TicketItems;
