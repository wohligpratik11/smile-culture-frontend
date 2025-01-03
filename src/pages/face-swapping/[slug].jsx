import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const DynamicSlugPage = () => {
	const router = useRouter();
	const { slug } = router.query;
	const [pageType, setPageType] = useState('');

	useEffect(() => {
		// Determine which feature we're dealing with based on the URL path
		if (router.pathname.includes('face-swapping')) {
			setPageType('face-swapping');
		} else if (router.pathname.includes('lip-syncing')) {
			setPageType('lip-syncing');
		} else if (router.pathname.includes('multilingual')) {
			setPageType('multilingual');
		}
	}, [router.pathname]);

	const renderContent = () => {
		switch (pageType) {
			case 'face-swapping':
				return (
					<div className="p-4">
						<h1 className="text-2xl font-bold mb-4">Face Swapping - {slug}</h1>
						{/* Add your face-swapping specific components here */}
					</div>
				);

			case 'lip-syncing':
				return (
					<div className="p-4">
						<h1 className="text-2xl font-bold mb-4">Lip Syncing - {slug}</h1>
						{/* Add your lip-syncing specific components here */}
					</div>
				);

			case 'multilingual':
				return (
					<div className="p-4">
						<h1 className="text-2xl font-bold mb-4">Multilingual - {slug}</h1>
						{/* Add your multilingual specific components here */}
					</div>
				);

			default:
				return <div>Loading...</div>;
		}
	};

	if (!slug) return <div>Loading...</div>;

	return (
		<div className="min-h-screen">
			{renderContent()}
		</div>
	);
};

export default DynamicSlugPage;