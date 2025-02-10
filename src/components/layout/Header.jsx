import React from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import ErosNow from '../../../public/assets/images/erosnow.webp';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext'; // Import AuthContext

const Header = () => {
  const router = useRouter();
  const { user } = useAuth();

  const getFirstLetter = (user_email) => {
    return user_email ? user_email.charAt(0).toUpperCase() : '';
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
          className="ml-5 mr-4 max-w-[60%] cursor-pointer sm:max-w-[40%]"
        />
      </Link>

      <div className="bg-gradient-custom-gradient shadow-shadow-500 relative  flex h-[60px] w-[60px] flex-grow items-center justify-center gap-2 rounded-full hover:border hover:border-buttonBorder text-white shadow-xl dark:!bg-navy-800 dark:shadow-none md:flex-grow-0 md:gap-1 xl:w-[60px] xl:gap-2">
        <Avatar className="cursor-pointer text-3xl">
          <AvatarFallback>
            {user ? getFirstLetter(user.user_email) : ''}{' '}
            {/* Default to 'G' */}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Header;
