import React, { useEffect, useMemo, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Patients, PostsProps } from '../entities/Patients';
import { deletePatientData, editPatientData, fetchData } from '../Utils/functions';
import { Button, Dropdown } from 'react-bootstrap';
//import Button from 'react-bootstrap/Button';
import { Navigation, Route, useNavigate } from 'react-router-dom';
import FormComponent from './formComponent';


export function PatientDetails() {


  const [isClicked, setIsClicked] = useState(false);
  const [data, setData] = useState<Patients>({ pid: "", fullname: "", gender: "", dob: "", refdoc: "", address: "", country: "", state: "", mobile: "", email: "", note: "", image: "" });
  let oldpid: string, oldimage: string;
  const [fetchedValue, setFetchedValue] = useState<Patients>(data);
  const [input, setInput] = useState<Patients | any>();
  const [txt, setTxt] = useState('');
  const Navigation =useNavigate();
  useEffect(() => {
    fetchingdata();
  }, []);

  async function edit(pid: string) {
    debugger;
   const detail=await fetchData()
    oldpid = pid;
    let data: Patients[];
    const value = detail;
    if (!value.isEmpty) {
      data = value;
      var index: number = 0;
      data.findIndex(function (entry: any, i: number) {
        if (entry.pid == (pid)) {
          index = i;
          return true;
        }
      });
      let fetchedValue = (Object.values(data)[index]);
      setFetchedValue(fetchedValue);
      setIsClicked(true);
    }

  }

  let det: any;
   async function fetchingdata() {
    debugger
    const data = await fetchData();
    setInput(data);
    setData(data);
    det = data;
   }

    async function deletePatient(pid: string) {
     await deletePatientData(pid);
     await fetchingdata();
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
        sortable: true,
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
        sortable: true,
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
        cell: row => <button className='btn btn-warning' onClick={() => edit(row.pid)}>edit</button>
      },
      {
        name: 'Action delete',
        cell: row => {
          return <button className='btn btn-danger'  onClick={() => deletePatient(row.pid)}>delete</button>
        }
      },
    ],
    []
  );


  
  
   async function funcCall(){
    await fetchingdata();
  }

  function handleRegister() {
    setFetchedValue(data);
    setIsClicked(true);
  }

  function handleCancel() {
    setIsClicked(false);
  }
  const propsToCheck = ['fullname', 'refdoc', 'email'];
  function filterData(text: string) {
    
    if (text != "") {
      const result = filterByValue(data, text)
      setInput(result);
    }
    else {
      setInput(data);
    }
    function filterByValue(array: any, string: string) {
      return array.filter((o: any) =>
        propsToCheck.some(k => String(o[k]).toLowerCase().includes(string.toLowerCase())
        )
      );
    }
  }
  

  return (

    <>
      <input className="col-md-3" type="search" placeholder="Search" aria-label="Search" onChange={((e) => { filterData(e.target.value) })}></input>
      <Button variant="primary" className="btn-right" type="button" onClick={handleRegister}>Register</Button>

      <DataTable
        columns={columns}
        data={input}
        pagination
        responsive
      />
      {isClicked && <FormComponent open={isClicked} childFunction={funcCall} value={fetchedValue} cancel={handleCancel} />}
    </>
  )
}