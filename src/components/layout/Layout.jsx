// components/Layout.jsx

import React from 'react';
import Header from './Header';
import Footer from './Footer';

import ToastProvider from '../../context/ToastProvider';

const Layout = ({ children }) => {
	return (
		<div className="min-h-screen flex flex-col overflow-hidden">
			<ToastProvider>
				<div className="mr-5 mt-4">
					<Header />
				</div>
				<div className="flex-1 overflow-hidden">
					<main>{children}</main>
				</div>
				{/* <Footer /> */}
			</ToastProvider>
		</div>
	);
};

export default Layout;
