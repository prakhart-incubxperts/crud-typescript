import React, { useEffect, useMemo, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Patients, PostsProps } from '../entities/Patients';
import { editPatientData } from '../Utils/functions';
import { Button } from 'react-bootstrap';
//import Button from 'react-bootstrap/Button';
import { Route, useNavigate } from 'react-router-dom';
import FormComponent from './formComponent';
import axios from 'axios';
import { log } from 'console';
import { url } from 'inspector';

const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  overflow: 'scroll',
  height: '100%'
};



export  function PatientDetails() {
  
  //debugger
  const [isClicked,setIsClicked]=useState(false);
  const [data, setData] = useState<Patients>({ pid: "", fullname: "", gender: "", dob: "", refdoc: "", address: "", country: "", state: "", mobile: "", email: "", note: "", image: "" });
  const Navigation = useNavigate();
  let editedData: Patients;
  let oldpid: string, oldimage: string;
  const [fetchedValue,setFetchedValue]=useState<Patients>(data);
  useEffect(() => {
    fetchData();
  }, []);
  
  function edit(pid: string) {
    
    debugger;
    oldpid = pid;
    console.log(' called from edit pid:', oldpid);
    let data: Patients[];
     const value = det;
     console.log("value=",value);
     console.log("typeof value=",typeof(value));
     if (!value.isEmpty) {
      data = value;
      var index: number = 0;
      data.findIndex(function (entry: any, i: number) {
        if (entry.pid == (pid)) {
          index = i;
          return true;
        }
      });
       let fetchedValue =(Object.values(data)[index]);
      
      setFetchedValue(fetchedValue);
      setIsClicked(true);
    }

  }

  function deletePatient(pid: string) {
    debugger;
    deletePatientData(pid)
    Navigation("/");
    
  }
   async function deletePatientData(pid:string){
    debugger;
    const response= await axios.delete(`http://localhost:9000/patient/delete/${pid}`).then((res)=>{
      console.log(res.status,"res token:",res.data);
      console.log("res.header",); 
    });
    console.log("response",response);
    fetchData();
  }




  const columns: TableColumn<Patients>[] = useMemo(() =>
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
  
  // let dat;
  // const value = localStorage.getItem('PatientDetails');
  // console.log("value:",value);

  // if (typeof value === 'string') {
  //   dat = JSON.parse(value) // ok 
  // }
  // console.log("dat",dat);
  let det:any;
  const [input,setInput]=useState<Patients|any>();
  
   async function fetchData(){
    debugger
    try{
      const response=await axios.get('http://localhost:9000/patient', {
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
          } })
      console.log('response',response);
      
      det=(response.data);
      console.log("dat",det);
      setInput(det);
      console.log("inputdata=",input);
      
      
    }
    catch(error){
      console.log("Data not found");
      console.log("error:",error);
      
      
    }
  }
  

  function handleRegister(){
    setFetchedValue(data);
    setIsClicked(true);
    
  }
  function handleCancel(){
    setIsClicked(false);
    
  }
  return (
    
    <>
    <Button variant="primary" className="btn-right" type="button"   onClick={handleRegister}>Register</Button>
      
      <DataTable
        columns={columns}
        data={input}
      />
      {isClicked && <FormComponent open={isClicked} value={fetchedValue} cancel={handleCancel}/>}
    </>
  )
}