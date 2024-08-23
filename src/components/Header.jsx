import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { LinkIcon, LogOut } from 'lucide-react';
import { UrlState } from '@/context';
import useFetch from '@/hooks/use-fetch';
import { logout } from '@/db/apiAuth';
import { BarLoader } from 'react-spinners';

function Header() {
    const navigate = useNavigate();
    const {user, fetchuser} = UrlState();
    const { loading , fn:fnlogout} = useFetch(logout)
  return (
  <>
   <nav className='py-4 flex justify-between items-center'>
    <Link to ="/">
    <h1 className='text-3xl font-bold text-[#FFD95A] mt-4 flex'>Tri<p className='text-[#FFF7D4] '>mmr</p></h1>
    </Link>
    {!user?
    <Button onClick={ () => navigate("/auth")} >Login</Button>
    : (
        <DropdownMenu>
        <DropdownMenuTrigger className='w-10 rounded-full overflow-hidden'>
        <Avatar >
            <AvatarImage src={user?.user_metadata?.profile_pic}/>
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <Link to= "/dashboard" className='flex'>
                <LinkIcon className='mr-2 h-4 w-4'/>
                My links
                </Link>
                </DropdownMenuItem>
            <DropdownMenuItem className = "text-red-500"> <LogOut  className='mr-2 h-4 w-4'/> <span
            onClick={ () => {
                fnlogout().then(() => {
                    fetchuser();
                    navigate("/")
                    })
            }}
            >Logout</span></DropdownMenuItem>
    </DropdownMenuContent>
    </DropdownMenu>
    )
    }
   </nav>
   {loading && <BarLoader className='mb-4' width={"100%"} color='#36d7b7'/>}
  </>
  )
}

export default Header