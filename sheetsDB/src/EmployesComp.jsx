import ReservationsComp from './ReservationsComp'
import { useState } from 'react'
import OperationsComp from './OperationsComp';
import AvaleComp from './AvaleComp';
import { Link } from 'react-router-dom';

const EmployesComp = () => {
    const [selectedView, setSelectedView] = useState("Reservations");



    return (
        <div>
            <div className="row navcolors">
                <div>
                    <nav className="navbar navbar-expand-lg bg-body-iteriary" style={{ Color: "#FAF9F6" }}>
                        <div className="container-fluid">
                            <div className="card text-align-center" style={{ height: "25px" }}>
                                <h5 className="card-title">HAGIVA HOSTEL</h5>
                            </div>
                            <img
                                src="data:image/jpeg;base64,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"
                                style={{ width: "80px", height: "80px" }}
                                className="img-fluid"
                                alt="no img found" />
                        </div>
                    </nav>
                </div>
            </div>
            <div className="row align-self-center" style={{ height: "100vh" }}>
                <div className="col-lg-10 col-sm-12 p-0">
                    {/* Conditional Component Rendering */}
                    {selectedView === "Reservations" && <ReservationsComp />}
                    {selectedView === "Operations" && <OperationsComp />}
                    {selectedView === "avalebility" && <AvaleComp />}
                </div>
                <div className="col-lg-2 col-sm-12 border border-2 border-info bg-light">
                    <div className='row align-self-center'>
                        <ul className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <li className="nav-item row mt-3 p-1 justify-content-center">
                                <Link to="/user">
                                <img
                                    src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
                                    className="img-fluid "
                                    style={{ maxWidth: "80px" }}
                                    alt="no img found" />
                                </Link>
                            </li>
                            <li className="nav-item row mt-3 p-1">
                                <button className="btn btn-outline-info"
                                    onClick={() => setSelectedView("Reservations")}>Reservations</button>
                            </li>
                            <li className="nav-item row mt-3 p-1 ">
                                <button
                                    className="btn btn-outline-info"
                                    onClick={() => setSelectedView("Operations")} >operations</button>
                            </li>
                            <li className="nav-item row mt-3 p-1 ">
                                <button className="btn btn-outline-info"
                                    onClick={() => setSelectedView("avalebility")}>waiting list</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default EmployesComp
