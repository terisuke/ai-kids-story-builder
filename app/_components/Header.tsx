'use client'
import React, { useState } from 'react'
import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem} from "@nextui-org/navbar";
import Link from 'next/link';
import { Button } from '@nextui-org/button';
import { useUser } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';

function Header() {
  const {user,isSignedIn} = useUser()
  const MenuList = [
    {
      name: "ホーム",
      href: "/",
    },
    {
      name: "ストーリー作成",
      href: "/create-story",
    },
    {
      name: "ストーリーを探す",
      href: "/explore",
    },
    {
      name: "お問い合わせ",
      href: "/contact",
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Navbar maxWidth="full" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        <NavbarBrand>
          <img src={"/logo.svg"} alt="Logo" width={40} height={40} />
          <h2 className="font-bold text-2xl text-primary ml-3">ストーリーテラー</h2>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="center" className="hidden sm:flex">
        {MenuList.map((item, index) => (
          <NavbarItem className="text-lg text-primary font-medium hover:underline  mx-2" key={index}>
            <Link href={item.href}>{item.name}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
        <Button color="primary">
          {isSignedIn ? "Dashboard" : "Get Started"}
        </Button>
        </Link>
        <UserButton />
      </NavbarContent>
      <NavbarMenu>
        {MenuList.map((item, index) => (
          <NavbarMenuItem className="text-xl text-primary font-medium hover:underline  mx-2" key={index}>
            <Link href={item.href}>{item.name}</Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default Header