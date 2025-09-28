import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CleaningComp from './CleaningComp';

const OperationsComps = () => {
  const reservationsState = useSelector(state => state.reservations);
  const upcomingWeekState = useSelector(state => state.upcomingWeek);
  const [upcomingWeek, setupcomingWeek] = useState([]);
  const dispatch = useDispatch();
  const getCurrentDate = () => {
    const currentDate = new Date();
    const nextSunday = new Date(currentDate);
    nextSunday.setDate(currentDate.getDate() + (7 - currentDate.getDay()));
    const startOfWeek = nextSunday;
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    // Get the date in YYYY-MM-DD format
    const weekStart = startOfWeek.toISOString().split('T')[0];
    const weekEnd = endOfWeek.toISOString().split('T')[0];
    setupcomingWeek([weekStart, weekEnd]);
  };

  useEffect(() => {
    getCurrentDate();
    dispatch({ type: 'UPCOMING_WEEK', payload: upcomingWeek });
  }, []);


  return (
    <div className='container'>
      <div className='header text-center row'>
        <h1 className='navcolors2 card-header'> Operations Dash Board </h1>
        <nav className="navbar navbar-expand-lg bg-body-itertiary" style={{ Color: "#FAF9F6" }}>
          <div className="container-fluid">
            <button className='navbar-brand btn-outline' style={{ backgroundColor: "#55c2da", marginLeft: "5px" }} type="submit">Search</button>
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
          </div>
        </nav>
      </div>
      <h1>To Do Lists</h1>
      <div className='row' >
        <div className='col' >
          <div className='card' style={{ background: "#33b249" }}>
            <div className='card-header'>
              <h3 style={{ color: "#FAF9F6" }}>ארוחות להזמנה בשבוע הבא: </h3>
            </div>
            <div className='card-body'>
              <h5>בין התאריכים:</h5>
              {upcomingWeekState && upcomingWeekState.map(week => (
                <div key={week.id}>
                  <h5>{week}</h5>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='row' >
        <div className='col' >
          <div className='card' style={{ backgroundColor: "#a881af" }}>
            <div className='card-header'>
              <h3 style={{ color: "#FAF9F6" }}>סידור ניקיון</h3>
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
      <CleaningComp></CleaningComp>
    </div>
  )
}

export default OperationsComps
