import React from "react";
import { ReactDOM } from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import bootstarp from 'react-bootstrap';
import { save } from "../Utils/functions";
import { Patients } from "../entities/Patients";
import { nanoid } from 'nanoid';
//import { patient } from "../entities/patient";


export function Registration(){

    //const [details,setDetails]=useState<patient>({} as patient);
    const [pid, setPid] = useState<string | any>();
    const [fullname, setFullname] = useState<string |any>();
    const [address, setAddress] = useState<string |any>();
    const [refdoc, setRefdoc] = useState<string |any>();
    const [email, setEmail] = useState<string |any>();
    const [country, setCountry] = useState<string |any>();
    const [state, setState] = useState<string |any>();
    const [gender, setGender] = useState<string |any>();
    const [dob, setDob] = useState<string |any>();
    const [note, setNote] = useState<string |any>();
    const [mobile, setMobile] = useState<string |any>();
    const [image, setImage] = useState<string |any>();
    
    

    function registerPatient():void{
        debugger;
        
        let id=nanoid();
        //setPid(id);
        if(fullname!= null && gender!=null && email!=null){
            const details:Patients={pid:id,fullname:fullname,gender:gender,dob:dob, refdoc:refdoc, address:address, country:country, state:state, mobile:mobile, email:email, note:note, image:image};
            const res=save(details);
            alert('Data saved successfully...')
        }
        //alert('something went wrong...')
        
        // let details=new patient(pid,fullname,gender,dob, refdoc, address, country, state, mobile, email, note, image);
        console.log('in rgstrpt');
        
              
    }





    return (
        <div>
            <link
                href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
                rel="stylesheet"
                id="bootstrap-css"
            />
            {/* Fonts */}
            <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
            <link
                href="https://fonts.googleapis.com/css?family=Raleway:300,400,600"
                rel="stylesheet"
                type="text/css"
            />
            <link rel="icon" href="Favicon.png" />
            {/* Bootstrap CSS */}
            <link
                rel="stylesheet"
                href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
            />
            <title></title>
            <nav className="navbar navbar-expand-lg navbar-light navbar-laravel">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        Patient Screen
                    </a>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                {/* <Link to='/display'>Details
                                 </Link> */}
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

                                    <Form>
                                        <Form.Group className="mb-3" controlId="fullname">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" placeholder="" name='fullname' onChange={(event:React.ChangeEvent<HTMLTextAreaElement>):void=>{
                        setFullname(event.target.value);
                      }} required/>
                                         </Form.Group>
                                        <Form.Group className="mb-3" controlId="gender">
                                            <Form.Label>Gender: </Form.Label>
                                            <Form.Select aria-label="Default select example" onChange={(event:React.ChangeEvent<HTMLSelectElement>):void=>{
                        setGender(event.target.value);
                      }} required>
                                                <option>Gender</option>
                                                <option >Male</option>
                                                <option >Female</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="dob">
                                            <Form.Label>DOB</Form.Label>
                                            <Form.Control type="date" placeholder="" name='dob' onChange={(event:React.ChangeEvent<HTMLInputElement>):void=>{
                        setDob(event.target.value);
                      }} required/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="refdoc">
                                            <Form.Label>Ref. Doctor :</Form.Label>
                                            <Form.Select aria-label="Default select example" onChange={(event:React.ChangeEvent<HTMLSelectElement>):void=>{
                        setRefdoc(event.target.value);
                      }}>
                                                <option>Select Doctor</option>
                                                <option>Dr.1</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="address">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control type="text" placeholder="" name='address' onChange={(event:React.ChangeEvent<HTMLTextAreaElement>):void=>{
                        setAddress(event.target.value);
                      }}/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="country">
                                            <Form.Label>Country :</Form.Label>
                                            <Form.Select aria-label="Default select example" onChange={(event:React.ChangeEvent<HTMLSelectElement>):void=>{
                        setCountry(event.target.value);
                      }}>
                                                <option>Select Country</option>
                                                <option>India</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="state">
                                            <Form.Label>State</Form.Label>
                                            <Form.Select aria-label="Default select example" onChange={(event:React.ChangeEvent<HTMLSelectElement>):void=>{
                        setState(event.target.value);
                      }}>
                                                <option>Select State</option>
                                                <option>MH</option>
                                                <option>Goa</option>
                                                <option>Delhi</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="mobile">
                                            <Form.Label>Mobile</Form.Label>
                                            <Form.Control type="text" placeholder="" onChange={(event:React.ChangeEvent<HTMLTextAreaElement>):void=>{
                        setMobile(event.target.value);
                      }}/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="email">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="" onChange={(event:React.ChangeEvent<HTMLTextAreaElement>):void=>{
                        setEmail(event.target.value);
                      }} isValid required/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="note">
                                            <Form.Label>Note</Form.Label>
                                            <Form.Control type="text" placeholder="" onChange={(event:React.ChangeEvent<HTMLTextAreaElement>):void=>{
                        setNote(event.target.value);
                      }}/>
                                        </Form.Group>
                                        <Button variant="primary" type="submit" onClick={registerPatient}>
                                            Submit
                                        </Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

