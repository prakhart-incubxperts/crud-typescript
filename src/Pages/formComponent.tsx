import React from "react";
import { ReactDOM } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { Patients } from "../entities/Patients";

 export function FormComponent(props:Patients){
    
    return(
        <>
             <Form>

<Form.Group className="mb-3" controlId="fullname">
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" className="form-control" placeholder="" name='fullname' onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {props.fullname}} required />
</Form.Group>
<Form.Group className="mb-3" controlId="gender">
    <Form.Label>Gender: &nbsp;</Form.Label>
    <Form.Select aria-label="Default select example" className="form-control" onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {props.gender}} required>
        <option>Gender</option>
        <option >Male</option>
        <option >Female</option>
    </Form.Select>
</Form.Group>
<Form.Group className="mb-3" controlId="dob">
    <Form.Label>DOB</Form.Label>
    <Form.Control type="date" placeholder="" className="form-control" name='dob' onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {props.dob}} required />
</Form.Group>
<Form.Group className="mb-3" controlId="refdoc">
    <Form.Label>Ref. Doctor:&nbsp; </Form.Label>
    <option>Doctor</option>
        <option >Dr. 1</option>
        <option >Dr. 2</option>
</Form.Group>
<Form.Group className="mb-3" controlId="address">
    <Form.Label>Address</Form.Label>
    <Form.Control type="text" placeholder="" name='address' onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {props.address}} />
</Form.Group>
<Form.Group className="mb-3" controlId="country">
    <Form.Label>Country: &nbsp;</Form.Label>
    <Form.Select aria-label="Default select example" onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {props.country}}>
        <option>Select Country</option>
        <option>India</option>
    </Form.Select>
</Form.Group>
<Form.Group className="mb-3" controlId="state">
    <Form.Label>State:&nbsp;</Form.Label>
    <Form.Select aria-label="Default select example" onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {props.state}}>
        <option>Select State</option>
        <option>MH</option>
        <option>Goa</option>
        <option>Delhi</option>
    </Form.Select>
</Form.Group>
<Form.Group className="mb-3" controlId="mobile">
    <Form.Label>Mobile</Form.Label>
    <Form.Control type="text" placeholder="" onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {props.mobile}} />
</Form.Group>
<Form.Group className="mb-3" controlId="email">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" placeholder="" onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {props.email}} isValid required />
</Form.Group>
<Form.Group className="mb-3" controlId="note">
    <Form.Label>Note</Form.Label>
    <Form.Control type="text" placeholder="" onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {props.note}} />
</Form.Group>
<Button variant="primary" type="submit">
    Submit
</Button>
</Form>   
        </>
    )
}
