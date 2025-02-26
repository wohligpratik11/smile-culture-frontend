import React, { useState } from 'react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator
} from './dropdown-menu';
import { LogOut, User, Settings, HelpCircle } from 'lucide-react';

const ProfileDropdown = ({ user, getFirstLetter }) => {
	const [isAvatarHovering, setIsAvatarHovering] = useState(false);
	const [isProfileHovering, setIsProfileHovering] = useState(false);
	const [isEmailHovering, setIsEmailHovering] = useState(false);

	const handleLogout = () => {
		localStorage.removeItem('userData');
		window.location.href = 'https://erosnow.com/';
	};

	return (
		<DropdownMenu >
			<DropdownMenuTrigger asChild>
				<div
					className={`relative flex h-12 w-12 items-center justify-center rounded-full 
            ${isAvatarHovering ? 'ring-2 ring-blue-400' : ''} 
            bg-gradient-to-r from-blue-600 to-purple-600 
            shadow-lg transition-all duration-300 ease-in-out 
            cursor-pointer md:h-14 md:w-14 lg:h-16 lg:w-16`}
					onMouseEnter={() => setIsAvatarHovering(true)}
					onMouseLeave={() => setIsAvatarHovering(false)}
				>
					<Avatar
						className={`bg-gradient-custom-gradient shadow-shadow-500 relative flex h-[60px] w-[60px] flex-grow items-center justify-center gap-2 rounded-full text-3xl text-white shadow-xl dark:!bg-navy-800 dark:shadow-none md:flex-grow-0 md:gap-1 xl:w-[60px] xl:gap-2 duration-300 transition-transform 
            ${isAvatarHovering ? 'scale-110' : ''}`}

					>
						<AvatarFallback className="bg-transparent">
							{user ? getFirstLetter(user.user_email) : ''}
						</AvatarFallback>
					</Avatar>
				</div>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="w-64 rounded-xl p-0 bg-navy-800 border border-buttonBorder shadow-xl mr-5">
				<div className="p-3 bg-gradient-to-r from-blue-900 to-navy-900 rounded-t-xl">
					<div className="flex items-center ">
						<Avatar
							className={`h-16 w-16 mr-4 border-1 border-buttonBorder shadow-md transition-transform
							${isAvatarHovering ? 'scale-110 border-buttonBorder' : ''}`}
						>
							<AvatarFallback className={`bg-gradient-custom-gradient shadow-shadow-500 relative flex h-[60px] w-[60px] flex-grow items-center justify-center gap-2 rounded-full text-3xl text-white shadow-xl dark:!bg-navy-800 dark:shadow-none md:flex-grow-0 md:gap-1 xl:w-[60px] xl:gap-2 duration-300 transition-transform  cursor-pointer
            ${isAvatarHovering ? 'scale-110 border-buttonBorder' : ''}`}>
								{user ? getFirstLetter(user.user_email) : ''}
							</AvatarFallback>
						</Avatar>

						<div className="flex flex-col">
							<span
								className={`text-lg font-semibold text-white cursor-pointer transition-colors duration-200
                  ${isProfileHovering ? 'text-blue-400' : ''}`}
								onMouseEnter={() => setIsProfileHovering(true)}
								onMouseLeave={() => setIsProfileHovering(false)}
							>
								{user?.user_name || 'Pratik Sawant'}
							</span>
							<span
								className={`text-sm text-gray-300 transition-colors duration-200 cursor-pointer
                  ${isEmailHovering ? 'text-blue-400' : ''}`}
								onMouseEnter={() => setIsEmailHovering(true)}
								onMouseLeave={() => setIsEmailHovering(false)}
							>
								{user?.user_email || ''}
							</span>
						</div>
					</div>
				</div>

				<div className="p-2">
					<DropdownMenuItem
						className="flex items-center px-4 py-3 rounded-lg bg-gradient-to-r from-[#e03c27] to-[#F8A895] text-white cursor-pointer hover:opacity-90 transition-opacity duration-200 text-bold "
						onClick={handleLogout}
					>
						<LogOut className="mr-3 h-5 w-5" />
						<span >Log Out</span>
					</DropdownMenuItem>
				</div>
			</DropdownMenuContent>
		</DropdownMenu >
	);
};

export default ProfileDropdown;