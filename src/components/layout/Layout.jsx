// components/Layout.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ToastProvider from '../../context/ToastProvider';

const Layout = ({ children }) => {
	return (
		<div className="min-h-screen bg-gradient-to-b from-sky-50 to-white overflow-x-hidden">
			<ToastProvider>
				<div className="sticky top-0 z-50">
					<Header />
				</div>
				<main className="flex-1">{children}</main>
				<Footer />
			</ToastProvider>
		</div>
	);
};

export default Layout;
