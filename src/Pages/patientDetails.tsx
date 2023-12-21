import React, { useEffect, useMemo, useState } from 'react';
import DataTable, {TableColumn} from 'react-data-table-component';
import { Patients, PostsProps } from '../entities/Patients';
import { deletePatientData, editPatientData } from '../Utils/functions';
import { Button } from 'react-bootstrap';
//import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'scroll',
    height: '100%'
  };



export function PatientDetails(): JSX.Element{

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
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [formValue,setFormValue]=useState<Patients>();
    var oldpid:string,oldimage:string;
    function edit(pid:string){

        console.log('pid from edit():',pid);
        console.log('pid',pid);
                oldpid=pid;

    console.log(' called from edit pid:', oldpid);

    let data;
    const value=localStorage.getItem('PatientDetails');
    if(typeof(value)==='string'){
        data = JSON.parse(value);

        var index:number=0;
    data.findIndex(function (entry:any, i:number) {
      if (entry.pid == (pid)) {
        index = i;
        return true;
      }
    });

    let firstValue:any = Object.values(data)[index];
    oldimage=firstValue.image;
    console.log("fetched data",firstValue);
    console.log("fetched data fullname:",firstValue.fullname);
    
    setFormValue(firstValue);
    console.log('formValue type:',typeof(formValue));
    setFullname(firstValue.fullname);
    setGender(fullname.gender);
    setDob(firstValue.dob);
    setAddress(firstValue.address);
    setRefdoc(firstValue.refdoc);
    setCountry(firstValue.country);
    setState(firstValue.state);
    setEmail(firstValue.email);
    setMobile(firstValue.mobile);
    setNote(firstValue.note);


    //console.log('formValue dob:',formValue.dob);
    handleOpen();
    }
    


    
        
        editPatientData(pid);
    }
    function deletePatient(pid:string){
        deletePatientData();
    }



   
    const columns:TableColumn<Patients>[]=useMemo(()=>
    [
        {
          name: 'Id',
          selector: row => row.pid,
        },
        {
          name: 'Name',
          selector: row => row.fullname,
        },
        {
          name: 'Gender',
          selector: row => row.gender,
        },
        {
          name: 'DOB',
          selector: row => row.dob,
        },
        {
          name: 'Ref. Doctor',
          selector: row => row.refdoc,
        },
        {
          name: 'Address',
          selector: row => row.address,
        },
        {
          name: 'Country',
          selector: row => row.country,
        },
        {
          name: 'State',
          selector: row => row.state,
        },
        {
          name: 'Mobile',
          selector: row => row.mobile,
        },
        {
          name: 'Email',
          selector: row => row.email,
        },
        {
          name: 'Note',
          selector: row => row.note,
        },
        {
          name: 'Action edit',
          cell: row => <button className='btn btn-primary' onClick={() => edit(row.pid)}>edit</button>,
        },
        {
          name: 'Action delete',
          cell: row => {
            return <button className='btn btn-danger' onClick={() => deletePatient(row.pid)}>delete</button>
          }
        },
      ],
      []
    );
      //let localStorage:any;
      let dat;
      const value=localStorage.getItem('PatientDetails');
      console.log(value);
      
      if (typeof value === 'string') {
         dat = JSON.parse(value) // ok

        
    }
      //let dat= (JSON.parse(localStorage.getItem('PatientDetails')));
    //   useEffect(() => {
    //     console.log('table data:', data);
    //   })
    console.log('dat',dat)

    return(
        <>
            <DataTable
                columns={columns}
                data={dat}
            />
            
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
                                            <Form.Control type="text" placeholder="" name='fullname' value={fullname} onChange={(event:React.ChangeEvent<HTMLTextAreaElement>):void=>{
                        setFullname(event.target.value);
                      }} required/>
                                         </Form.Group>
                                        <Form.Group className="mb-3" controlId="gender">
                                            <Form.Label>Gender: </Form.Label>
                                            <Form.Select aria-label="Default select example" value={gender} onChange={(event:React.ChangeEvent<HTMLSelectElement>):void=>{
                        setGender(event.target.value);
                      }} required>
                                                <option>Gender</option>
                                                <option >Male</option>
                                                <option >Female</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="dob">
                                            <Form.Label>DOB</Form.Label>
                                            <Form.Control type="date" placeholder="" name='dob' value={dob} onChange={(event:React.ChangeEvent<HTMLInputElement>):void=>{
                        setDob(event.target.value);
                      }} required/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="refdoc">
                                            <Form.Label>Ref. Doctor :</Form.Label>
                                            <Form.Select aria-label="Default select example" value={refdoc} onChange={(event:React.ChangeEvent<HTMLSelectElement>):void=>{
                        setRefdoc(event.target.value);
                      }}>
                                                <option>Select Doctor</option>
                                                <option>Dr.1</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="address">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control type="text" placeholder="" name='address' value={address} onChange={(event:React.ChangeEvent<HTMLTextAreaElement>):void=>{
                        setAddress(event.target.value);
                      }}/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="country">
                                            <Form.Label>Country :</Form.Label>
                                            <Form.Select aria-label="Default select example" value={country} onChange={(event:React.ChangeEvent<HTMLSelectElement>):void=>{
                        setCountry(event.target.value);
                      }}>
                                                <option>Select Country</option>
                                                <option>India</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="state">
                                            <Form.Label>State</Form.Label>
                                            <Form.Select aria-label="Default select example" value={state} onChange={(event:React.ChangeEvent<HTMLSelectElement>):void=>{
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
                                            <Form.Control type="text" placeholder="" value={mobile} onChange={(event:React.ChangeEvent<HTMLTextAreaElement>):void=>{
                        setMobile(event.target.value);
                      }}/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="email">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="" value={email} onChange={(event:React.ChangeEvent<HTMLTextAreaElement>):void=>{
                        setEmail(event.target.value);
                      }} isValid required/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="note">
                                            <Form.Label>Note</Form.Label>
                                            <Form.Control type="text" placeholder="" value={note} onChange={(event:React.ChangeEvent<HTMLTextAreaElement>):void=>{
                        setNote(event.target.value);
                      }}/>
                                        </Form.Group>
                                        <Button variant="primary" type="submit" >
                                            Submit
                                        </Button>
             </Form>
                        </Box>
                      </Fade>
                    </Modal>
        </>
    )
}