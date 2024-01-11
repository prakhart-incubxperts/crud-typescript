import { useNavigate } from "react-router-dom";
import { Patients } from "../entities/Patients";
import axios from "axios";
import { url } from "./url";






export async function fetchData() {
  debugger
  try {
    const response = await axios.get(`${url}/patient`)
      
    return response.data;
    }
  catch (error) {
    console.log("error:", error);
  }
}


export async function save(data: any){
  return  await axios.post(`${url}/patient/add`,data);
}
    

export async function editPatientData(data:Patients){
return await axios.put(`${url}/patient/:id`,(data));
}

export async function deletePatientData(pid: string) {
  return await axios.delete(`${url}/patient/delete/${pid}`);
}

