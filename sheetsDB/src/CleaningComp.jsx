import React from 'react'
import { useState } from 'react';

const CleaningComp = () => {
    const rooms = Array.from({ length: 30 }, (_, i) => ({
        roomNumber: `Room ${i + 1}`,
        bedsNeedingSheets: Math.floor(Math.random() * 9), // Random number of beds needing sheets (0-8)
    }));
    const [clickedRooms, setClickedRooms] = useState({});

    const changeColor = (roomNumber) => () => {
        setClickedRooms((prev) => ({
            ...prev,
            [roomNumber]: prev[roomNumber] === 'blue' ? 'red' : 'blue',
        }));
    };

    return (
        <div>
            <h2>Rooms to be Cleaned</h2>
            <div className='container'>
                <div className='row'>
                    {rooms.map((room, index) => (
                        <div className='col-3' key={index}>
                            <button
                                className='card'
                                style={{
                                    backgroundColor: clickedRooms[room.roomNumber] || 'red',
                                    margin: '10px',
                                }}
                                onClick={changeColor(room.roomNumber)}
                            >
                                {room.roomNumber} - Beds: {room.bedsNeedingSheets}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CleaningComp
