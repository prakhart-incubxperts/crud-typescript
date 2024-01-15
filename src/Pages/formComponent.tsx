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
import '../Asset/imagebox.css';
import { Patients } from "../entities/Patients";
import { editPatientData, fetchData, save } from "../Utils/functions";
import countries from '../entities/countryState.json';
import states from '../entities/state.json';
import { toast } from "react-toastify";
import { useHref, useNavigate, useNavigation } from "react-router-dom";
import { PatientDetails } from "./patientDetails";
import { Hidden } from "@mui/material";


let style = {
  position: 'relative', top: '50%', left: '50%', margin: '5px', marginBottom: '5px', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4, height: '100%',
};


const FormComponent = (props: any) => {
  const [data, setData] = useState<Patients>(props?.value);
  const [open, setOpen] = useState(props?.open);
  const handleOpen = () => { setOpen(true); };
  const Navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [val, setVal] = useState(true);
  const [touchedFields, setTouchedFields] = useState<{ [key: string]: boolean }>({});
  const [addClass, setAddClass] = useState(false);
  const [showFields, setShowFields] = useState(false);
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

  function success() {
    toast.success('Data added successfully...', { position: toast.POSITION.TOP_RIGHT });
  }
  function info() {
    toast.info('Data changed...', { position: toast.POSITION.TOP_CENTER });
  }

  function handleCancel() {
    handleClose();
  }


  console.log("countries:", countries);

  const ctryname = countries.map((item, key) => <option key={key} value={item.country}>{item.country}</option>)

  let countryFilter = countries.filter(function (value) {
    console.log("data.country:", data?.country);
    return value.country === data?.country;
  }).map(function (value) {
    console.log("value.cid", value.cid);
    return value.cid;
  })


  let statefilter = states.filter(function (value) {
    return value.cid == countryFilter[0];
  }).map((value, key) => <option key={key} value={value.state}>{value.state}</option>)



  function handleCountry(e: any) {
    setData({ ...data, country: e.target.value });
    console.log("selected country:", e.target.value, "selected country name:", e.target.name);
    setTouchedFields({ ...touchedFields, [e.target.name]: true });
  }

  function handleStateChange(e: any) {
    console.log("selected state:", e.target.value);
    setData({ ...data, state: e.target.value });
    setTouchedFields({ ...touchedFields, [e.target.name]: true });
  }

  const getData = () => {
    if (props != null) {
      setData(props?.value)
    }
  }

  useEffect(() => {
    getData()
  }, [])



  const handleClick = async (event: any) => {
    debugger
    if (props.value?.pid != "" && props.value?.pid != undefined) {
      let stringCheck = data.email;
      let myregex = new RegExp("[a-z0-9._%+\-]+@[a-z]+\.[a-z]{2,}$");
      let result = stringCheck.match(myregex);
      if (data.address != "" && data.fullname != "" && data.mobile.length == 10 && data.country.length > 1 && data.state.length > 1&& data.email != "" && result && data.gender != "" && data.dob != "") {
        console.log(Form.Check);
        const form = event.currentTarget;
        
        editPatient();

      }
      else{
        event.preventDefault();
        handleOpen();
      }
    }
    else {
      
      registerPatient(event);
    }
  }

  async function editPatient() {
    await editPatientData(data);
    info();
    props.childFunction();
    handleClose();

  }

  async function registerPatient(event:any) {
    debugger;
    let id: string = nanoid();
    setData({ ...data, pid: id });
    const isNameValid: boolean = NameValidator.validate(data.fullname);
    let isEmailValid: boolean = EmailValidator.validate(data.email);
    const isMobileValid = phone(data.mobile, { country: 'IN' });

    if (data.fullname != null && data.gender != null && data.dob != null && data.country.length > 1 && data.state.length > 1 && isEmailValid && isMobileValid.isValid) {
      if (isNameValid) {
        await save({ ...data, pid: id }).then((res) => {
          debugger

          if (res.status == 200) {
            alert('Data saved successfully...');
            success();
            event.preventDefault();
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
       if (data.fullname == null ? alert(`Enter valid fullname`) : data.gender == null ? alert(`Enter valid gender`) : data.dob == null ? alert(`Enter valid dob`) : data.refdoc == null ? alert(`Enter valid refdoc`) : data.address == null ? alert(`Enter valid address`) : data.country == null ? alert(`Enter valid country`) : data.state == null ? alert(`Enter valid state`) : data.mobile == null ? alert(`Enter valid mobile`) : data.email == null ? alert(`Enter valid email`) : "")
        debugger
      setData(data);
      setAddClass(true);
      console.log("touchedFields", touchedFields);

      setShowFields(true);
      handleOpen();
      //setOpen(props.open);
    }
  }

  function onChangeEvent(e: any) {
    debugger
    console.log("e.traget.name:", e.target.name);
    console.log("e.traget.value:", e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
    setVal(true);
    setTouchedFields({ ...touchedFields, [e.target.name]: true })
    if (e.target.name == "country") {
      handleCountry(e);
    }
    if (e.target.name == "state") {
      handleStateChange(e)
    }
    if (addClass) {
      if (e.target.value == null || e.target.value == "") {
        if (Object.keys(data).length === 0) {
          setAddClass(false);
        }
      }
    }
    else {
      setAddClass(true);
    }
  }

  const handleSubmit = (e: any) => {
    debugger
     e.preventDefault();
    console.log("event type:", e);
    const form = e.currentTarget;
    handleClick(e);

  }





  const convertToBase64 = (event: any) => {
    debugger
    console.log("event:", event.target);
    if (event != null) {
      if (event.target.value != "" && event.target.files[0].type.split("/")[0] === "image") {
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
      else {
        setData({ ...data, image: "" })
      }
    }


  };

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
            <Form className={addClass ? "was-validated" : ''}>
              <Form.Group className="modal-body">
                <Form.Group className="mb-3" controlId="image">
                  <Form.Label>Image</Form.Label>
                  <div className="imageBox" >
                    <img src={data?.image} className="imgBoxSize" />
                  </div>
                  <div >
                    <input type='file' id='image' accept=".png, .jpg, .jpeg" onChange={convertToBase64}>
                    </input>
                  </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="fullname">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder=" " name='fullname' pattern="^[a-zA-Z ]{3,}" value={data?.fullname} onChange={onChangeEvent}
                    required={true} />
                  <Form.Control.Feedback type="invalid" hidden={touchedFields.fullname || showFields ? false : true}>
                    Please enter valid name.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="gender">
                  <Form.Label>Gender: </Form.Label>
                  <Form.Select aria-label="Default select example" name="gender" className="form-control" value={data?.gender} onChange={onChangeEvent}
                    required={true} >
                    <option value="">Gender</option>
                    <option >Male</option>
                    <option >Female</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid" hidden={data?.gender || showFields ? false : true}>
                    Please select gender.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>DOB</Form.Label>
                  <Form.Control type="date" className="form-control" id="date-inp" placeholder="" max={maxDate} name='dob' value={data?.dob} onChange={onChangeEvent} required={true} isInvalid={false} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="refdoc">
                  <Form.Label>Ref. Doctor :</Form.Label>
                  <Form.Select aria-label="Default select example" name="refdoc" className="form-control" value={data?.refdoc} onChange={onChangeEvent} required={true} isInvalid={false}>
                    <option value="" >Select Doctor</option>
                    <option>Dr.1</option>
                    <option>Dr.2</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid" hidden={touchedFields.refdoc || showFields ? false : true}>
                    Please select Doctor.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" placeholder="" name='address' value={data?.address} onChange={onChangeEvent} required={true} isInvalid={false} />
                  <Form.Control.Feedback type="invalid" hidden={touchedFields.address || showFields ? false : true}>
                    Please enter address.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="country" >
                  <Form.Label >Country :</Form.Label>
                  <Form.Select aria-label="Default select example" className="form-control" name="country" value={data?.country} required={true} isInvalid={false} onChange={onChangeEvent}>
                    <option value="" >select country...</option>{ctryname}</Form.Select>
                  <Form.Control.Feedback type="invalid" hidden={touchedFields.country || showFields ? false : true}>
                    Please select country.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="state">
                  <Form.Label>State</Form.Label>
                  <Form.Select className="form-control" name="state" value={data?.state} onChange={onChangeEvent} required={true}><option value="">select state...</option>
                    {statefilter}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid" hidden={touchedFields.state || showFields ? false : true}>
                    Please select state.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="mobile">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control type="text" placeholder="" minLength={10} pattern="[0-9]{10}" name="mobile" value={data?.mobile} onChange={onChangeEvent} required={true} isInvalid={false} />
                  <Form.Control.Feedback type="invalid" hidden={touchedFields.mobile || showFields ? false : true}>
                    Please enter valid email .
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="" pattern="[a-z0-9._%+\-]+@[a-z]+\.[a-z]{2,}$" name="email" value={data?.email} onChange={onChangeEvent} required={true} isInvalid={false} />
                  <Form.Control.Feedback type="invalid" hidden={touchedFields.email || showFields ? false : true}>
                    Please enter valid email .
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="note">
                  <Form.Label>Note</Form.Label>
                  <Form.Control type="text" placeholder=" " value={data?.note} name="note" onChange={onChangeEvent} />
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




