import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import './Asset/App.css';
import { Routing } from './Routes/routes';
import FormComponent from './Pages/formComponent';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import { PatientDetails } from './Pages/patientDetails';

function App() {


  const [isClicked, SetIsClicked] = useState<boolean>(false);

  function handleClick() {

    SetIsClicked(!isClicked);
  }
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light navbar-laravel">
        <div className="container">
          <a className="navbar-brand" href="">
            Patient Details
          </a>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <div>
                <li className="nav-item">
                  
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
      <div>
        <main className="my-form">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <Router>
                      <Routes>
                         <Route path="/" element={<PatientDetails />}></Route>
                      </Routes>
                    </Router>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

    </div>
  );
}

export default App;
function handleDisplay() {
  throw new Error('Function not implemented.');
}

