import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import ErosNow from "../../../public/assets/images/erosnow.webp"; // Import the image
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../../components/components/ui/hover-card';

const Header = () => {
  return (
    <div className="flex items-center gap-2 justify-between"> {/* Ensure flex items are aligned to the left */}
      {/* ErosNow Image */}
      <img src={ErosNow.src} alt="ErosNow" className="mr-4 w-[14%] ml-5" /> {/* Add margin-right to give space between image and next content */}

      <div className="relative mt-[3px] flex h-[61px] flex-grow items-center justify-around gap-2 rounded-full bg-gradient-custom-gradient px-8 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:flex-grow-0 md:gap-1 xl:w-[150px] xl:gap-2 text-white border border-buttonBorder !w-[100px]">
        {/* HoverCard with Avatar */}
        <HoverCard>
          <HoverCardTrigger>
            <Avatar className="ml-auto cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </HoverCardTrigger>

          <HoverCardContent className="bg-card-cardCustomBlue">
            <div>
              <p className='pb-3'>Login</p>
              <p>Dark Mode</p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
};

export default Header;
