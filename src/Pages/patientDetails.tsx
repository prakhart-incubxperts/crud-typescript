import React, { useEffect, useMemo, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Patients, PostsProps } from '../entities/Patients';
import { deletePatientData, editPatientData } from '../Utils/functions';
import { Button } from 'react-bootstrap';
//import Button from 'react-bootstrap/Button';
import { Route, useNavigate } from 'react-router-dom';
import FormComponent from './formComponent';

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



export function PatientDetails() {
  //debugger
  const [isClicked,setIsClicked]=useState(false);
  const [data, setData] = useState<Patients>({ pid: "", fullname: "", gender: "", dob: "", refdoc: "", address: "", country: "", state: "", mobile: "", email: "", note: "", image: "" });
  const Navigation = useNavigate();
  let editedData: Patients;
  let oldpid: string, oldimage: string;
  const [fetchedValue,setFetchedValue]=useState<Patients>(data);

  
  function edit(pid: string) {
    
    debugger;
    oldpid = pid;
    console.log(' called from edit pid:', oldpid);
    let data: Patients[];
    const value = localStorage.getItem('PatientDetails');
    if (typeof (value) === 'string') {
      data = JSON.parse(value);
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
    deletePatientData(pid);
    Navigation("/");
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
  //let localStorage:any;
  let dat;
  const value = localStorage.getItem('PatientDetails');
  console.log(value);

  if (typeof value === 'string') {
    dat = JSON.parse(value) // ok 
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
        data={dat}
      />
      {isClicked && <FormComponent open={isClicked} value={fetchedValue} cancel={handleCancel}/>}
    </>
  )
}