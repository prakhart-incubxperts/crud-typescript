import React from "react";
import { ReactDOM } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import bootstarp from 'react-bootstrap';
import { save } from "../Utils/functions";
import { Patients } from "../entities/Patients";
import { nanoid } from 'nanoid';
import * as EmailValidator from 'email-validator';
import { NameValidator } from "clean-name-validator";
import '../Asset/imagebox.css';
const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

//import { patient } from "../entities/patient";


export function Registration() {

    // let details:Patients={
    //     pid: "",
    //     fullname: "",
    //     gender: "",
    //     dob: "",
    //     refdoc: "",
    //     address: "",
    //     country: "",
    //     state: "",
    //     mobile: "",
    //     email: "",
    //     note: "",
    //     image: ""
    // };
    //const [details,setDetails]=useState<Patients>({} as Patients);
    // const [pid, setPid] = useState<string | any>();
    // const [fullname, setFullname] = useState<string | any>();
    // const [address, setAddress] = useState<string | any>();
    // const [refdoc, setRefdoc] = useState<string | any>();
    // const [email, setEmail] = useState<string | any>();
    // const [country, setCountry] = useState<string | any>();
    // const [state, setState] = useState<string | any>();
    // const [gender, setGender] = useState<string | any>();
    // const [dob, setDob] = useState<string | any>();
    // const [note, setNote] = useState<string | any>();
    // const [mobile, setMobile] = useState<string | any>();
       const [image, setImage] = useState<string | any>();
    const Navigate = useNavigate();


    // function registerPatient(): void {
    //     debugger;
    //     let id: string = nanoid();
    //     const isNameValid: boolean = NameValidator.validate(fullname);
    //     let isValid: boolean = EmailValidator.validate(email);
    //     //setPid(id);
    //     if (fullname != null && gender != null && dob != null && email != null && isValid) {

    //         if (isNameValid) {
    //             const details: Patients = { pid: id, fullname: fullname, gender: gender, dob: dob, refdoc: refdoc, address: address, country: country, state: state, mobile: mobile, email: email, note: note, image: image };
    //             const res = save(details);
    //             alert('Data saved successfully...');

    //             Navigate("/");
    //         }
    //         else {
    //             alert('Enter valid data');
    //         }
    //     }
    //     else {
    //         alert('Fields can not be empty...');
    //     }
    // }

    const onImageChange = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            console.log('image:', event.target.files[0].name);
            setImage(URL.createObjectURL(event.target.files[0]));
            // imageToBase64(event.target.files[0].name) // Image URL
        }

    }

    return (
        <div>

            <div className="form-group " >
                <div className="imageBox" >
                    <img src={image} style={{ height: '120px', width: '120px' }} />
                </div>
                <div>
                    <input type='file' id='image' onChange={onImageChange}>
                    </input>

                </div>
            </div>
             
        </div>
    );
}

function imageToBase64(name: any) {
    throw new Error("Function not implemented.");
}
//pid={""} fullname={""} gender={""} dob={""} refdoc={""} address={""} country={""} state={""} mobile={""} email={""} note={""} image={""}S
