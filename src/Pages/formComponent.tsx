import React, { FC, isValidElement, useCallback, useEffect } from "react";
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
import { editPatientData, fetchData, save } from "../Utils/functions";
import countries from '../entities/countryState.json';
import states from '../entities/state.json';
import { toast } from "react-toastify";
import { useHref, useNavigate,useNavigation } from "react-router-dom";
import { PatientDetails } from "./patientDetails";
import { Hidden } from "@mui/material";


let style = {
  position: 'relative',top: '50%',left: '50%',margin: '5px',marginBottom: '5px',transform: 'translate(-50%, -50%)',width: 600,bgcolor: 'background.paper',border: '2px solid #000',boxShadow: 24,p: 4,height: '100%',
};


const FormComponent = (props: any) => {
  const [data, setData] = useState<Patients>(props.value);
  const [open, setOpen] = useState(props.open);
  const handleOpen = () => { setOpen(true); };
  const Navigate=useNavigate();
  const [validated, setValidated] = useState(false);
  const [val, setVal]=useState(true);
  useEffect(() => {
    setOpen(props.open)
  }, [props.open])
  const handleClose = () => {
    setOpen(false)
    props.cancel(false)
  }
  let d = new Date(Date.now());
  let maxDate: string;
  if (d.getMonth() < 10) {
    let mnth = "0" + (d.getMonth() + 1);
    if (d.getDate() < 10) {
      let day = "0" + d.getDate();
      maxDate = d.getFullYear() + "-" + mnth + "-" + day;
    }
    else {
      maxDate = d.getFullYear() + "-" + mnth + "-" + d.getDate();
    }
  }
  else {
    maxDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + (d.getDate());
  }

  function success(){
    toast.success('Data added successfully...',{position: toast.POSITION.TOP_RIGHT});
  }
  function info(){
    toast.info('Data changed...',{position: toast.POSITION.TOP_CENTER});
  }
  function fail(){
    toast.error('Something went wrong...',{position: toast.POSITION.TOP_CENTER})
  }

  function handleCancel() {
    handleClose();
  }


  console.log("countries:",countries);
  
  let ctryname = countries.map((item, key) => <option key={key} value={item.country}>{item.country}</option>)
  
  let countryFilter = countries.filter(function (value) {
    console.log("data.country:",data.country);
    return value.country === data.country;
  }).map(function (value) {
    console.log("value.cid",value.cid);
    return value.cid;
  })
  

  let statefilter = states.filter(function (value) {
    return value.cid == countryFilter[0];
  }).map((value, key) => <option key={key} value={value.state}>{value.state}</option>)
  


  function handleCountry(e: any) {
    setData({...data, country: e.target.value });
  }

  function handleStateChange(e: any) {
    console.log("selected state:",e.target.value);
    
    setData({...data, state: e.target.value });
  }

  const getData = () => {
    if (props != null) {
      setData(props.value)
    }
  }

  useEffect(() => {
    getData()
  }, [])



  const handleClick = async (event:any) => {
    debugger
    
    if (props.value.pid != "" && props.value.pid != undefined) {
      let stringCheck = data.email;
      let myregex = new RegExp("[a-z0-9._%+\-]+@[a-z]+\.[a-z]{2,}$");
      let result = stringCheck.match(myregex);
      if (data.address != "" && data.fullname != "" && data.mobile.length == 10 && data.email != "" && result && data.gender != "" && data.dob != "") {
       console.log(Form.Check);
        const form=event.currentTarget;
        console.log(form.checkValidity());
        
        if(form.checkValidity()==false){

        }
        else
        editPatient();
      }
    }
    else {
       registerPatient();
    }
  }

  async function editPatient() {
    await editPatientData(data);
    info();
    props.childFunction();
    handleClose();
    
  }

   async function registerPatient() {
    
    debugger;
    let id: string = nanoid();
    setData({ ...data, pid: id });
    const isNameValid: boolean = NameValidator.validate(data.fullname);
    let isEmailValid: boolean = EmailValidator.validate(data.email);
    const isMobileValid = phone(data.mobile, { country: 'IN' });
    
    if (data.fullname != null && data.gender != null && data.dob != null && data.country != null && data.state!=null && isEmailValid && isMobileValid.isValid) {
      if (isNameValid) {
         await save({ ...data, pid: id }).then((res) => {
          debugger
         
          if(res.status==200){
            alert('Data saved successfully...');
            success();
            handleClose();
            props.childFunction();
          }
          else {
            alert('Something went wrong');
          }
        });
        
      }
      else {
        alert('Enter valid Name');
        handleOpen();
        setData(data);
      }
    }
    else {
      if(data.fullname==null?alert(`Enter valid fullname`):data.gender==null?alert(`Enter valid gender`):data.dob== null? alert(`Enter valid dob`):data.refdoc==null?alert(`Enter valid refdoc`):data.address==null?alert(`Enter valid address`):data.country==null?alert(`Enter valid country`):data.state==null?alert(`Enter valid state`):data.mobile==null?alert(`Enter valid mobile`):data.email==null?alert(`Enter valid email`):"")
      setData(data);
      handleOpen();
      //setOpen(props.open);
    }
  }
  
  function onChangeEvent(e:any){
    console.log("e.traget.name:",e.target.name);
    console.log("e.traget.value:",e.target.value);
    
    setData({...data,[e.target.name]:e.target.value});
    return(<Form.Control.Feedback type="invalid">
    Please enter {`${e.target.name}`}.
  </Form.Control.Feedback>)
    setVal(true);
  }

  const handleSubmit=(e:any)=>{
    debugger
    console.log("event type:",e);
    
    const form = e.currentTarget;
    console.log("form.checkvalidity()",form.checkValidity());
    
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      handleOpen();
    }
    else{
      setValidated(true);
      handleClick(e);
    }

    
    }
  


  const convertToBase64 = (event: any) => {
    debugger
    console.log("event:",event.target);
    
    if(event!=null){
      if(event.target.value!= "" && event.target.files[0].type.split("/")[0] === "image"){
        const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setData({ ...data, image: reader.result as string });
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
      };
      }
      else{
        setData({...data,image:""})
      }
    }
    
    
  };

