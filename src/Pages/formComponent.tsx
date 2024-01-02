import React, { FC, useEffect } from "react";
import { useState } from "react";
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
import countries from '../entities/countryState.json';
import states from '../entities/state.json'
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

const FormComponent = (props:any) => {
  const [data, setData] = useState<Patients>(props.value);

  const [open, setOpen] = useState(props.open);
  const handleOpen = () => { setOpen(true); }

  useEffect (()=>{
    setOpen(props.open)
  },[props.open])
  const handleClose = () => {setOpen(false)
    props.cancel(false)}
  let d = new Date(Date.now());
  console.log('datenow',d);
  console.log("month",d.getMonth());
  console.log("date",d.getDate());
  let maxDate:string;
  if(d.getMonth()<10 ){
    let mnth="0"+(d.getMonth()+1);
    if(d.getDate()<10){
      let day="0"+d.getDate();
       maxDate=d.getFullYear() + "-" + mnth + "-" + day;
    }
    else{
       maxDate=d.getFullYear() + "-" + mnth + "-" + d.getDate();
    }
  }
  else{
   maxDate = d.getFullYear() + "-" + (d.getMonth()+ 1) + "-" + (d.getDate());
  }
  

  
  console.log("max date:",maxDate);
  
  function handleCancel(){
    handleClose();
  }
  


  let ctryname = countries.map((item, key) => <option key={key} value={item.country}>{item.country}</option>)
  let countryFilter = countries.filter(function (value) {
    return value.country === data.country;
  }).map(function (value) {
    return value.cid;
  })
  console.log("countryfilter",countryFilter);
  
  let statefilter = states.filter(function (value) {
    return value.cid == countryFilter[0];
  }).map((value, key) => <option key={key} value={value.state}>{value.state}</option> )
  console.log("statefilter",statefilter);
  // useEffect(() => { setData({...data,state:data.state})}, [data.state] )
  // const filterState = statefilter.map((value, key) => <option key={key} value={value.state}>{value.state}</option>)
  
  function handleCountry(e: any) {
    setData({ ...data, country: e.target.value });
  }

  function handleStateChange(e: any) {
    debugger
    setData({ ...data, state: e.target.value });
  }

  const getData = () => {
    if (props != null) {
      setData({ pid: props.value.pid, fullname: props.value.fullname, gender: props.value.gender, dob: props.value.dob, refdoc: props.value.refdoc, address: props.value.address, country: props.value.country, state: props.value.state, mobile: props.value.mobile, email: props.value.email, note: props.value.note, image: props.value.image })
    }
  }

  useEffect(() => {
    getData()
  }, [])

  

  const handleClick = () => {
    debugger
    if (props.value.pid !="" && props.value.pid!=undefined) {
      if(data.address!="" && data.fullname!="" && data.mobile!="" && data.mobile.length==10 && data.email!="" && data.email=="[[a-z0-9._%+\-]+@[a-z]+\.[a-z]{2,}$]" && data.gender!="" && data.dob!=""){
        editPatient(); 
      }
      
    }
    else {
      registerPatient();
      
    }
  }

  function editPatient() {
    if(data.address!=""&& data.fullname!=null && data.mobile!=null && data.refdoc!=null){
      editPatientData(data);
    }
    
    
  }

  function registerPatient(): void {
    debugger;
    let id: string = nanoid();
    setData({ ...data, pid: id });
    const isNameValid: boolean = NameValidator.validate(data.fullname);
    let isEmailValid: boolean = EmailValidator.validate(data.email);
    const isMobileValid = phone(data.mobile, { country: 'IN' });
    if (data.fullname != null && data.gender != null && data.dob != null && data.email != null && isEmailValid && isMobileValid.isValid) {
      if (isNameValid) {
        
        //const details: Patients = { pid: id, fullname: fullname, gender: gender, dob: dob, refdoc: refdoc, address: address, country: country, state: state, mobile: mobile, email: email, note: note, image: image };
        const res = save({ ...data, pid: id });
        alert('Data saved successfully...');
        console.log(res)
      }
      else {
        alert('Enter valid Name');
        handleOpen();
        setData(data);
        
      //setOpen(props.open);
      }
    }
    else {
      alert('Either field is empty or not in proper format');
      
      setData(data);
      setOpen(props.open);
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
                  <Form.Control type="text" placeholder="" name='fullname' pattern="^[a-zA-Z]{3,}" value={data.fullname} onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
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
                  <Form.Control type="date" className="form-control" id="date-inp" placeholder="" max={maxDate} name='dob' value={data.dob} onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                    setData({ ...data, dob: event.target.value })
                  }} required={true} isInvalid={false} /> <div className="invalid-feedback">Please enter Date of Birth.</div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="refdoc">
                  <Form.Label>Ref. Doctor :</Form.Label>
                  <Form.Select aria-label="Default select example" className="form-control" value={data.refdoc} onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
                    setData({ ...data, refdoc: event.target.value })
                  }} required={true} isInvalid={false}>
                    <option value="" disabled>Select Doctor</option>
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
            
                  <select className="form-control" value={data.country} onChange={handleCountry}><option value={""} disabled>select country...</option>
                    {ctryname}</select>
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
                  <select className="form-control" value={data.state} onChange={handleStateChange}><option value={""} disabled>select state...</option>{statefilter}</select>
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
                <Button variant="primary" className="btn-left" type="submit"  onClick={handleClick}>
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
