// contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService, API_ENDPOINTS } from '../lib/api/apiService';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const handleLogin = async () => {
			try {
				const response = await apiService.post(API_ENDPOINTS.LOGIN, {
					user_email: 'jainam.nisar@wohlig.in',
					password: '123',
				});
				const userData = response.data?.data;
				Cookies.set('userData', JSON.stringify(userData), { expires: 7 });
				setUser(userData);
			} catch (error) {
				console.error('Login API Error:', error);
			}
		};

		const userData = Cookies.get('userData');
		if (!userData || userData === 'undefined' || userData === 'null') {
			handleLogin();
		} else {
			setUser(JSON.parse(userData));
		}
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