let msg:any;
  return (
    <div>
    
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        // onClose={handleClose}
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
            <Form className="was-validated" validated={validated} >
              <Form.Group className="modal-body">
                <Form.Group className="mb-3" controlId="image">
                  <Form.Label>Image</Form.Label>
                  <div className="imageBox" >
                    <img src={data.image} style={{ height: '120px', width: '120px' }} />
                  </div>
                  <div >
                    <input type='file' id='image' accept=".png, .jpg, .jpeg"  onChange={convertToBase64}>
                    </input>
                  </div>
                  <div className="invalid-feedback">
                      Please enter image only 
                    </div>

                </Form.Group>
                <Form.Group className="mb-3" controlId="fullname">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder=" " name='fullname' pattern="^[a-zA-Z ]{3,}" value={data.fullname} onChange={msg=onChangeEvent} 
                  required={true} isInvalid={false}/>
                  {msg}
                  {/* <Form.Control.Feedback type="invalid" hidden>
              Please enter name.
            </Form.Control.Feedback> */}
                  {/* <div className="invalid-feedback">
                    Please enter Name.
                  </div> */}
                </Form.Group>
                <Form.Group className="mb-3" controlId="gender">
                  <Form.Label>Gender: </Form.Label>
                  <Form.Select aria-label="Default select example" name="gender" className="form-control" value={data.gender} onChange={onChangeEvent}
                  required={true} isInvalid={false}><div className="invalid-feedback" >
                      Please enter Gender.
                    </div>
                    <option value="">Gender</option>
                    <option >Male</option>
                    <option >Female</option>
                  </Form.Select>
                  
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>DOB</Form.Label>
                  <Form.Control type="date" className="form-control" id="date-inp" placeholder="" max={maxDate} name='dob' value={data.dob} onChange={onChangeEvent} required={true} isInvalid={false} />
                  <div className="invalid-feedback">Please enter Date of Birth.</div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="refdoc">
                  <Form.Label>Ref. Doctor :</Form.Label>
                  <Form.Select aria-label="Default select example" name="refdoc" className="form-control" value={data.refdoc} onChange={onChangeEvent} required={true} isInvalid={false}>
                    <option value="" >Select Doctor</option>
                    <option>Dr.1</option>
                    <option>Dr.2</option>
                  </Form.Select>
                  
                </Form.Group>
                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" placeholder="" name='address' value={data.address} onChange={onChangeEvent} required={true} isInvalid={false} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="country" >
                  <Form.Label >Country :</Form.Label>

                  <Form.Select aria-label="Default select example" className="form-control" value={data.country} required={true} isInvalid={false}  onChange={handleCountry}>
                    <option value="" >select country...</option>{ctryname}</Form.Select>

                  
                </Form.Group>
                <Form.Group className="mb-3" controlId="state">
                  <Form.Label>State</Form.Label>
                  <Form.Select className="form-control" value={data.state} onChange={handleStateChange} required={true}><option value="">select state...</option>
                  {statefilter}</Form.Select>

                  
                </Form.Group>
                <Form.Group className="mb-3" controlId="mobile">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control type="text" placeholder="" minLength={10} pattern="[0-9]{10}" name="mobile" value={data.mobile} onChange={onChangeEvent} required={true} isInvalid={false} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="" pattern="[a-z0-9._%+\-]+@[a-z]+\.[a-z]{2,}$" name="email" value={data.email} onChange={onChangeEvent} required={true} isInvalid={false} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="note">
                  <Form.Label>Note</Form.Label>
                  <Form.Control type="text" placeholder=" " value={data.note} name="note" onChange={onChangeEvent} />
                </Form.Group>
              </Form.Group>
              <Form.Group controlId="button">
                <Button variant="primary" className="btn-left" type="submit" onClick={handleSubmit}>
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




