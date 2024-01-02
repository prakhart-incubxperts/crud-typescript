import { log } from "console";
import { Patients } from "../entities/Patients";
import { useNavigate } from "react-router-dom";




export function save(data: any){
    console.log('data:',data);
    
    var array = JSON.parse(localStorage.getItem('PatientDetails') || '[]');
    array.push(data);
  localStorage.setItem('PatientDetails', JSON.stringify(array));
  
}

export function deletePatientData(pid:string){
  debugger;
  let data:any[];
  const value=localStorage.getItem('PatientDetails');
  //console.log(value);
  var index:number=0;
  if (typeof value === 'string') {
     data = JSON.parse(value) // ok
     console.log('dat',data)
     data.findIndex(function (entry:any, i:number) { 
      if (entry.pid == (pid)) { 
          index = i; 
          return true; 
      } 
  });
  console.log('type of data:',typeof(data));
  
  var splcdData=data.splice(index,1);
  console.log('data after splice:',data);
  localStorage.setItem('PatientDetails', JSON.stringify(data));
  
}
}


export function editPatientData(data:Patients){
  
debugger;
  if(data != null){
    let datas: Patients[];
    const value = localStorage.getItem('PatientDetails');
    if (typeof (value) === 'string') {
      datas = JSON.parse(value);
      var index: number = 0;
      datas.findIndex(function (entry: any, i: number) {
        if (entry.pid == (data.pid)) {
          index = i;
          return true;
        }
      });
    let splcdData: Patients[] = datas.splice(index, 1);
      
    if (datas.length != 0) {
        localStorage.setItem('PatientDetails', JSON.stringify(datas));
        var array = JSON.parse(localStorage.getItem('PatientDetails') || '[]');
    array.push(data);
  localStorage.setItem('PatientDetails', JSON.stringify(array));
  alert("Data changed successfully...");
      }
      else{
          var array = JSON.parse('[]');
         array.push(data);
      localStorage.setItem('PatientDetails', JSON.stringify(array));
      }
      
    
    
  }
  else{
    alert("Something went wrong...")
  }
  
  
}
}



















// {
//   // interface data extends Patients{};
//   // let user=localStorage.getItem('PatientDetails');
//   // let data:any =(JSON.parse(user)); 
  
//   // data=JSON.parse(model);
// //   const retrieveUser = (): Patients | null => {
// //     const userData = localStorage.getItem('PatientDetails');
// //     return userData ? JSON.parse(userData) as Patients : null;
// // };
// }

