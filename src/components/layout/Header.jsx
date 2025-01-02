// components/Header.jsx
import React from 'react';
import { Button } from "@/components/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"

const Header = () => {
  return (
    <div class="relative mt-[3px] flex h-[61px] w-[200px] flex-grow items-center justify-around gap-2 rounded-full bg-gradient-custom-gradient px-8 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[200px] md:flex-grow-0 md:gap-1 xl:w-[150px] xl:gap-2 text-white border border-buttonBorder">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

    </div>
  );
};

export default Header;
