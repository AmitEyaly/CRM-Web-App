import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

const PricingComp = () => {
  const [newReservation, setnewReservation] = useState({
    contactName: '',
    contactPhone: '',
    contactMail: '',
    contactRole: '',
    groupName: '',
    groupId: '',
    seminarStartDate:'',
    seminarEndDate: '',
    seminarDateNote: '',
    participantsAmount: '',
    staffAmount: '',
    allAmount: '',
    participantsDevesion: '',
    staffDevision: '',
    smallClassesAmount: '',
    Classes70Amount: '',
    gatheringClassesAmount:'',
    araivleTime: '',
    departureTime: '',
    lateDeparture: '',
    lateAmount:0,
    meals: [],
    other: ''
});

  const handleChange = (e) => {
    const { id, value } = e.target;
    const parsedValue = id === 'participantsAmount' || id === 'staffAmount' || id === 'allAmount' || id === 'smallClassesAmount' || id === 'seven0ClassesAmount' || id === 'gatheringClassesAmount' || id === 'lateAmount' ? parseInt(value) || 0 : value; // Parse to integer, default 0
    setnewReservation(prevUser => ({
        ...prevUser,
        [id]: parsedValue
    }));
    console.log(newReservation);

};
const handleMealChange = (e) => {
  const { value, checked } = e.target;
  setnewReservation(prevUser => {
      const updatedMeals = checked
          ? [...prevUser.meals, value] // Add meal if checked
          : prevUser.meals.filter(meal => meal !== value); // Remove meal if unchecked
      return { ...prevUser, meals: updatedMeals };
  });
};



const submitReservation = async (e) => {
    e.preventDefault();
    console.log(newReservation);
    try {
        // Make a POST request to the API endpoint using Axios
        // let token = sessionStorage.getItem('token');
        const response = await axios.post('http://localhost:1913/clients',
            newReservation,
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                    // ,
                    // 'Authorization': token
                }
            })
        console.log(response.data);
    } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error logging in:', error);
    }
}

  return (
    <div className="container">
      <h1>טופס בקשה להצעת מחיר</h1>
      <form action="">
        <div className="row justify-content-center">
          <div className="col-6">
            <div className="card">
              <div className="card-header">
                פרטי אש/ת קשר
              </div>
              <div className="card-body">
                <input type="text"
                  id= "contactName"
                  onChange={handleChange}
                  placeholder="שם"
                  style={{ textAlign: "center" }}
                  className="form-control"
                  required />
                <br />
                <input type="tel"
                id="contactPhone"
                onChange={handleChange}
                  placeholder="טלפון"
                  style={{ textAlign: "center" }}
                  className="form-control"
                  required />
                <br />
                <input type="email"
                id="contactMail"
                onChange={handleChange}
                  placeholder="מייל"
                  style={{ textAlign: "center" }}
                  className="form-control"
                  required />
                <br />
                <input type="text"
                id="contactRole"
                onChange={handleChange}
                  placeholder="תפקיד"
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
                פרטי הקבוצה
              </div>
              <div className="card-body">
                <input type="text"
                id="groupName"
                onChange={handleChange}
                  placeholder="שם הקבוצה והארגון"
                  style={{ textAlign: "center" }}
                  className="form-control"
                  required />
                <br />
                <input type="number"
                id="groupId"
                onChange={handleChange}
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
                id="seminarStartDate"
                onChange={handleChange}
                  className="form-control"
                  required />
                <br />
                <label htmlFor="" className="form-label">סיום</label>
                <input type="date"
                id="seminarEndDate"
                onChange={handleChange}
                  className="form-control"
                  required />
                <br />
                <label htmlFor="" className="form-label">הערות</label>
                <input type="text"
                id="seminarDateNote"
                onChange={handleChange}
                  className="form-control"
                  defaultValue={''} />
                <br />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="card-header">לינה</div>
              <div className="card-body">
                <input type="number"
                id="participantsAmount"
                onChange={handleChange}
                  placeholder="כמות משתתפים/ות (ללא צוות)"
                  style={{ textAlign: "right" }}
                  className="form-control"
                  required />
                <br />
                <input type="number"
                id="staffAmount"
                onChange={handleChange}
                  placeholder="כמות צוות"
                  style={{ textAlign: "right" }}
                  className="form-control"
                  required />
                <br />
                <input type="number"
                id="allAmount"
                onChange={handleChange}
                  placeholder="כמות סך הכל"
                  style={{ textAlign: "right" }}
                  className="form-control"
                  required />
                <br />
                <label htmlFor="" className="form-label">חלוקת חדרים- כמה בכל חדר?</label>
                <label htmlFor="" className="form-label">כמה משתתפים/ות בכל חדר?</label>
                <select className="form-select" aria-label="Default select example" id="participantsDevesion" onChange={handleChange} required>
                  <option selected></option>
                  <option value="1" >1</option>
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
                <select className="form-select" aria-label="Default select example" id="staffDevision" onChange={handleChange} required>
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
                id="smallClassesAmount"
                onChange={handleChange}
                  style={{ textAlign: "right" }}
                  className="form-control"
                   />
                <br />
                <label htmlFor="" className="form-label">כמות כיתות ל70 אנשים</label>
                <input type="number"
                id="Classes70Amount"
                onChange={handleChange}
                  style={{ textAlign: "right" }}
                  className="form-control"
                   />
                <br />
                <label htmlFor="" className="form-label">כמות כיתות להתכנסות של כל הקבוצה</label>
                <input type="number"
                id="gatheringClassesAmount"
                onChange={handleChange}
                  style={{ textAlign: "right" }}
                  className="form-control"
                   />
                <br />
                <label htmlFor="" className="form-label">הערות נוספות</label>
                <input type="text"
                id="other"
                onChange={handleChange}
                  placeholder="הערות נוספות"
                  style={{ textAlign: "right" }}
                  className="form-control"
                  defaultValue="no notes" />
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
                id="araivleTime"
                onChange={handleChange}
                  className="form-control"
                  required />
                <br />
                <label htmlFor="" className="form-label">סיום</label>
                <input type="time"
                id="departureTime"
                onChange={handleChange}
                  className="form-control"
                  required />
                <br />
                <label htmlFor="" className="form-label">נרצה להזמין יציאה מאוחרת מחדרי הלינה בעלות של 100 שקלים לחדר</label>
                <select className="form-select text-end" 
                aria-label="Late Checkout Option" 
                id="lateDeparture" 
                onChange={handleChange} 
                required>
                  <option selected ></option>
                  <option value="true" >כן</option>
                  <option value="false" >לא</option>
                </select>
                <br />
                <input type="number"
                id="lateAmount"
                onChange={handleChange}
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
                    <div className="form-check ">
                      <label className="form-check-label" >
                        בוקר
                      </label>
                      <input onChange={handleMealChange} 
                      checked={newReservation.meals.includes("sundaybreakfast")} 
                      className="form-check-input" 
                      type="checkbox" 
                      id="sundaybreakfast" 
                      value="sundaybreakfast" />
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" >
                        צהריים
                      </label>
                      <input onChange={handleMealChange} 
                      checked={newReservation.meals.includes("sundaylunch")}
                      className="form-check-input" 
                      type="checkbox" 
                      id="sunlunch" 
                      value="sundaylunch" />
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" >
                        ערב
                      </label>
                      <input onChange={handleMealChange}
                      checked={newReservation.meals.includes("sundaydinner")} 
                      className="form-check-input" 
                      type="checkbox" 
                      id="sundaydinner" 
                      value="sundaydinner" />
                    </div>
                  </div>
                  <div className="col-3">
                    <label htmlFor="" className="form-label">שני</label>
                    <div className="form-check">
                      <label className="form-check-label" >
                        בוקר
                      </label>
                      <input onChange={handleMealChange} 
                      checked={newReservation.meals.includes("mondaybreakfast")}
                      className="form-check-input" 
                      type="checkbox" 
                      id="mondaybreakfast" 
                      value="mondaybreakfast" />
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" >
                        צהריים
                      </label>
                      <input onChange={handleMealChange} 
                      checked={newReservation.meals.includes("mondaylunch")}
                      className="form-check-input" 
                      type="checkbox" 
                      id="mondaylunch" 
                      value="mondaylunch" />
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" >
                        ערב
                      </label>
                      <input onChange={handleMealChange} className="form-check-input" type="checkbox" id="meals" value="mondaydinner" />
                    </div>
                  </div>
                  <div className="col-3">
                    <label htmlFor="" className="form-label">שלישי</label>
                    <div className="form-check">
                      <label className="form-check-label" >
                        בוקר
                      </label>
                      <input onChange={handleMealChange} 
                      checked={newReservation.meals.includes("tuesdaybreakfast")} 
                      className="form-check-input" 
                      type="checkbox" 
                      id="tuasdaybreakfast" 
                      value="tuesdaybreakfast" />
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" >
                        צהריים
                      </label>
                      <input onChange={handleMealChange} 
                      checked={newReservation.meals.includes("tuesdaylunch")}
                      className="form-check-input" 
                      type="checkbox" 
                      id="tuasdaylunch" 
                      value="tuesdaylunch" />
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" >
                        ערב
                      </label>
                      <input onChange={handleMealChange} 
                      checked={newReservation.meals.includes("tuesdaydinner")}
                      className="form-check-input" 
                      type="checkbox" 
                      id="tuasdaydinner" 
                      value="tuesdaydinner" />
                    </div>
                  </div>
                  <div className="col-3">
                    <label htmlFor="" className="form-label">רביעי</label>
                    <div className="form-check">
                      <label className="form-check-label" >
                        בוקר
                      </label>
                      <input onChange={handleMealChange} 
                      checked={newReservation.meals.includes("wendsdaybreakfast")}
                      className="form-check-input" 
                      type="checkbox" 
                      id="wednsdaybreakfast" 
                      value="wendsdaybreakfast" />
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" >
                        צהריים
                      </label>
                      <input onChange={handleMealChange} 
                      checked={newReservation.meals.includes("wendsdaylunch")}
                      className="form-check-input" 
                      type="checkbox" 
                      id="wendsdaylunch" 
                      value="wendsdaylunch" />
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" >
                        ערב
                      </label>
                      <input onChange={handleMealChange} 
                      checked={newReservation.meals.includes("wendsdaydinner")}
                      className="form-check-input" 
                      type="checkbox" 
                      id="wendsdaydinner" 
                      value="wendsdaydinner" />
                    </div>
                  </div>
                  <div className="col-3">
                    <label htmlFor="" className="form-label">חמישי</label>
                    <div className="form-check">
                      <label className="form-check-label" >
                        בוקר
                      </label>
                      <input onChange={handleMealChange} 
                      checked={newReservation.meals.includes("thursdaybreakfast")}
                      className="form-check-input" 
                      type="checkbox" 
                      id="thursdaybreakfast" 
                      value="thursdaybreakfast" />
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" >
                        צהריים
                      </label>
                      <input onChange={handleMealChange} 
                      checked={newReservation.meals.includes("thursdaylunch")}
                      className="form-check-input" 
                      type="checkbox" 
                      id="thursdaylunch" 
                      value="thursdaylunch" />
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" >
                        ערב
                      </label>
                      <input onChange={handleMealChange} 
                      checked={newReservation.meals.includes("thursdaydinner")}
                      className="form-check-input" 
                      type="checkbox" 
                      id="thursdaydinner" 
                      value="thursdaydinner" />
                    </div>
                  </div>
                  <div className="col-3">
                    <label htmlFor="" className="form-label">שישי</label>
                    <div className="form-check">
                      <label className="form-check-label" >
                        בוקר
                      </label>
                      <input onChange={handleMealChange} 
                      checked={newReservation.meals.includes("fridaybreakfast")}
                      className="form-check-input" 
                      type="checkbox" 
                      id="fridaybreakfast" 
                      value="fridaybreakfast" />
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" >
                        צהריים
                      </label>
                      <input onChange={handleMealChange} 
                      checked={newReservation.meals.includes("fridaylunch")}
                      className="form-check-input" 
                      type="checkbox" 
                      id="fridaylunch" 
                      value="fridaylunch" />
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" >
                        ערב
                      </label>
                      <input onChange={handleMealChange} 
                      checked={newReservation.meals.includes("fridaydinner")}
                      className="form-check-input" 
                      type="checkbox" 
                      id="fridaydinner" 
                      value="fridaydinner" />
                    </div>
                  </div>
                  <div className="col-3">
                    <label htmlFor="" className="form-label">שבת</label>
                    <div className="form-check">
                      <label className="form-check-label" >
                        בוקר
                      </label>
                      <input onChange={handleMealChange} 
                      checked={newReservation.meals.includes("saturdaybreakfast")}
                      className="form-check-input" 
                      type="checkbox" 
                      id="saturdaybreakfast" 
                      value="saturdaybreakfast" />
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" >
                        צהריים
                      </label>
                      <input onChange={handleMealChange} 
                      checked={newReservation.meals.includes("saturdaylunch")}
                      className="form-check-input" 
                      type="checkbox" 
                      id="saturdaylunch" 
                      value="saturdaylunch" />
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" >
                        ערב
                      </label>
                      <input onChange={handleMealChange} 
                      checked={newReservation.meals.includes("saturdaydinner")}
                      className="form-check-input" 
                      type="checkbox" 
                      id="saturdaydinner" 
                      value="saturdaydinner" />
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
                id="other"
                onChange={handleChange}
                  style={{ textAlign: "right" }}
                  className="form-control" />
              </div>
            </div>
          </div>
        </div>
      </form >
      <button className="btn btn-success" onClick={submitReservation}>Submit</button>
      <button><Link to="/">חזרה</Link></button>
    </div >
  )
}

export default PricingComp
