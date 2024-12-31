// pages/index.js
import ThemeToggle from '../components/ThemeToggle';

export default function Home() {
	return (
		<div>
			<h1 className='text-white'>Welcome to Next.js 14!</h1>
			<ThemeToggle />
		</div>
	);
}
