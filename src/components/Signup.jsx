import React, { useEffect, useState } from 'react'
import Error from "../components/error"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from './ui/input';
import { Button } from './ui/button';
import { BeatLoader } from 'react-spinners';
import * as Yup from "yup"
import useFetch from '@/hooks/use-fetch';
import { signup} from '@/db/apiAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UrlState } from '@/context';



function Signup() {
  const [errors, setErrors] = useState({});
  const[formData,setFormdata] = useState({
    name: '',
    email: '',
    password: '',
    profile_pic: null
  })
  const navigate = useNavigate();
  const [searchParams] =  useSearchParams();
  const Longlink = searchParams.get("createNew");
  
  const handleSignup= async() =>{
    setErrors([])
    try {
      const schema = Yup.object().shape({
        name : Yup.string().required("Name is required"),
        email : Yup.string().email("Invalid Email ").required("Email is Required "),
        password : Yup.string().min(6,"Minimum 6 characters requires").required("Password is required")
      })
      await schema.validate(formData,{abortEarly:false})
      await Signupfn();
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((e) => {
        newErrors[e.path] = e.message;
      });

      setErrors(newErrors);
    }
  }

  const handleInputChange = (e) =>{
    const {name , value,files} = e.target;
    setFormdata((prevState) => ({
      ...prevState,
      [name] : (files)? files[0] : value,
    })) 
  }
  const {data,error,loading,fn:Signupfn} =  useFetch(signup,formData);
  const { fetchuser } = UrlState();

  useEffect(() =>{
     if(error === null && data) {
      navigate(`/dashboard?${Longlink ? `createNew=${Longlink}` : " "}`)
        fetchuser();
    }
    console.log(data)

  },[error,loading])

  return (
    <Card >
    <CardHeader>
      <CardTitle className="flex justify-center text-[#E2DFD0]">Signup</CardTitle>
      <CardDescription className="flex justify-center text-[#9290C3] pt-1">
      New here? Join us. Already a member? Log in.
      </CardDescription>
     {error && <Error message={error.message}/>}
    </CardHeader>
    <CardContent className="space-y-2">
    <div className="space-y-1">
        <Input
          name="name"
          type="text"
          placeholder="Enter Name"
          onChange={handleInputChange}
        />
      </div>
      {errors.name && <Error message={errors.name} />}
      <div className="space-y-1">
        <Input
          name="email"
          type="email"
          placeholder="Enter Email"
          onChange={handleInputChange}
        />
       
      </div>
      {errors.email && <Error message={errors.email} />}
      <div className="space-y-1">
        <Input
          name="password"
          type="password"
          placeholder="Enter Password"
          onChange={handleInputChange}
        />
      </div>
      {errors.password && <Error message={errors.password} />}
      <div className="space-y-1">
        <Input
          name="profile_pic"
          type="File"
          accept = "image/*"
          onChange={handleInputChange}
        />
      </div>
      {errors.profile_pic && <Error message={errors.profile_pic} />}
    </CardContent>
    <CardFooter className ="flex justify-center">
    <Button onClick={handleSignup}
    className="bg-[#1E1F21] text-white hover:bg-[#333738] ">
      {loading ? <BeatLoader size={10} color="#8CC4C7" /> : "Create Account"}
    </Button>
    </CardFooter>
  </Card>
);
};
  
  
export default Signup