'use client'
import { useState } from "react";
import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from "dayjs";
import { InputAdornment, TextField, Button } from "@mui/material";
import { AppError } from "./common";
import { useRouter } from 'next/navigation'

export type FormDataType = {
    firstName:string,
    lastName:string,
    email:string,
    phone:string,
    checkInDate:Dayjs|null,
    checkOutDate:Dayjs|null,
    userId:number,
    roomId:number,
}

export function BookingForm(props:{price:number,roomId:number,userId:number}){
    const [formData, setFormData] = useState<FormDataType>({
        roomId: props.roomId,
        userId: props.userId,
        firstName: '',
        lastName:'',
        email: '',
        phone: '',
        checkInDate: null,
        checkOutDate: null,
      });

    const router = useRouter();
    
    const handleCheckInDateChange = (date:Dayjs|null) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            checkInDate: date,
        }));
    };
    
    const handleCheckOutDateChange = (date:Dayjs|null) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            checkOutDate: date,
        }));
    };
      
    const handleChange = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,

    }));
    };
    const handleSubmit = async () => {
        const res = await fetch('/api/bookings',{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
              },
            body:JSON.stringify(formData),
            })
        
        if(res.ok) {
            alert("Booking complete!");
            router.replace('/');
        }
    }
    const price = (formData.checkInDate && formData.checkOutDate)? 
        (formData.checkOutDate.unix() - formData.checkInDate.unix())/60/60/24*props.price
        :0;
    const err = validateForm(formData);

    return(
        <form className="form-container flex flex-col items-center bg-slate-100 rounded-xl p-2 m-2 gap-2">
            <TextField
            id="firstName"
            className="text-white"
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            />
            <TextField
            id="lastName"
            className="text-white"
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            />
            <TextField
            id="email"
            label="Email"
            className="text-white"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={formData.email}
            onChange={handleChange}
            />
            <TextField
            id="phone"
            label="Phone"
            className="text-white"
            variant="outlined"
            fullWidth
            margin="normal"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            />
            <div className="relative">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                <div className="flex gap-2 items-center justify-center">
                    <div className="flex gap-2 flex-col xs:flex-row">
                    <DatePicker
                        className="max-w-40"
                        label="Check-in date"
                        value={formData.checkInDate}
                        onChange={handleCheckInDateChange}
                    />
                    <DatePicker
                        className="max-w-40"
                        label="Check-out date"
                        value={formData.checkOutDate}
                        onChange={handleCheckOutDateChange}
                    />
                    </div>
                </div>
                </DemoContainer>
            </LocalizationProvider>
            </div>
            <p className="text-slate-900">
                Total price: {price}
            </p>
            {err.email && <AppError error={err.email}/>}
            {err.phone && <AppError error={err.phone}/>}
            {err.date && <AppError error={err.date}/>}
            <Button variant="contained" color="primary" type="button" disabled={price<=0 || (err.date || err.email || err.phone)?true:false}
                onClick={handleSubmit}> 
            Submit
            </Button>
      </form>
      )
}

const phoneRegex = /^\d{3}\d{3}\d{4}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


function validateForm(values:FormDataType) {
    const errors:{email?:string,phone?:string,date?:string} = {};

    if(values.checkInDate && values.checkInDate?.toDate().getTime()<Date.now()) {
        errors.date = "Invalid check-in / check-out date"
    } else if (values.checkInDate && values.checkOutDate && 
        values.checkInDate.toDate().getTime()>=values.checkOutDate.toDate().getTime()){
        errors.date = "Invalid check-in / check-out date"
    }
  
    if (!emailRegex.test(values.email)) {
      errors.email = 'Invalid email format';
    }
  
    if (!phoneRegex.test(values.phone)) {
      errors.phone = 'Invalid phone number format';
    }
  
    return errors;
  }

