'use client';
import Link from 'next/link'
import React from 'react'
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {AiFillBug} from 'react-icons/ai'
import { usePathname } from 'next/navigation'
import classNames from 'classnames' //is a function and takes object (classes and conditions to render those classes) (key: classes, value: true/false)
import {useSession} from 'next-auth/react'
import { Box, Flex, Container, DropdownMenu, Avatar, Text } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const NavBar = () => {
   
  return (
    <nav className='border-b mb-5 px-5 py-3'>
        <Container>
        <Flex justify="between" >
            <Flex align="center" gap="3">
            <Link href="/"><AiFillBug/></Link>
            <NavLinks/>
            </Flex>
            <AuthStatus/>   
        </Flex>
        </Container>
       
        
    </nav> 
  )
}
const NavLinks = () =>{
    const currentPath = usePathname();
    
    const Links = [
        { 'href' : '/' , 'label' : 'Dashboard'},
        { 'href' : '/issues' , 'label' : 'Issues'}
    ]
    return (<ul className="flex space-x-6">
    {Links.map(link =>
    <li  key = {link.href} >
    <Link
    className= {
        classNames({
            " nav-link ": true,
            '!text-zinc-900' : link.href === currentPath,
         })
    }
    href={link.href}>
    {link.label}
    </Link> </li> )}
</ul>)
}
const AuthStatus = () => {
    const { status, data: session } = useSession();
  const router = useRouter();

  if (status === "loading") return <Skeleton width="3rem" />;
  
  if (status === "unauthenticated") {
    return <Link className="nav-link" href="/api/auth/signin">Login</Link>;
  }

  const handleLogout = () => {
    // Use NextAuth's signOut method to log the user out and automatically redirect
    signOut({
      redirect: true,  // This ensures the user is redirected
      callbackUrl: '/' // Redirect to the homepage after logout
    });
  };

return(
    <Box>
     <DropdownMenu.Root>
     <DropdownMenu.Trigger>
     <button style={{ all: "unset", cursor: "pointer" }}>
        <Avatar
        src={session!.user?.image!}
        fallback="?"
        referrerPolicy='no-referrer'
        radius="full"
        />
        </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="bg-white border border-gray-300 rounded shadow-md p-2">
                <DropdownMenu.Label>
                <Text size="2">{session!.user?.email}</Text>
                </DropdownMenu.Label>
                <DropdownMenu.Item>
            <button onClick={handleLogout}>Log out</button>
          </DropdownMenu.Item>

            </DropdownMenu.Content>
            </DropdownMenu.Root>
    </Box>
)
}

export default NavBar
