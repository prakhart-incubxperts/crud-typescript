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
import { phone } from 'phone';
import '../Asset/modal.css';
import { Patients } from "../entities/Patients";
import { editPatientData, save } from "../Utils/functions";
import { toBeRequired } from "@testing-library/jest-dom/matchers";
import { PatientDetails } from "./patientDetails";
import countries from '../entities/countryState.json';
import states from '../entities/state.json'
import App from "../App";
let style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  margin:'5px',
  marginBottom: '5px',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  //overflow: "scroll",
  height: '100%',
  
};

function FormComponent(props:any) {

  const navigate = useNavigate();
  
  const [data, setData] = useState<Patients>(props);
  console.log("props.value:",props.value);
  
  const [changebutton, setChangebutton] = useState();
  const [open, setOpen] = useState(true);
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => {setOpen(false)}
  
  const location = useLocation();
  const [isValidation, setIsValidation] = useState<boolean>(true);
  const rules = { mobile: { size: 10, type: 'number' } }
  let state;
  let modal:HTMLElement;
  let d = new Date(Date.now());
  let res = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  function handleCancel(){
    handleClose()
    navigate("/")
  }
  


  let ctryname = countries.map((item, key) => <option key={key} value={item.country}>{item.country}</option>)
  console.log("ctryname", ctryname);
  const countrytoFilter = data.country;


  let countryFilter = countries.filter(function (value) {
    return value.country === data.country;
  }).map(function (value) {
    return value.cid;
  })
  console.log("cid", countryFilter);

  let statefilter = states.filter(function (value) {
    return value.cid == countryFilter[0];
  }).map(function (value) {
    return value;
  })
  console.log('statefilter:', statefilter);
  const filterState = statefilter.map((value, key) => <option key={key} value={value.state}>{value.state}</option>)
  console.log('filtered state:', filterState);


  function handleCountry(e: any) {

    // setName({ ...cdata, countrie: e.target.value });
    setData({ ...data, country: e.target.value });
    //setStateList(e.state);

    // console.log('country', data.country);

  }

  function handleStateChange(e: any) {
    //setName({ ...cdata, state: e.target.value });
    setData({ ...data, state: e.state });
  }


  console.log('location.state=', location.state);
  console.log('date', res);
  console.log(new Date(Date.now()).toString());



  const getData = () => {
    if (props != null) {
      setData({ pid: props.pid, fullname: props.fullname, gender: props.gender, dob: props.dob, refdoc: props.refdoc, address: props.address, country: props.state, state: props.state, mobile: props.mobile, email: props.email, note: props.note, image: props.image })
    }
    if (location.state != null) {
      console.log("location.state:", location.state);
      setData(location.state);
      handleOpen();
    }
  }

  useEffect(() => {
    getData()
  }, [])

  

  const handleClick = () => {
    if (location.state != "" && location.state != null) {
      editPatient();
    }
    else {
      registerPatient();
    }
  }

  function editPatient() {
    editPatientData(data);
    navigate("/");
  }

  function registerPatient(): void {
    debugger;
    let id: string = nanoid();
    const isNameValid: boolean = NameValidator.validate(data.fullname);
    let isEmailValid: boolean = EmailValidator.validate(data.email);
    const isMobileValid = phone(data.mobile, { country: 'IN' });
    if (data.fullname != null && data.gender != null && data.dob != null && data.email != null && isEmailValid && isMobileValid.isValid) {
      if (isNameValid) {
        setData({ ...data, pid: id });
        //const details: Patients = { pid: id, fullname: fullname, gender: gender, dob: dob, refdoc: refdoc, address: address, country: country, state: state, mobile: mobile, email: email, note: note, image: image };
        const res = save({ ...data, pid: id });
        alert('Data saved successfully...');
        console.log(res)
        navigate("/");
      }
      else {
        alert('Enter valid Name');
      }
    }
    else {
      alert('Either field is empty or not in proper format');
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
        id="modal"
      >
        <Fade in={open}>
          <Box sx={style}>
            <h6>Form</h6>
            <Form className="was-validated">
              <Form.Group className="modal-body">
                <Form.Group className="mb-3" controlId="fullname">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="" name='fullname' pattern="^[a-zA-Z]+$" value={data.fullname} onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                    setData({ ...data, fullname: event.target.value })
                  }} required={true} isInvalid={false} /><div className="invalid-feedback">
                    Please enter Name.
                  </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="gender">
                  <Form.Label>Gender: </Form.Label>
                  <Form.Select aria-label="Default select example" className="form-control" value={data.gender} onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                    setData({ ...data, gender: event.target.value })
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
                <Form.Group className="mb-3" >
                  <Form.Label>DOB</Form.Label>
                  <Form.Control type="date" className="form-control" id="date-inp" placeholder="" max={res} name='dob' value={data.dob} onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                    setData({ ...data, dob: event.target.value })
                  }} required={true} isInvalid={false} /> <div className="invalid-feedback">Please enter Date of Birth.</div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="refdoc">
                  <Form.Label>Ref. Doctor :</Form.Label>
                  <Form.Select aria-label="Default select example" className="form-control" value={data.refdoc} onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                    setData({ ...data, refdoc: event.target.value })
                  }} required={true} isInvalid={false}>
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
                  <Form.Control type="text" placeholder="" name='address' value={data.address} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
                    setData({ ...data, address: event.target.value })
                  }} required={true} isInvalid={false} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="country">
                  <Form.Label>Country :</Form.Label>
                  <select className="form-control" value={data.country} onChange={handleCountry}>{ctryname}</select>
                  {/* <select className="form-control" value={cdata.countrie} onChange={handleCountry}>{countries}</select> */}
                  {/* <Form.Select aria-label="Default select example" className="form-control" value={cdata.countrie} onChange={(event:React.ChangeEvent<HTMLSelectElement>):void=>{
                        setData({...data,country:cdata.countrie})
                      }} required={true} isInvalid={true}><select value={cdata.countrie} onChange={handleCountry}>{countries}</select>
                                            </Form.Select> */}
                  <div className="invalid-feedback">
                    Please select Country.
                  </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="state">
                  <Form.Label>State</Form.Label>
                  <select className="form-control" value={data.state} onChange={handleStateChange}>{filterState}</select>
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
                  <Form.Control type="text" placeholder="" minLength={10} pattern="[0-9]{10}" value={data.mobile} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
                    setData({ ...data, mobile: event.target.value })
                  }} required={true} isInvalid={false} /><div className="invalid-feedback">
                    Please enter Mobile.
                  </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="" pattern="[a-z0-9._%+\-]+@[a-z]+\.[a-z]{2,}$" value={data.email} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
                    setData({ ...data, email: event.target.value })
                  }} required={true} isInvalid={false} /><div className="invalid-feedback">
                    Please enter Email.
                  </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="note">
                  <Form.Label>Note</Form.Label>
                  <Form.Control type="text" placeholder="" value={data.note} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
                    setData({ ...data, note: event.target.value })
                  }} />
                </Form.Group>
              </Form.Group>
              <Form.Group controlId="button">
                <Button variant="primary" className="btn-left" type="submit" onClick={handleClick}>
                  Submit
                </Button>
                <Button variant="danger" className="btn-right" type="submit" onClick={handleCancel}>
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

// export function handleDisplayModal(value:string){
//   console.log('in formcomponent",',value)
//   style.display=value;
//   console.log("style.disp",style.display);
  
//   //FormComponent(value);
// }

function useForm<T>(): { formState: { errors: any; }; } {
  throw new Error("Function not implemented.");
}
