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
import * as EmailValidator from 'email-validator';
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
        
        let id:string=nanoid();
        let isValid:boolean=EmailValidator.validate(email);
        //setPid(id);
        if(fullname!= null && gender!=null && dob!=null && email!=null){

            if(isValid){
                const details:Patients={pid:id,fullname:fullname,gender:gender,dob:dob, refdoc:refdoc, address:address, country:country, state:state, mobile:mobile, email:email, note:note, image:image};
                const res=save(details);
                alert('Data saved successfully...');
            }
            else{
                alert('Enter valid Email');
            }   
        }
        else{
            alert('Fields can not be empty...');
        }
        
        
        // let details=new patient(pid,fullname,gender,dob, refdoc, address, country, state, mobile, email, note, image);
        console.log('in rgstrpt');
        
              
    }

    return (
        <div>
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
    );
}

