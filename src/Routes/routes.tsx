import { BrowserRouter as Router} from "react-router-dom";
import { Route,Routes } from "react-router-dom";
import { PatientDetails } from "../Pages/patientDetails";
import { Registration } from "../Pages/registration";

export function Routing(){
    return(
        <div>  
        <title></title>
        <nav className="navbar navbar-expand-lg navbar-light navbar-laravel">
            <div className="container">
                <a className="navbar-brand" href="#">
                    Patient Screen
                </a>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                            </a>
                        </li>
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
                                                <Route  path="/" element={<Registration/>}></Route>
                                                <Route  path="/display" element={<PatientDetails/>}></Route>
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
