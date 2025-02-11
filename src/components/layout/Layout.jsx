// components/Layout.jsx

import React from 'react';
import Header from './Header';
import ToastProvider from '../../context/ToastProvider';

const Layout = ({ children }) => {
	return (

		<div className="min-h-screen flex flex-col">
			<ToastProvider>
				<div className="mr-5 mt-4">
					<Header />
				</div>
				<div>
					<main className="flex-1">{children}</main>
				</div>
			</ToastProvider>

		</div >
	);
};

export default Layout;
