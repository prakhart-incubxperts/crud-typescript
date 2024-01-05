import { log } from "console";
import { Patients } from "../entities/Patients";
import { useNavigate } from "react-router-dom";
import axios from "axios";




export  function save(data: any){
  debugger
    console.log('data:',data);
    const response= axios.post('http://localhost:9000/patient/add',data)
    .then((res) => {
      console.log(res.status, res.data.token);
    });
  //   var array = JSON.parse(localStorage.getItem('PatientDetails') || '[]');
  //   array.push(data);
  // localStorage.setItem('PatientDetails', JSON.stringify(array));
  
}

// export async function deletePatientData(pid:string){
//   debugger;
//   const Navigate=useNavigate();
//   const response= await axios.delete(`http://localhost:9000/patient/delete/:id${pid}`).then((res)=>{
//     console.log(res.status,"res token:",res.data);
    
//   });
//   console.log("response",response);
//   Navigate("/");

// //   let data:any[];
// //   const value=localStorage.getItem('PatientDetails');
// //   //console.log(value);
// //   var index:number=0;
// //   if (typeof value === 'string') {
// //      data = JSON.parse(value) // ok
// //      console.log('dat',data)
// //      data.findIndex(function (entry:any, i:number) { 
// //       if (entry.pid == (pid)) { 
// //           index = i; 
// //           return true; 
// //       } 
// //   });
// //   console.log('type of data:',typeof(data));
  
// //   var splcdData=data.splice(index,1);
// //   console.log('data after splice:',data);
// //   localStorage.setItem('PatientDetails', JSON.stringify(data));
  
// // }
// }


export async function editPatientData(data:Patients){
  debugger;
  const response = await axios.put('http://localhost:9000/patient/:id',(data)).then((res) => {
    console.log(res.status, res.data.token);
  });
  console.log("response",response)
  

//   if(data != null){
//     let datas: Patients[];
//     const value = localStorage.getItem('PatientDetails');
//     if (typeof (value) === 'string') {
//       datas = JSON.parse(value);
//       var index: number = 0;
//       datas.findIndex(function (entry: any, i: number) {
//         if (entry.pid == (data.pid)) {
//           index = i;
//           return true;
//         }
//       });
//     let splcdData: Patients[] = datas.splice(index, 1);
      
//     if (datas.length != 0) {
//         localStorage.setItem('PatientDetails', JSON.stringify(datas));
//         var array = JSON.parse(localStorage.getItem('PatientDetails') || '[]');
//     array.push(data);
//   localStorage.setItem('PatientDetails', JSON.stringify(array));
//   alert("Data changed successfully...");
//       }
//       else{
//           var array = JSON.parse('[]');
//          array.push(data);
//       localStorage.setItem('PatientDetails', JSON.stringify(array));
//       }
      
    
    
//   }
//   else{
//     alert("Something went wrong...")
//   }
  
  
// }
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

