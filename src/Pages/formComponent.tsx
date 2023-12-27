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
import { PatientDetails } from "./patientDetails";
const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p:4,
    //overflow: "scroll",
    height: '100%',
  };

function  FormComponent(value:Patients){
    
    const [data,setData]=useState<Patients>(value);
    const [changebutton,setChangebutton]= useState();
    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const Navigate=useNavigate();
    const location=useLocation();
    const [isValidation,setIsValidation]= useState<boolean>(true);
    const [cdata, setName] = useState({countrie: "",state: ""});
    const countrie = ['Germany', 'India', 'France'];
    const istate = ['MH', 'Goa', 'MP', 'Delhi'];
    const gstate = ['select state', 'Duesseldorf', 'Leinfelden-Echterdingen', 'Eschborn']
    const fstate = ['select state', 'Auvergne', 'Bretagne', 'Corse', 'Centre']
    let state;
    let d=new Date(Date.now());
    let res=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();

    if (cdata.countrie === "Germany") {
      state = gstate.map((gstate, key) => <option key={key} value={gstate}>{gstate}</option>)
    }
    else if (cdata.countrie === "India") {
      state = istate.map((istate, key) => <option key={key} value={istate}>{istate}</option>)
    }
    else {
      state = fstate.map((fstate, key) => <option key={key} value={fstate}>{fstate}</option>)
    }
    
    const countries = countrie.map((countrie, key) => <option key={key} value={countrie}>{countrie}</option>);
  
    function handleCountry(e:any) {
      setName({ ...cdata, countrie: e.target.value });
    }
  
    function handleStateChange(e:any) {
      setName({ ...cdata, state: e.target.value });
    }
    
  
    console.log('location.state=',location.state);
    console.log('date',res);
    console.log(new Date(Date.now()).toString());
    
    
    
    const getData =()=>{
    if(value!=null){
      setData({pid:value.pid,fullname:value.fullname,gender:value.gender,dob:value.dob,refdoc:value.refdoc,address:value.address, country:value.state, state:value.state, mobile:value.mobile, email:value.email, note:value.note, image:value.image})
    }
    if(location.state!=null){
      console.log("location.state:",location.state);
      setData(location.state);
      handleOpen();
    }
  }

  useEffect(()=>{
    getData()
  },[])

  const handleClick=()=>{
    if(location.state!="" && location.state!=null){
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
                alert('Enter valid Name');
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
                        <h6>Form</h6>
                        <Form className="was-validated">
                                      <Form.Group className="modal-body">
                                        <Form.Group className="mb-3" controlId="fullname">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" placeholder="" name='fullname' value={data.fullname} onChange={(event:React.ChangeEvent<HTMLInputElement>):void=>{
                        setData({...data,fullname:event.target.value})
                      }} required={true} isInvalid={false} /><div className="invalid-feedback">
                      Please enter Name.
                    </div>
                                         </Form.Group>
                                        <Form.Group className="mb-3" controlId="gender">
                                            <Form.Label>Gender: </Form.Label>
                                            <Form.Select aria-label="Default select example" className="form-control" value={data.gender} onChange={(event:React.ChangeEvent<HTMLSelectElement>):void=>{
                        setData({...data,gender:event.target.value})
                      }} required={true} isInvalid={false}><div className="invalid-feedback">
                      Please enter Gender.
                    </div>
                                                <option value="">Gender</option>
                                                <option >Male</option>
                                                <option >Female</option>
                                            </Form.Select>
                                            <div className="invalid-feedback">
                      Please select Gender.
                    </div>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="dob">
                                            <Form.Label>DOB</Form.Label>
                                            <Form.Control type="date" className="form-control" id="date-inp" placeholder="" max={res} name='dob' value={data.dob} onChange={(event:React.ChangeEvent<HTMLInputElement>):void=>{
                        setData({...data,dob:event.target.value})
                      }} required={true} isInvalid={false}/> <div className="invalid-feedback">Please enter Date of Birth.</div>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="refdoc">
                                            <Form.Label>Ref. Doctor :</Form.Label>
                                            <Form.Select aria-label="Default select example" className="form-control" value={data.refdoc} onChange={(event:React.ChangeEvent<HTMLSelectElement>):void=>{
                        setData({...data,refdoc:event.target.value})
                      }} required={true} isInvalid={true}>
                                                <option value="">Select Doctor</option>
                                                <option>Dr.1</option>
                                                <option>Dr.2</option>
                                            </Form.Select>
                                            <div className="invalid-feedback">
                      Please select Doctor.
                    </div>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="address">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control type="text" placeholder="" name='address' value={data.address} onChange={(event:React.ChangeEvent<HTMLTextAreaElement>):void=>{
                        setData({...data,address:event.target.value})
                      }} required={true} isInvalid={true}/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="country">
                                            <Form.Label>Country :</Form.Label>
                                            {/* <select className="form-control" value={cdata.countrie} onChange={handleCountry}>{countries}</select> */}
                                            <Form.Select aria-label="Default select example" className="form-control" value={cdata.countrie} onChange={(event:React.ChangeEvent<HTMLSelectElement>):void=>{
                        setData({...data,country:event.target.value})
                      }} required={true} isInvalid={true}><option value={cdata.countrie} onChange={handleCountry}>{countries}</option>
                                            </Form.Select>
                                            <div className="invalid-feedback">
                      Please select Country.
                    </div>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="state">
                                            <Form.Label>State</Form.Label>
                                            <select className="form-control" value={cdata.state} onChange={handleStateChange}>{state}</select>
                                            {/* <Form.Select aria-label="Default select example" className="form-control" value={data.state} onChange={(event:React.ChangeEvent<HTMLSelectElement>):void=>{
                        setData({...data,state:event.target.value})
                      }} required={true} isInvalid={true}>
                                                <option value="" >Select State</option>
                                                <option>MH</option>
                                                <option>Goa</option>
                                                <option>Delhi</option>
                                            </Form.Select> */}
                                            <div className="invalid-feedback">
                      Please select State.
                    </div>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="mobile">
                                            <Form.Label>Mobile</Form.Label>
                                            <Form.Control type="text" placeholder="" value={data.mobile} onChange={(event:React.ChangeEvent<HTMLTextAreaElement>):void=>{
                        setData({...data,mobile:event.target.value})
                      }} required={true} isInvalid={true}/><div className="invalid-feedback">
                      Please enter Mobile.
                    </div>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="email">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="" value={data.email} onChange={(event:React.ChangeEvent<HTMLTextAreaElement>):void=>{
                        setData({...data,email:event.target.value})
                      }} required={true} isInvalid={true}/><div className="invalid-feedback">
                      Please enter Email.
                    </div>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="note">
                                            <Form.Label>Note</Form.Label>
                                            <Form.Control type="text" placeholder="" value={data.note} onChange={(event:React.ChangeEvent<HTMLTextAreaElement>):void=>{
                        setData({...data,note:event.target.value})
                      }}/>
                                        </Form.Group>
                                        </Form.Group>
                                        <Form.Group controlId="button">
                                        <Button variant="primary" className="btn-left" type="submit" onClick={(event:React.MouseEvent<HTMLButtonElement>):void=>{handleClick()}}>
                                            Submit
                                        </Button>
                                        <Button variant="danger" className="btn-right" type="submit" onClick={(event:React.MouseEvent<HTMLButtonElement>):void=>{handleClose()}}>
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

function useForm<T>(): { formState: { errors: any; }; } {
  throw new Error("Function not implemented.");
}
