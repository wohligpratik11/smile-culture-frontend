import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import ErosNow from '../../../public/assets/images/erosnow.webp';
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
    <div className="flex items-center justify-between gap-2">
      <Link href="/">
        <img
          src={ErosNow.src}
          alt="ErosNow"
          className="ml-5 mr-4 max-w-[40%]"
        />
      </Link>
      <div className="bg-gradient-custom-gradient shadow-shadow-500 relative  flex h-[60px] w-[60px] flex-grow items-center justify-center gap-2 rounded-full border border-buttonBorder text-white shadow-xl dark:!bg-navy-800 dark:shadow-none md:flex-grow-0 md:gap-1 xl:w-[60px] xl:gap-2">
        <Avatar className="ml-auto cursor-pointer text-3xl">
          <AvatarFallback>
            {userEmail ? getFirstLetter(userEmail) : ''}
          </AvatarFallback>
        </Avatar>
      </div>

    </div>
  );
};

export default Header;
