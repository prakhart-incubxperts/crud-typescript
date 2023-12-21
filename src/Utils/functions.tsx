import { log } from "console";
import { Patients } from "../entities/Patients";
//import { patient } from "../entities/patient";


export function save(data: any){
    console.log('data:',data);
    
    var array = JSON.parse(localStorage.getItem('PatientDetails') || '[]');
    array.push(data);
  localStorage.setItem('PatientDetails', JSON.stringify(array));
  
}

export function editPatientData(id:string){
   
 
  let data;
      const value=localStorage.getItem('PatientDetails');
      console.log(value);
      var index:number=0;
      if (typeof value === 'string') {
         data = JSON.parse(value) // ok
         console.log('dat',data)
         data.findIndex(function (entry:any, i:number) { 
          if (entry.pid == (id)) { 
              index = i; 
              return true; 
          } 
      });

      var splcdData=data.splice(index,id);
      const details:Patients={pid:id,fullname:fullname,gender:gender,dob:dob, refdoc:refdoc, address:address, country:country, state:state, mobile:mobile, email:email, note:note, image:image};
    }
    else{
      console.log('something went wrong...');
      
    }
      
   
   
    
}

export function deletePatientData(){

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

