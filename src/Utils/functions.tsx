import { log } from "console";
//import { patient } from "../entities/patient";


export function save(data: any){
    console.log('data:',data);
    
    var array = JSON.parse(localStorage.getItem('PatientDetails') || '[]');
    array.push(data);
  localStorage.setItem('PatientDetails', JSON.stringify(array));
  
}