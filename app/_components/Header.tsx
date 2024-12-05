"use client"
import React, { useState } from 'react'
import {
    Navbar, 
    NavbarBrand, 
    NavbarContent, 
    NavbarItem, 
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem
  } from "@nextui-org/navbar";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@nextui-org/button';
import { UserButton, useUser } from '@clerk/nextjs';

function Header() {

    const {user,isSignedIn}=useUser();
    const MenuList=[
        {
            name:'ホーム',
            path:'/'
        },
        {
            name:'絵本を作成',
            path:'/create-story'
        },
        {
            name:'絵本を見る',
            path:'/explore'
        },
        {
            name:'お問い合わせ',
            path:'https://cor-jp.com/contact/'
        }
    ]
    const [isMenuOpen,setIsMenuOpen]=useState(false);

  return (
    <Navbar  maxWidth='full' onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
            <NavbarMenuToggle
            aria-label={isMenuOpen?"Close menu":"Open menu"}
            className='sm:hidden'
            />
            <NavbarBrand>
                <Image src={'/logo.svg'} alt='logo' width={40} height={40}/>
                <h2 className='font-bold text-2xl text-primary ml-3'>絵本ジェネレーター</h2>
            </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify='center' className='hidden sm:flex'>
            {MenuList.map((item,index)=>(
                <NavbarItem key={index} className='text-xl text-primary font-medium
                hover:underline mx-2'>
                    <Link href={item.path}>
                        {item.name}
                    </Link>
                </NavbarItem>
            ))}
        </NavbarContent>
        <NavbarContent justify='end'>
            <Link href={'/dashboard'}>
                <Button color='primary'>
                    {isSignedIn?
                    'ダッシュボード':
                    '登録して始める'    
                }
                </Button>
            </Link>
            <UserButton/>
        </NavbarContent>
        <NavbarMenu>
            {MenuList.map((item,index)=>(
                <NavbarMenuItem key={index}>
                    <Link href={item.path}>
                        {item.name}
                    </Link>
                </NavbarMenuItem>
            ))}
        </NavbarMenu>
    </Navbar>
  )
}

export default Header