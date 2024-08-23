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
import { login } from '@/db/apiAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UrlState } from '@/context';


function Login() {
  const [errors, setErrors] = useState({});
  const[formData,setFormdata] = useState({
    email: '',
    password: '',})
  const navigate = useNavigate();
  const [searchParams] =  useSearchParams();
  const Longlink = searchParams.get("createNew");
  
  const handleLogin = async() =>{
    setErrors([])
    try {
      const schema = Yup.object().shape({
        email : Yup.string().email("Invalid Email ").required("Email is Required "),
        password : Yup.string().min(6,"Minimum 6 characters requires").required("Password is required")
      })
      await schema.validate(formData,{abortEarly:false})
      await Loginfn();
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((e) => {
        newErrors[e.path] = e.message;
      });

      setErrors(newErrors);
    }
  }

  const handleInputChange = (e) =>{
    const {name , value} = e.target;
    setFormdata((prevState) => ({
      ...prevState,
      [name] : value,
    }))
  }
  const {data,error,loading,fn:Loginfn} =  useFetch(login,formData);
  const { fetchuser } = UrlState();

  useEffect(() =>{
     if(error === null && data) {
      navigate(`/dashboard?${Longlink ? `createNew=${Longlink}` : " "}`)
        fetchuser();
    }
    console.log(data)

  },[data,error])

  return (
    <Card classsname ="mt-10">
    <CardHeader>
      <CardTitle className="flex justify-center text-[#E2DFD0]">Login</CardTitle>
      <CardDescription className="flex justify-center text-[#9290C3] pt-1">
      Already a member? Log in. New here? Join us.
      </CardDescription>
     {error && <Error message={error.message}/>}
    </CardHeader>
    <CardContent className="space-y-2">
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
    </CardContent>
    <CardFooter className ="flex justify-center">
    <Button onClick={handleLogin}
    className="bg-[#1E1F21] text-white hover:bg-[#333738] ">
      {loading ? <BeatLoader size={10} color="#8CC4C7" /> : "Login"}
    </Button>
    </CardFooter>
  </Card>
);
};
  
  
export default Login;