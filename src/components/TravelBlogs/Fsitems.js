import React, { useState } from 'react';
import { BASE_URL } from '../BackendUrl';

export const Fsitems = (props) => {
    const { Object } = props;
    const airline = useState(Object.airline.name ? Object.airline.name.replace(/\b\w/g, char => char.toUpperCase()) : Object.codeshared.airline.name.replace(/\b\w/g, char => char.toUpperCase()));
    const arrival = (Object.arrival.iataCode).toUpperCase();
    const departure = (Object.departure.iataCode).toUpperCase();

    function calculateTimeDifference(startTime, endTime) {
        const startHours = parseInt(startTime.split(':')[0], 10);
        const startMinutes = parseInt(startTime.split(':')[1], 10);

        const endHours = parseInt(endTime.split(':')[0], 10);
        const endMinutes = parseInt(endTime.split(':')[1], 10);

        // Convert hours and minutes to minutes
        const startTotalMinutes = startHours * 60 + startMinutes;
        const endTotalMinutes = endHours * 60 + endMinutes;

        // Calculate time difference in minutes
        let timeDiffMinutes = endTotalMinutes - startTotalMinutes;

        // Handle negative time difference (assuming endTime is always greater)
        if (timeDiffMinutes < 0) {
            timeDiffMinutes += 24 * 60; // Add 24 hours in minutes
        }

        // Convert time difference back to hours and minutes
        const timeDiffHours = Math.floor(timeDiffMinutes / 60);
        const remainingMinutes = timeDiffMinutes % 60;

        return `${timeDiffHours} hours ${remainingMinutes} minutes`;
    }

    const book = async (e) => {
        e.preventDefault();
        const response = await fetch(`${BASE_URL}/ticket/saveticket`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authtoken": localStorage.getItem('token')
            },
            body: JSON.stringify({
                mode: "Flight",
                name: `${airline[0]}, ${departure}-${arrival}`
            })
        });
        await response.json();
    };

    return (
        <div>
            <div className="container shadow mb-3 bg-body rounded card w-75">
                <div className="card-body">
                    <div className="text-center card-title fs-4">{airline}</div>
                    <br />
                    <div className="fs-5">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="fw-bold">{departure},&nbsp;{Object.departure.scheduledTime}</div>
                            <div className="fw-bold">{arrival},&nbsp;{Object.arrival.scheduledTime}</div>
                        </div>
                        <div className="text-center fs-6">
                            {calculateTimeDifference(Object.departure.scheduledTime, Object.arrival.scheduledTime)}
                        </div>
                    </div>
                    <button onClick={book} className="btn btn-outline-warning" style={{ width: "150px" }}>VIEW PRICES</button>
                </div>
            </div>
        </div>
    )
};
