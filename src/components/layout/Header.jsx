// components/Header.jsx
import React from 'react';
import { Button } from "@/components/components/ui/button"

const Header = () => {
  return (
    <div className="text-3xl font-bold underline hover:text-red-400">Click me</div>
    // <header className="bg-blue-600 text-white p-4 shadow-md">

    //   <nav className="container mx-auto">
    //     <Button className="bg-blue-600 hover:text-red-400 text-white p-4 shadow-md">Click me</Button>

    //     <ul className="flex justify-end space-x-6 !bg-[#fff] p-2 rounded-lg">
    //       <li>
    //         <a href="/" className="hover:text-gray-300">Home</a>
    //       </li>
    //       <li>
    //         <a href="/about" className="hover:text-gray-300">About</a>
    //       </li>
    //       <li>
    //         <a href="/services" className="hover:text-gray-300">Services</a>
    //       </li>
    //       <li>
    //         <a href="/contact" className="hover:text-gray-300">Contact</a>
    //       </li>
    //     </ul>
    //   </nav>
    // </header>
  );
};

export default Header;
