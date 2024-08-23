import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Signup from '@/components/Signup'
import Login from '@/components/Login'
import { UrlState } from '@/context'

function Auth() {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {isAuthenticated, loading} = UrlState();
  const Longlink = searchParams.get("createNew");

  useEffect(() => {
    if (isAuthenticated && !loading)
      navigate(`/dashboard?${Longlink ? `createNew=${Longlink}` : ""}`);
  }, [isAuthenticated, loading, navigate]);


  return (
    <div className='mt-24  flex flex-col items-center gap-10'>
    <h1 className='text-5xl font-extrabold text-center relative'>
      {Longlink?  
      (
            <span className='text-red-400'>
              <span className=''>Hold up! </span> 
              <span className='mt-2 text-blue-300'>Let's Login first..</span>
            </span>
          )
        : (
          <>
            <span className='text-blue-400'>Login</span>
            <span className='text-slate-300'> / </span>
            <span className='text-yellow-400'>Signup</span>
          </>
        )
      }
    </h1>

    <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
         <Login/>
        </TabsContent>
        <TabsContent value="signup">
        <Signup/>
        </TabsContent>
      </Tabs>

  </div>

  )
}

export default Auth