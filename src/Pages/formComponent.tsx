import React from "react";
import { ReactDOM } from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { nanoid } from 'nanoid';
import * as EmailValidator from 'email-validator';
import { NameValidator } from "clean-name-validator";

import { Patients } from "../entities/Patients";
import { save } from "../Utils/functions";
const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p:4,
    overflow: 'scroll',
    height: '100%'
  };

export function FormComponent() {

    
    
    const [data,setData]=useState<Patients>({pid:"",fullname:"",gender:"",dob:"", refdoc:"", address:"", country:"", state:"", mobile:"", email:"", note:"", image:""});
    // const [pid,setPid] = useState<string>("");
    // const [fullname, setFullname] = useState<string>("");
    // const [address, setAddress] = useState<string>("");
    // const [refdoc, setRefdoc] = useState<string>("");
    // const [email, setEmail] = useState<string>("");
    // const [country, setCountry] = useState<string>("");
    // const [state, setState] = useState<string>("");
    // const [gender, setGender] = useState<string>("");
    // const [dob, setDob] = useState<string>("");
    // const [note, setNote] = useState<string>("");
    // const [mobile, setMobile] = useState<string>("");
    // const [image, setImage] = useState<string>("");
    const [changebutton,setChangebutton]= useState<Function>();
    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const Navigate=useNavigate();
    
   

    // function editPatient(){
    //     setData({pid:pid,fullname:fullname,gender:gender,dob:dob, refdoc:refdoc, address:address, country:country, state:state, mobile:mobile, email:email, note:note, image:image})
    // }
    
   function registerPatient(): void {
        debugger;
        let id: string = nanoid();
        //setData({...data,pid:id});
        const isNameValid: boolean = NameValidator.validate(data.fullname);
        let isValid: boolean = EmailValidator.validate(data.email);
        if (data.fullname != null && data.gender != null && data.dob != null && data.email != null && isValid) {
            if (isNameValid) {
                setData({...data,pid:id});
                //const details: Patients = { pid: id, fullname: fullname, gender: gender, dob: dob, refdoc: refdoc, address: address, country: country, state: state, mobile: mobile, email: email, note: note, image: image };
                const res = save({...data,pid:id});
                alert('Data saved successfully...');
                console.log(res)
                Navigate("/register");
            }
            else {
                alert('Enter valid data');
            }
        }
        else {
            alert('Fields can not be empty...');
        }
    }
   
   
   
   
   
   
   

    // function btn(){
    //     if()
    // }
    
    return (
        <div>
        <Modal
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      open={open}
                      onClose={handleClose}
                      closeAfterTransition
                      slots={{ backdrop: Backdrop }}
                      slotProps={{
                        backdrop: {
                          timeout: 500,
                        },
                      }}
                    >
                      <Fade in={open}>
                        <Box sx={style}>
                        <Form>

                                        <Form.Group className="mb-3" controlId="fullname">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" placeholder="" name='fullname' value={data.fullname} onChange={(event:React.ChangeEvent<HTMLInputElement>):void=>{
                        setData({...data,fullname:event.target.value})
                      }} required/>
                                         </Form.Group>
                                        <Form.Group className="mb-3" controlId="gender">
                                            <Form.Label>Gender: </Form.Label>
                                            <Form.Select aria-label="Default select example" className="form-control" value={data.gender} onChange={(event:React.ChangeEvent<HTMLSelectElement>):void=>{
                        setData({...data,gender:event.target.value})
                      }} required>
                                                <option>Gender</option>
                                                <option >Male</option>
                                                <option >Female</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="dob">
                                            <Form.Label>DOB</Form.Label>
                                            <Form.Control type="date" placeholder="" name='dob' value={data.dob} onChange={(event:React.ChangeEvent<HTMLInputElement>):void=>{
                        setData({...data,dob:event.target.value})
                      }} required/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="refdoc">
                                            <Form.Label>Ref. Doctor :</Form.Label>
                                            <Form.Select aria-label="Default select example" className="form-control" value={data.refdoc} onChange={(event:React.ChangeEvent<HTMLSelectElement>):void=>{
                        setData({...data,refdoc:event.target.value})
                      }}>
                                                <option>Select Doctor</option>
                                                <option>Dr.1</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="address">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control type="text" placeholder="" name='address' value={data.address} onChange={(event:React.ChangeEvent<HTMLTextAreaElement>):void=>{
                        setData({...data,address:event.target.value})
                      }}/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="country">
                                            <Form.Label>Country :</Form.Label>
                                            <Form.Select aria-label="Default select example" className="form-control" value={data.country} onChange={(event:React.ChangeEvent<HTMLSelectElement>):void=>{
                        setData({...data,country:event.target.value})
                      }}>
                                                <option>Select Country</option>
                                                <option>India</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="state">
                                            <Form.Label>State</Form.Label>
                                            <Form.Select aria-label="Default select example" className="form-control" value={data.state} onChange={(event:React.ChangeEvent<HTMLSelectElement>):void=>{
                        setData({...data,state:event.target.value})
                      }}>
                                                <option>Select State</option>
                                                <option>MH</option>
                                                <option>Goa</option>
                                                <option>Delhi</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="mobile">
                                            <Form.Label>Mobile</Form.Label>
                                            <Form.Control type="text" placeholder="" value={data.mobile} onChange={(event:React.ChangeEvent<HTMLTextAreaElement>):void=>{
                        setData({...data,mobile:event.target.value})
                      }}/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="email">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="" value={data.email} onChange={(event:React.ChangeEvent<HTMLTextAreaElement>):void=>{
                        setData({...data,email:event.target.value})
                      }} isValid required/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="note">
                                            <Form.Label>Note</Form.Label>
                                            <Form.Control type="text" placeholder="" value={data.note} onChange={(event:React.ChangeEvent<HTMLTextAreaElement>):void=>{
                        setData({...data,note:event.target.value})
                      }}/>
                                        </Form.Group>
                                        <Button variant="primary" type="submit" onClick={(event:React.MouseEvent<HTMLButtonElement>):void=>{registerPatient()}}>
                                            Submit
                                        </Button>
             </Form>
                        </Box>
                      </Fade>
                    </Modal>
                    </div>
    )
}
