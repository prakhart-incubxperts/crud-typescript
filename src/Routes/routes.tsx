import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { PatientDetails } from "../Pages/patientDetails";
import FormComponent from "../Pages/formComponent";
import { SetStateAction, useState } from "react";
export function Routing(props: boolean | SetStateAction<undefined>) {
   // const routes:Routes=[{path:'/',component:'FormComponent'},{path:'/',component:'PatientDetails'}];
   const [isOpen,setIsOpen]=useState<boolean>(false);
   
   return (
        <Router>
            <Routes>
            <Route path="" element={<PatientDetails/>}></Route>
                <Route path="/" element={<PatientDetails/>}></Route>
                <Route path='/edit' element={<PatientDetails/>}></Route>
            </Routes>
        </Router>
    )
}
