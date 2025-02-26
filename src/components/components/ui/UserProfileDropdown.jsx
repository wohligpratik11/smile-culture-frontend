// UserProfileDropdown.jsx
import React from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, Lock, UserX } from 'lucide-react';

const UserProfileDropdown = ({ user }) => {
	// Default user if not provided
	const defaultUser = {
		name: "Aakash Mishra",
		email: "aakashmishra@gmail.com",
		credits: 3
	};

	const userData = user || defaultUser;

	const getFirstLetter = (email) => {
		return email ? email.charAt(0).toUpperCase() : 'A';
	};

	const handleLogout = () => {
		console.log('Logging out...');
		// Implement logout logic here
	};

	const handleResetPassword = () => {
		console.log('Reset password...');
		// Implement reset password logic here
	};

	const handleDeleteAccount = () => {
		console.log('Delete account...');
		// Implement delete account logic here
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative p-0 h-12 w-12 md:h-14 md:w-14 rounded-full overflow-hidden bg-gradient-to-r from-gray-700 to-gray-900 hover:border hover:border-gray-400">
					<Avatar className="h-full w-full cursor-pointer">
						<AvatarFallback className="bg-transparent text-white text-2xl">
							{getFirstLetter(userData.email)}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="w-64 mr-2" align="end">
				{/* User Info Section */}
				<div className="p-4 bg-gray-100">
					<div className="flex items-center gap-4">
						<Avatar className="h-16 w-16 bg-gray-700 text-white">
							<AvatarFallback className="text-xl">{getFirstLetter(userData.email)}</AvatarFallback>
						</Avatar>
						<div>
							<p className="text-lg font-semibold text-gray-800">{userData.name}</p>
							<p className="text-sm text-gray-600">{userData.email}</p>
						</div>
					</div>

					{/* Credits Section */}
					<div className="mt-4 p-3 bg-gray-50 rounded-md flex items-center justify-between">
						<span className="text-gray-700">Credits remaining - {userData.credits}</span>
						<Button variant="default" size="sm" className="bg-gray-800 hover:bg-gray-700">
							Top up credits
						</Button>
					</div>
				</div>

				<DropdownMenuSeparator />

				{/* Menu Options */}
				<DropdownMenuItem
					onClick={handleLogout}
					className="py-3 cursor-pointer text-red-500 hover:text-red-500 focus:text-red-500 hover:bg-red-50"
				>
					<LogOut className="mr-3 h-5 w-5" />
					Log Out
				</DropdownMenuItem>

				<DropdownMenuItem
					onClick={handleResetPassword}
					className="py-3 cursor-pointer focus:text-gray-700"
				>
					<Lock className="mr-3 h-5 w-5" />
					Reset Password
				</DropdownMenuItem>

				<DropdownMenuItem
					onClick={handleDeleteAccount}
					className="py-3 cursor-pointer focus:text-gray-700"
				>
					<UserX className="mr-3 h-5 w-5" />
					Delete Account
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserProfileDropdown;