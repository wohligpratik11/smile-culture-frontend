import React from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import ErosNow from '../../../public/assets/images/erosnow.webp';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext'; // Import AuthContext

const Header = () => {
  const router = useRouter();
  const { user } = useAuth(); // Get user from AuthContext

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

      <div className="relative flex h-[60px] w-[60px] items-center justify-center gap-2 rounded-full border text-white shadow-xl">
        <Avatar className="cursor-pointer text-3xl">
          <AvatarFallback>
            {user ? getFirstLetter(user.user_email) : 'G'}{' '}
            {/* Default to 'G' */}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Header;
