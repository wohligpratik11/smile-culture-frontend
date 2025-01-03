import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Input } from '../../components/components/ui/input'; // Import ShadCN Input
import { Card, CardContent } from '../../components/components/ui/card';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CiSearch } from "react-icons/ci";

const DynamicSlugPage = () => {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState('');
	const [pageType, setPageType] = useState('');

	const features = [
		{
			title: 'Face Swapping',
			image: '/assets/images/img2.webp',
			path: '/swapping/face-swap',
		},
		{
			title: 'Lip Syncing',
			image: '/assets/images/img2.webp',
			path: '/lip-syncing',
		},
		{
			title: 'Multilingual',
			image: '/assets/images/img2.webp',
			path: '/multilingual',
		},
	];

	const { slug } = router.query;

	useEffect(() => {
		if (router.pathname.includes('swapping')) {
			setPageType('face-swap');
		} else if (router.pathname.includes('lip-syncing')) {
			setPageType('lip-syncing');
		} else if (router.pathname.includes('multilingual')) {
			setPageType('multilingual');
		}
	}, [router.pathname]);

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const filteredFeatures = features.filter((feature) =>
		feature.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const renderHeader = () => {
		switch (pageType) {
			case 'face-swap':
				return <h1 className="text-2xl leading-10 text-customWhite font-medium mb-4">Face Swapping</h1>;
			case 'lip-syncing':
				return <h1 className="text-2xl leading-10 text-customWhite font-medium mb-4">Lip Syncing</h1>;
			case 'multilingual':
				return <h1 className="text-2xl leading-10 text-customWhite font-medium mb-4">Multilingual</h1>;
			default:
				return <h1 className="text-2xl leading-10 text-customWhite font-medium mb-4">Loading...</h1>;
		}
	};

	if (!slug) return <div>Loading...</div>;

	return (
		<div className="min-h-screen p-6 h-[835px]">
			<Card className="bg-card-cardCustomBlue p-6">
				<div className="space-y-4">
					<div className="flex items-center gap-4">
						<button
							className="px-4 py-2 rounded-lg bg-gradient-custom-gradient border border-buttonBorder"
							onClick={() => router.back()}
							aria-label="Go Back"
						>
							<ArrowLeft />
						</button>
						<div className="text-lg font-medium leading-10 mt-[17px]">
							{renderHeader()}
						</div>
					</div>
					<div className="relative mt-4">
						<CiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 font-bold text-customWhite h-full w-6" />
						<Input
							type="text"
							placeholder="Search"
							value={searchQuery}
							onChange={handleSearchChange}
							className="w-full pl-12 pr-3 py-3 border-none bg-blueYonder rounded-full text-customWhite placeholder-customWhite"
						/>
					</div>


					<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
						{filteredFeatures.length === 0 ? (
							<div>No features found</div>
						) : (
							filteredFeatures.map((feature) => (
								<div key={feature.path} className="space-y-2">
									<Link href={feature.path} passHref legacyBehavior>
										<Card
											className="bg-blue-800/20 border-0 backdrop-blur-sm overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-105 mb-6"
											aria-label={`Go to ${feature.title}`}
										>
											<CardContent className="p-0">
												<div className="relative aspect-video">
													<img
														src={feature.image}
														alt={`${feature.title} image`}
														className="w-full h-full object-cover"
													/>
												</div>
											</CardContent>
										</Card>
									</Link>
								</div>
							))
						)}
					</div>
				</div>
			</Card>
		</div>
	);
};

export default DynamicSlugPage;
