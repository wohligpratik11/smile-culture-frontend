import { useState } from 'react';
import { useRouter } from 'next/router';
import { apiService } from '../../utils/api'; // Assuming this path for apiService
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../components/components/ui/card';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleLogin = async (e) => {
		e.preventDefault();
		setIsLoading(true); // Set loading to true during API call

		try {
			// Call your API for login
			const response = await apiService.auth.login({ email, password });

			if (response.status === 200) {
				// If successful, set the auth token in cookies
				document.cookie = `authToken=${response.data.token}; path=/; HttpOnly; Secure`; // Secure and HttpOnly for production

				// Redirect to dashboard after login
				router.push('/dashboard');
			}
		} catch (err) {
			setError('Login failed. Please check your credentials and try again.');
		} finally {
			setIsLoading(false); // Disable loading after API call
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
								className="w-full p-2 mb-3 bg-customWhite text-black"
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
								className="w-full p-2 mb-3 bg-customWhite text-black"
							/>
						</div>
						{error && <p className="error" style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
						<button
							type="submit"
							className="bg-gradient-custom-gradient w-full h-full p-2.5 rounded-full"
							disabled={isLoading}
						>
							{isLoading ? 'Logging in...' : 'Login'}
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
