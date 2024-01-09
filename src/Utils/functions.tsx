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
    console.log('response', response);
    console.log("response.data",response.data);
    return response.data;
  }
  catch (error) {
    console.log("Data not found");
    console.log("error:", error);
  }
}

export  function save(data: any){
  debugger
    console.log('data:',data);
    const response= axios.post(`${url}/patient/add`,data)
    .then((res) => {
      console.log(res.status, res.data.token);
    });
}

export async function editPatientData(data:Patients){
  debugger;
  const response = await axios.put(`${url}/patient/:id`,(data)).then((res) => {
    console.log(res.status, res.data.token);
  });
  console.log("response",response)
}

export async function deletePatientData(pid: string) {
  debugger;
  const response = await axios.delete(`${url}/patient/delete/${pid}`).then((res) => {
    console.log(res.status, "res token:", res.data);
    console.log("res.header",);
  });
  console.log("response", response);

}

