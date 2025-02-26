import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import ProfileDropdown from '../components/ui/ProfileDropdown'; // Import the new component

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
          src="/assets/images/erosnow.webp"
          alt="ErosNow"
          className="ml-5 mr-4 w-[20%] cursor-pointer"
        />
      </Link>

      {/* Using the ProfileDropdown component which contains your existing avatar markup */}
      <ProfileDropdown user={user} getFirstLetter={getFirstLetter} />
    </div>
  );
};

export default Header;