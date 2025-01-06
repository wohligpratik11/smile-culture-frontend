// pages/login.js
import { useState } from 'react';
import { apiService } from '../../utils/api'; // Assuming apiService is in this path
import { useRouter } from 'next/router'; // To redirect after login
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../components/components/ui/card';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const router = useRouter(); // For redirection after successful login

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			// Call the login API
			const response = await apiService.auth.login({ email, password });

			if (response.status === 200) {
				// Assuming the API response includes a token or a success message
				// Store token or perform other actions like redirecting
				localStorage.setItem('authToken', response.data.token); // Example of saving the token

				// Redirect to dashboard or home page
				router.push('/dashboard'); // Example of redirection
			}
		} catch (err) {
			setError('Login failed. Please check your credentials and try again.');
		}
	};

	return (
		<div className="login-form-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
			<Card style={{ width: '100%', maxWidth: '400px' }}>
				<CardHeader>
					<CardTitle>Login</CardTitle>
					<CardDescription>Enter your credentials to access the dashboard</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleLogin}>
						<div>
							<label htmlFor="email">Email:</label>
							<input
								type="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className='w-full p-2 mb-3 bg-customWhite text-black'
							/>
						</div>
						<div>
							<label htmlFor="password">Password:</label>
							<input
								type="password"
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className='w-full p-2 mb-3 bg-customWhite text-black'
							/>
						</div>
						{error && <p className="error" style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
						<button type="submit" className='bg-gradient-custom-gradient w-full h-full p-2.5 rounded-full'>
							Login
						</button>
					</form>
				</CardContent>
				<CardFooter>
					<p>Don't have an account? <a href="/signup">Sign up</a></p>
				</CardFooter>
			</Card>
		</div>
	);
};

export default Login;
