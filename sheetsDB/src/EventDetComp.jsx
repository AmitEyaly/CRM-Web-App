import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed } from '@fortawesome/free-solid-svg-icons'

const EventDetComp = () => {
  const [reservations, setReservations] = useState([]);
  const [sandwitches, setSandwitches] = useState(100);
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

  // function roomDevide() {
  //   const particDevide = reservations.map(reservation => reservation.participantsDevesion)
  //   const staffDevide = reservations.map(reservation => reservation.staffDevesion)
  //   console.log(particDevide);
  //   console.log(staffDevide);
  //   const partici = reservations.map(reservation => reservation.participantsAmount / particDevide);
  //   const staff = reservations.map(reservation => reservation.staffAmount / staffDevide);
  //   setParticiRooms(partici);
  //   setStaffRooms(staff);
  //   console.log(particiRooms);
  //   console.log(staffRooms);
    
  // }
  
  function IconDisplay({ icon, count }) {
    const icons = Array.from({ length: count }, (_, index) => (
      <FontAwesomeIcon key={index} icon={icon} style={{ margin: '0 5px' }} /> // Add space between icons
    ));
  
    return <div>{icons}</div>;
  }

  return (
    <div className="container">
      <h1>טופס השלמת פרטי אירוע</h1>
     
      <ul className='row align-text-center'>
        {reservationsState && reservationsState.map(reservation => (
          <div className='col-12' key={reservation._id}>
            <div className='card' style={{ marginTop: "10px", minHeight: "500px", backgroundColor: "lightblue" }}>
              <h2>{reservation.groupName}</h2>
              <div id="carouselFillDetails" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <h4>פרטי ההזמנה</h4>
                    <p>מתחילים ב: {reservation.seminarStartDate} בשעה: <input type="time" defaultValue={reservation.araivleTime}/></p>
                    <p> ומסיימים ב: {reservation.seminarEndDate}  בשעה: <input type="time"defaultValue={reservation.departureTime}/></p>
                    <p>כמות משתתפים/ות סופית: <input type="text" placeholder={reservation.participantsAmount}/></p>
                    <p>כמות צוות סופית: <input type="text" placeholder={reservation.staffAmount} /></p>
                    <p>סהכ משתתפים/ות + צוות: <input type="text" placeholder={reservation.allAmount} /></p>
                    <p>טווח גילאי המשתתפים/ות <input type="text"/></p>
                  </div>
                  <div className="carousel-item">
                    <h4>פירוט כיתות</h4>
                    <p>כיתות ל25-30 אנשים: <input type="text" placeholder={reservation.smallClassesAmount} /> </p>
                    <p>כיתות ל70 אנשים: <input type="text" placeholder={reservation.Classes70Amount} /> </p>
                    <p>כיתת התכנסות ל100 מעלה: <input type="text" placeholder={reservation.gatheringClassesAmount}/> </p>
                    <p>האם תצטרכו מרחבים נוספים לשימוש מלבד הכיתות? אם כן פרטו: <input type="text"/> </p>
                  </div>
                  <div className="carousel-item">
                    <h4>חלוקת חדרים</h4>
                    <FontAwesomeIcon icon={faBed} />
                    <IconDisplay icon={faBed} count={reservation.participantsDevesion} />
                  </div>
                  <div className="carousel-item">
                    <h4>ארוחות</h4>
                    <p>{reservation.meals}</p>
                  </div>
                  <div className="carousel-item">
                    <h4>כריכים</h4>
                    <p>במידה והזמנתם כריכים, פרטו:</p>
                    <p>בשרי: <input type="text"/></p>
                    <p>חלבי: <input type="text"/></p>
                    <p>פרווה: <input type="text"/></p>
                    <p>טבעוני: <input type="text"/></p>
                    <p>ללא גלוטן: <input type="text"/></p>
                    <p>סך הכל: {sandwitches}</p>
                  </div>
                  <div className="carousel-item">
                    <h4>לקראת הגעתכם</h4>
                    <p><input type="text" placeholder="דרכי הגעה" /></p>
                    <p><input type="text"placeholder="מספר רכב להכנסת ציוד בלבד" style={{width:"300px"}}/></p>
                    <p>רשימת משתתפים/ות: <input type="file" className="form-control-file"/></p>
                    <p>לוח הזמנים שלכם: <input type="file" className="form-control-file"/></p>
                  </div>
                </div>
              </div>
              <a className="carousel-control-prev" href="#carouselFillDetails" role="button" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only"></span>
              </a>
              <a className="carousel-control-next" href="#carouselFillDetails" role="button" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only"></span>
              </a>
            </div>
          </div>
        ))}
        {!reservationsState && <p>No cards available.</p>}
      </ul>
      <form action="">
        <div className="row justify-content-center">
          <div className="col-6">
            <div className="card">
              <div className="card-header">
                ארוחות
              </div>
              <div className="card-body">
                <input type="text"
                  placeholder="שם הקבוצה והארגון"
                  style={{ textAlign: "center" }}
                  className="form-control"
                  required />
                <br />
                <input type="number"
                  placeholder="במידה וזו פעם ראשונה שלכם- ח.פ"
                  style={{ textAlign: "center" }}
                  className="form-control"
                  required />
                <br />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="card-header">
                באילו תאריכים אתם מתעניינים? (במידה ואין תאריכים ספציפיים פרטו כמה לילות, האם באמצע/סוף שבוע, חודש מועדף)
              </div>
              <div className="card-body">
                <label htmlFor="" className="form-label">הגעה</label>
                <input type="date"
                  className="form-control"
                  required />
                <br />
                <label htmlFor="" className="form-label">סיום</label>
                <input type="date"
                  className="form-control"
                  required />
                <br />
                <label htmlFor="" className="form-label">הערות</label>
                <input type="text"
                  className="form-control"
                  required />
                <br />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="card-header">לינה</div>
              <div className="card-body">
                <input type="number"
                  placeholder="כמות משתתפים/ות (ללא צוות)"
                  style={{ textAlign: "right" }}
                  className="form-control"
                  required />
                <br />
                <input type="number"
                  placeholder="כמות צוות"
                  style={{ textAlign: "right" }}
                  className="form-control"
                  required />
                <br />
                <input type="number"
                  placeholder="כמות סך הכל"
                  style={{ textAlign: "right" }}
                  className="form-control"
                  required />
                <br />
                <label htmlFor="" className="form-label">חלוקת חדרים- כמה בכל חדר?</label>
                <label htmlFor="" className="form-label">כמה משתתפים/ות בכל חדר?</label>
                <select className="form-select" aria-label="Default select example" required>
                  <option selected></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
                <br />
                <label htmlFor="" className="form-label">כמה צוות בכל חדר?</label>
                <select className="form-select" aria-label="Default select example" required>
                  <option selected></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
                <br />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="card-header">כיתות ואולמות</div>
              <div className="card-body">
                <label htmlFor="">כמה כיתות תצטרכו? באיזה גודל? (פרטו גם אם תצטרכו כיתת התכנסות ואם כן מתי)</label>
                <label htmlFor="" className="form-label">כמות כיתות ל25-30 אנשים</label>
                <input type="number"
                  style={{ textAlign: "right" }}
                  className="form-control"
                  required />
                <br />
                <label htmlFor="" className="form-label">כמות כיתות ל70 אנשים</label>
                <input type="number"
                  style={{ textAlign: "right" }}
                  className="form-control"
                  required />
                <br />
                <label htmlFor="" className="form-label">כמות כיתות להתכנסות של כל הקבוצה</label>
                <input type="number"
                  style={{ textAlign: "right" }}
                  className="form-control"
                  required />
                <br />
                <label htmlFor="" className="form-label">הערות נוספות</label>
                <input type="text"
                  placeholder="הערות נוספות"
                  style={{ textAlign: "right" }}
                  className="form-control"
                  required />
                <br />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="card-header">שעות הגעה וסיום משוערות</div>
              <div className="card-body">
                <label htmlFor="" className="form-label">הגעה</label>
                <input type="time"
                  className="form-control"
                  required />
                <br />
                <label htmlFor="" className="form-label">סיום</label>
                <input type="time"
                  className="form-control"
                  required />
                <br />
                <label htmlFor="" className="form-label">נרצה להזמין יציאה מאוחרת מחדרי הלינה בעלות של 100 שקלים לחדר</label>
                <select className="form-select text-end" aria-label="Default select example" required>
                  <option selected ></option>
                  <option value="true" >כן</option>
                  <option value="false" >לא</option>
                </select>
                <br />
                <input type="number"
                  placeholder="כמות חדרים ליציאה מאוחרת"
                  style={{ textAlign: "right" }}
                  className="form-control" />
                <br />
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="card">
              <div className="card-header text-end"> אילו ארוחות תרצו?</div>
              <div className="card-body">
                <div className="row">
                  <div className="col-3 ">
                    <label htmlFor="" className="form-label">ראשון</label>
                    <div className="form-check">
                      <label className="form-check-label" >
                        בוקר
                      </label>
                      <input className="form-check-input" type="checkbox" value="sundaybreakfast" />
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" >
                        צהריים
                      </label>
                      <input className="form-check-input" type="checkbox" value="sundaylunch" />
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" >
                        ערב
                      </label>
                      <input className="form-check-input" type="checkbox" value="sundaydinner" />
                    </div>
                  </div>
                  <div className="col-3">
                    <label htmlFor="" className="form-label">שני</label>
                    <div className="form-check">
                      <label className="form-check-label" >
                        בוקר
                      </label>
                      <input className="form-check-input" type="checkbox" value="mondaybreakfast" />
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" >
                        צהריים
                      </label>
                      <input className="form-check-input" type="checkbox" value="mondaylunch" />
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" >
                        ערב
                      </label>
                      <input className="form-check-input" type="checkbox" value="mondaydinner" />
                    </div>
                  </div>
                  <div className="col-3">
                    <label htmlFor="" className="form-label">שלישי</label>
                    <div className="form-check">
                      <label className="form-check-label" >
                        בוקר
                      </label>
                      <input className="form-check-input" type="checkbox" value="tuesdaybreakfast" />
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" >
                        צהריים
                      </label>
                      <input className="form-check-input" type="checkbox" value="tuesdaylunch" />
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" >
                        ערב
                      </label>
                      <input className="form-check-input" type="checkbox" value="tuesdaydinner" />
                    </div>
                  </div>
                  <div className="col-3">
                    <label htmlFor="" className="form-label">רביעי</label>
                    <div className="form-check">
                      <label className="form-check-label" >
                        בוקר
                      </label>
                      <input className="form-check-input" type="checkbox" value="wendsdaybreakfast" />
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" >
                        צהריים
                      </label>
                      <input className="form-check-input" type="checkbox" value="wendsdaylunch" />
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" >
                        ערב
                      </label>
                      <input className="form-check-input" type="checkbox" value="wendsdaydinner" />
                    </div>
                  </div>
                  <div className="col-3">
                    <label htmlFor="" className="form-label">חמישי</label>
                    <div className="form-check">
                      <label className="form-check-label" >
                        בוקר
                      </label>
                      <input className="form-check-input" type="checkbox" value="thursdaybreakfast" />
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" >
                        צהריים
                      </label>
                      <input className="form-check-input" type="checkbox" value="thursdaylunch" />
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" >
                        ערב
                      </label>
                      <input className="form-check-input" type="checkbox" value="thursdaydinner" />
                    </div>
                  </div>
                  <div className="col-3">
                    <label htmlFor="" className="form-label">שישי</label>
                    <div className="form-check">
                      <label className="form-check-label" >
                        בוקר
                      </label>
                      <input className="form-check-input" type="checkbox" value="fridaybreakfast" />
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" >
                        צהריים
                      </label>
                      <input className="form-check-input" type="checkbox" value="fridaylunch" />
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" >
                        ערב
                      </label>
                      <input className="form-check-input" type="checkbox" value="fridaydinner" />
                    </div>
                  </div>
                  <div className="col-3">
                    <label htmlFor="" className="form-label">שבת</label>
                    <div className="form-check">
                      <label className="form-check-label" >
                        בוקר
                      </label>
                      <input className="form-check-input" type="checkbox" value="saturdaybreakfast" />
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" >
                        צהריים
                      </label>
                      <input className="form-check-input" type="checkbox" value="saturdaylunch" />
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" >
                        ערב
                      </label>
                      <input className="form-check-input" type="checkbox" value="saturdaydinner" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="card-header text-end">דברים נוספים שתצטרכו?</div>
              <div className="card-body">
                <input type="text"
                  style={{ textAlign: "right" }}
                  className="form-control" />
              </div>
            </div>
          </div>
        </div>
      </form >
      <button><Link to="/">חזרה</Link></button>
    </div>
  )
}

export default EventDetComp
