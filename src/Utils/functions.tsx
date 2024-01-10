import { useNavigate } from "react-router-dom";
import { Patients } from "../entities/Patients";
import axios from "axios";
import { url } from "./url";






export async function fetchData() {
  debugger
  try {
    const response = await axios.get(`${url}/patient`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      }
    })
    return response.data;
  }
  catch (error) {
    console.log("error:", error);
  }
}

export async function save(data: any){
  debugger
    const response= await axios.post(`${url}/patient/add`,data)
    .then((res) => {
      console.log(res.status,);
      return res.status
    });

    return response;
}

export async function editPatientData(data:Patients){
  debugger;
  const response = await axios.put(`${url}/patient/:id`,(data)).then((res) => {
    console.log(res.status);
    return res.status;
  });

  return response;
}

export async function deletePatientData(pid: string) {
  debugger;
  const response = await axios.delete(`${url}/patient/delete/${pid}`).then((res) => {
    return res.status
  });

  return response;
}

