import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const ReservationsComp = () => {
    const [reservations, setReservations] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const reservationsState = useSelector(state => state.reservations);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('http://localhost:1913/reservations')
            .then(response => {
                console.log(response.data);
                console.log('data fetched');
                setReservations(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the reservations!', error.message);
            });
    }, []);

    useEffect(() => {
        dispatch({ type: 'SETRESERVATIONS', payload: reservations });
    }, [dispatch, reservations]);

    const handleCheckboxChange = (reservationId, checkboxType, checked) => {
        console.log(reservationId, checkboxType, checked);
        const updateCheck = checked;
        console.log(updateCheck);

        setReservations(reservations.map(reservation => {
            if (reservation._id === reservationId) {
                return {
                    ...reservation,
                    [checkboxType]: updateCheck  // Dynamically update the correct property
                };
            }
            return reservation;
        }))
    };

    const saveChanges = () => {
        console.log('Reservations with updated status:', reservations);
    };

    const moveToOperations = (e) => {
        if (window.confirm('אירוע זה יועבר לתפעול')) {
            setReservations(reservations.map(reservation => {
                const id = e.target.value;
               
                if (reservation._id === id) {
                    return {
                        ...reservation,
                        status: "operations",
                    };
                }
                console.log(reservation);
                console.log(reservation.status);
                return reservation;
            }));
        }
        else {
            console.log('canceled');
        }
    };

    const filterSerch = (e) => {
        console.log(e.target.value);
        setSearchInput(e.target.value); 
    }

    const filteredCards = searchInput 
    ? reservations.filter(reservation =>
        reservation.groupName.toLowerCase().includes(searchInput.toLowerCase()) ||
        reservation.seminarStartDate.includes(searchInput) ||
        reservation.seminarEndDate.includes(searchInput)
    )
    : reservations;

    return (
        <div className='container'>
            <div className='header text-center row'>
                <h1 className='navcolors2 card-header'>Reservations Dash Board</h1>
                <nav className="navbar navbar-expand-lg bg-body-iteriary" style={{ Color: "#FAF9F6" }}>
                    <div className="container-fluid">
                        <button className='navbar-brand btn-outline' onClick={saveChanges} style={{ backgroundColor: "#55c2da", marginLeft: "5px" }}>Save</button>
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={filterSerch}></input>   
                    </div>
                </nav>
            </div>
            <ul className='row'>
                {filteredCards && filteredCards.map(reservation => (
                    <div className='col' key={reservation._id}>
                        <div className='card' style={{marginTop: "10px"}}>
                            <div className='card-header'>
                                <span>{reservation.groupName}</span>
                            </div>
                            <div className='card-body'>
                                <span>{reservation.contactName}</span>
                                <span> {reservation.contactPhone} </span>
                                <div className="form-check form-switch">
                                    <label className="form-check-label" >
                                        הוזמנו כיתות
                                    </label>
                                    <input
                                        onChange={(e) => handleCheckboxChange(reservation._id, 'classRoomsSaved', e.target.checked)}
                                        checked={reservation.classRoomsSaved}
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id={reservation._id}
                                    />
                                </div>
                                <div className="form-check form-switch">
                                    <label className="form-check-label" >
                                        הצעת מחיר נשלחה
                                    </label>
                                    <input
                                        onChange={(e) => handleCheckboxChange(reservation._id, 'offerSent', e.target.checked)}
                                        checked={reservation.offerSent}
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id={reservation._id}
                                    />
                                </div>
                                <div className="form-check form-switch">
                                    <label className="form-check-label" >
                                        הצעת מחיר חתומה
                                    </label>
                                    <input
                                        onChange={(e) => handleCheckboxChange(reservation._id, 'signed', e.target.checked)}
                                        checked={reservation.signed}
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id={reservation._id}
                                    />
                                </div>
                                <div className='card-footer'> 
                                    <button className='btn' 
                                    onClick={moveToOperations}
                                    value={reservation._id} 
                                    style={{ backgroundColor: "#ffbd03" }} >העברה לתפעול</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {!filteredCards && <p>No cards available.</p>}
            </ul>
            <h1>To Do Lists</h1>
            <div className='row' >
                <div className='col' >
                    <div className='card' style={{ background: "#33b249" }}>
                        <div className='card-header'>
                            <h3 style={{ color: "#FAF9F6" }}>כיתות להזמנה</h3>
                        </div>
                        <div className='card-body'>
                            {reservationsState.filter(reservation => reservation.classRoomsSaved == false).map(reservation => (
                                <div key={reservation._id}>
                                    <h6>{reservation.groupName}:
                                        <br />
                                        {reservation.seminarEndDate} - {reservation.seminarStartDate}</h6>
                                    <li>כיתות קטנות: {reservation.smallClassesAmount}</li>
                                    <li>כיתות עד 70: {reservation.Classes70Amount}</li>
                                    <li>כיתות התכנסות: {reservation.gatheringClassesAmount}</li>
                                    <br />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='col' >
                    <div className='card' style={{ backgroundColor: "#a881af" }}>
                        <div className='card-header'>
                            <h3 style={{ color: "#FAF9F6" }}>להכין הצעת מחיר</h3>
                        </div>
                        <div className='card-body'>
                            {reservationsState.filter(reservation => reservation.offerSent == false).map(reservation => (
                                <div key={reservation._id}>
                                    <li><h6>{reservation.groupName}</h6></li>
                                    <span> {reservation.seminarEndDate}- {reservation.seminarStartDate} </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='col' >
                    <div className='card' style={{ backgroundColor: "#FAF9F6" }}>
                        <div className='card-header'>
                            <h3>ממתין לחתימה</h3>
                        </div>
                        <div className='card-body'>
                            {reservationsState.filter(reservation => reservation.offerSent == true && reservation.signed == false).map(reservation => (
                                <div key={reservation._id}>
                                    <li>{reservation.groupName}</li>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReservationsComp;