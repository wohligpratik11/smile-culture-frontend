// components/Layout.jsx

import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
	return (
		<div className="min-h-screen flex flex-col">
			<div className="flex justify-end mr-5 mt-5">
				<Header />
			</div>
			<div>
				<main className="flex-1">{children}</main>
			</div>
		</div>
	);
};

export default Layout;
