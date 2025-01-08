import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import ErosNow from "../../../public/assets/images/erosnow.webp";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../../components/components/ui/hover-card';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const Header = () => {
  const router = useRouter();

  const [userEmail, setUserEmail] = useState(null);
  useEffect(() => {
    const userData = Cookies.get('userData');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setUserEmail(parsedData?.user_email || ''); // Ensure you extract only the necessary data
      } catch (error) {
        console.error('Error parsing userData from cookie:', error);
      }
    }
  }, []);

  const getFirstLetter = (user_email) => {
    if (user_email) {
      return user_email.charAt(0).toUpperCase();
    }
    return '';
  };
  const handleLoginClick = () => {
    router.push('/auth/login');
  };

  return (
    <div className="flex items-center gap-2 justify-between">
      <Link href="/">
        <img src={ErosNow.src} alt="ErosNow" className="mr-4 !w-[40%] ml-5" />
      </Link>
      <div className="relative mt-[3px] flex h-[61px] flex-grow items-center justify-around gap-2 rounded-full bg-gradient-custom-gradient px-8 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:flex-grow-0 md:gap-1 xl:w-[150px] xl:gap-2 text-white border border-buttonBorder !w-[100px]">
        <Avatar className="ml-auto cursor-pointer text-4xl">
          <AvatarFallback>{userEmail ? getFirstLetter(userEmail) : ''}</AvatarFallback>
        </Avatar>
        {/* HoverCard with Avatar */}
        {/* <HoverCard>
          <HoverCardTrigger>
            <Avatar className="ml-auto cursor-pointer">
              <AvatarFallback>{userEmail ? getFirstLetter(userEmail) : 'A'}</AvatarFallback>
            </Avatar>
          </HoverCardTrigger>

          <HoverCardContent className="bg-card-cardCustomBlue">
            <div>
              <p className='pb-3 cursor-pointer' onClick={handleLoginClick}>Login</p>
              <p>Dark Mode</p>
            </div>
          </HoverCardContent>
        </HoverCard> */}
      </div>
    </div>
  );
};

export default Header;
