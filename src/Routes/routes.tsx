import { Link, BrowserRouter as Router, useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { PatientDetails } from "../Pages/patientDetails";
import { Registration } from "../Pages/registration";
import { Button } from "react-bootstrap";
import FormComponent  from "../Pages/formComponent";

import { useState } from "react";


export function Routing() {

    // const Navigate=useNavigate();
    const [value, setValue] = useState<string>("register");
    return (
        <div>
            <title></title>
            <nav className="navbar navbar-expand-lg navbar-light navbar-laravel">
                <div className="container">
                    <a className="navbar-brand" href="">
                        Patient Screen
                    </a>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <div>
                                <li className="nav-item">
                                <a href="/"><button className="btn-primary">Register</button></a>
                                </li>
                            </div>&nbsp;
                            <div>
                                <li className="nav-item">
                                    <a href="/"><button className="btn-info">Home</button></a>
                                </li>
                            </div>
                        </ul>


                    </div>
                </div>
            </nav>
            <main className="my-form" style={{ display: 'flex' }}>
                <div className="container" style={{ display: '' }}>
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card" style={{ display: '' }}>
                                <div className="card-header">Registration</div>
                                <div className="card-body">
                                    <Router>
                                        <Routes>
                                            <Route path="/register" element={<FormComponent pid={""} fullname={""} gender={""} dob={""} refdoc={""} address={""} country={""} state={""} mobile={""} email={""} note={""} image={""} />}></Route>
                                            <Route path="/" element={<><PatientDetails />,<FormComponent pid={""} fullname={""} gender={""} dob={""} refdoc={""} address={""} country={""} state={""} mobile={""} email={""} note={""} image={""}/></>}></Route>
                                            <Route path='/edit' element={<FormComponent pid={""} fullname={""} gender={""} dob={""} refdoc={""} address={""} country={""} state={""} mobile={""} email={""} note={""} image={""} {...{}}/>}></Route>
                                        </Routes>
                                    </Router>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>


    )
}
