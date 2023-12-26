import React, { FC, useEffect } from "react";
import { ReactDOM } from "react";
import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { nanoid } from 'nanoid';
import * as EmailValidator from 'email-validator';
import { NameValidator } from "clean-name-validator";
import '../Asset/modal.css';
import { Patients } from "../entities/Patients";
import { editPatientData, save } from "../Utils/functions";
import { toBeRequired } from "@testing-library/jest-dom/matchers";
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

function  FormComponent(value:Patients){
    
    const [data,setData]=useState<Patients>(value);
    const [changebutton,setChangebutton]= useState();
    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const Navigate=useNavigate();
    const location=useLocation();
    
  

    const getData =()=>{
    if(value.pid!=null){
      setData({pid:value.pid,fullname:value.fullname,gender:value.gender,dob:value.dob,refdoc:value.refdoc,address:value.address, country:value.state, state:value.state, mobile:value.mobile, email:value.email, note:value.note, image:value.image})
    }
    else if(location.state.pid!=null && location.state.pid!=""){
      console.log("location.state:",location.state);
      setData(location.state);
      handleOpen();
    }
  }

  useEffect(()=>{
    getData()
  },[])

  const handleClick=()=>{
    if(location.state.pid!="" && location.state!=null){
        editPatient();  
    }
    else{
      registerPatient();
    }
  }

    function editPatient(){
      editPatientData(data);
      Navigate("/");
    }
    
   function registerPatient(): void {
        debugger;
        let id: string = nanoid();
        const isNameValid: boolean = NameValidator.validate(data.fullname);
        let isValid: boolean = EmailValidator.validate(data.email);
        if (data.fullname != null && data.gender != null && data.dob != null && data.email != null && isValid) {
            if (isNameValid) {
                setData({...data,pid:id});
                //const details: Patients = { pid: id, fullname: fullname, gender: gender, dob: dob, refdoc: refdoc, address: address, country: country, state: state, mobile: mobile, email: email, note: note, image: image };
                const res = save({...data,pid:id});
                alert('Data saved successfully...');
                console.log(res)
                Navigate("/");
            }
            else {
                alert('Enter valid data');
            }
        }
        else {
            alert('Fields can not be empty...');
        }
    }
   
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
                      }} required={true} isInvalid={true}/>
                                         </Form.Group>
                                        <Form.Group className="mb-3" controlId="gender">
                                            <Form.Label>Gender: </Form.Label>
                                            <Form.Select aria-label="Default select example" className="form-control" value={data.gender} onChange={(event:React.ChangeEvent<HTMLSelectElement>):void=>{
                        setData({...data,gender:event.target.value})
                      }} required={true} isInvalid={true}>
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
                                        <Form.Group className='button' controlId="button">
                                        <Button variant="primary" type="submit" onClick={(event:React.MouseEvent<HTMLButtonElement>):void=>{handleClick()}}>
                                            Submit
                                        </Button>
                                        <Button variant="danger" type="submit" onClick={(event:React.MouseEvent<HTMLButtonElement>):void=>{}}>
                                            Cancel
                                        </Button>
                                        </Form.Group>
             </Form>
                        </Box>
                      </Fade>
                    </Modal>
                    </div>
    )
}
export default FormComponent;