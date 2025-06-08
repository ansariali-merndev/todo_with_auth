"use client";

import Link from "next/link";
import { useState } from "react";
import { Login } from "./login";
import { Register } from "./Register";

const Nav = [
  { label: "Home", href: "/" },
  { label: "login", href: "/login" },
];

export const Navbar = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [register, setRegister] = useState(false);
  return (
    <header className="bg-gray-200 flex justify-between items-center h-[10vh] px-10">
      <Link
        href={"/"}
        className="bg-zinc-600 px-3 py-1.5 text-white rounded-md"
      >
        Home
      </Link>
      <span
        onClick={() => setOpenLogin(true)}
        className="bg-zinc-600 px-3 py-1.5 text-white rounded-md cursor-pointer"
      >
        Login
      </span>
      {openLogin && (
        <Login setOpenLogin={setOpenLogin} setRegister={setRegister} />
      )}
      {register && (
        <Register setOpenLogin={setOpenLogin} setRegister={setRegister} />
      )}
    </header>
  );
};
