import { useRouter } from 'next/router';
import { useState } from 'react';
import { Input } from '../../components/components/ui/input';
import { Card, CardContent } from '../../components/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { CiSearch } from "react-icons/ci";
import { Checkbox } from '../../components/components/ui/checkbox';

const DynamicSlugPage = () => {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState('');
	const { slug } = router.query; // Extract slug from URL
	const [selectedFeatures, setSelectedFeatures] = useState([]);

	const features = [
		{ id: 1, title: 'Face Swapping', image: '/assets/images/raju.webp', path: '/scenes/face-swap' },
		{ id: 2, title: 'Lip Syncing', image: '/assets/images/raju.webp', path: '/scenes/lip-syncing' },
		{ id: 3, title: 'Multilingual', image: '/assets/images/raju.webp', path: '/scenes/multilingual' },
	];

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	// Handle checkbox click to toggle selection
	const handleCheckboxChange = (id) => {
		setSelectedFeatures((prevSelected) =>
			prevSelected.includes(id)
				? prevSelected.filter((featureId) => featureId !== id) // Deselect
				: [...prevSelected, id] // Select
		);
	};

	const filteredFeatures = features.filter((feature) =>
		feature.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const renderHeader = () => {
		switch (slug) {
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
					<div className="relative mt-4">Choose Characters</div>
					<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
						{filteredFeatures.length === 0 ? (
							<div>No features found</div>
						) : (
							filteredFeatures.map((feature) => (
								<div key={feature.id} className="space-y-2 relative">
									<div
										className={`overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-105 ${selectedFeatures.includes(feature.id) ? 'border-image-gradient' : ''}`}
									>
										<CardContent className="p-0" >
											<div className="relative aspect-video">
												<img
													src={feature.image}
													alt={`${feature.title} image`}
													className="object-cover"
												/>
												{/* Checkbox positioned in the top-left corner */}
												<Checkbox
													checked={selectedFeatures.includes(feature.id)}
													onCheckedChange={() => handleCheckboxChange(feature.id)} // Toggle on checkbox click
													className="absolute top-2 left-2 z-10 border-image-gradient rounded-full"
												/>
											</div>
										</CardContent>
									</div>
								</div>
							))
						)}
					</div>

					<div className="mt-6">
						<p>Selected Features:</p>
						<ul>
							{selectedFeatures.map((id) => {
								const feature = features.find((feature) => feature.id === id);
								return <li key={id}>{feature?.title}</li>;
							})}
						</ul>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default DynamicSlugPage;
