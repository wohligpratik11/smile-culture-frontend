import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Input } from '../../components/components/ui/input'; // Import ShadCN Input
import { Card, CardContent } from '../../components/components/ui/card';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CiSearch } from "react-icons/ci";
import { apiService, API_ENDPOINTS } from '../../lib/api/apiService';
import axiosInstance from '../../lib/api/axiosInstance';
import Cookie from 'js-cookie';
import Image from 'next/image';

const DynamicSlugPage = ({ characters }) => {
	const router = useRouter();
	const [titleFromCookie, setTitleFromCookie] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCharacters, setSelectedCharacters] = useState([]);
	console.log("setSelectedCharacters", selectedCharacters)
	useEffect(() => {
		const title = Cookie.get('title');
		setTitleFromCookie(title);
	}, []);

	const features = characters?.map(character => ({
		id: character.character_id, // Ensure the character has a unique id
		title: character.character_movie_name,
		name: character.character_real_name,
		image: character.url,
		characterMovieName: character.character_movie_name,
		path: `/upload/${character.scene_id}`,
	}));

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const filteredFeatures = features?.filter((feature) =>
		feature?.title?.toLowerCase()?.includes(searchQuery.toLowerCase())
	);

	const handleCharactersSelect = (character) => {
		setSelectedCharacters(prev => {
			if (prev.some(selected => selected.id === character.id)) {
				// If already selected, deselect
				return prev.filter(selected => selected.id !== character.id);
			} else {
				// Otherwise, select the character
				return [...prev, character];
			}
		});
	};

	const renderHeader = () => {
		if (titleFromCookie) {
			const formattedTitle = titleFromCookie.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
			return <h1 className="text-2xl leading-10 text-customWhite capitalize font-medium mb-4">{formattedTitle}</h1>;
		}
		return <h1 className="text-2xl leading-10 text-customWhite capitalize font-medium mb-4">Loading...</h1>;
	};

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
					<div className="relative mt-4">
						Choose Characters
					</div>

					<div className={`mt-6 ${filteredFeatures?.length > 0 ? 'grid grid-cols-1 md:grid-cols-4 gap-6' : ''}`}>
						{filteredFeatures?.length === 0 ? (
							<div className="flex justify-center items-center h-full">
								No Characters found
							</div>
						) : (
							filteredFeatures?.map((feature) => (
								<div key={feature.id} className="space-y-2">
									<Card
										className={`bg-blue-800/20 border-0 backdrop-blur-sm overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-105 mb-6 ${selectedCharacters.some(selected => selected.id === feature.id) ? 'border-4 border-image-gradient' : ''}`}
										aria-label={`Select ${feature.title}`}
										onClick={() => handleCharactersSelect(feature)}
									>
										<CardContent className="p-0">
											<div className="relative aspect-video">
												<Image
													src={feature.image}
													alt={`${feature.title} image`}
													layout="fill"
													objectFit="cover"
													priority={true}
												/>
											</div>
										</CardContent>
									</Card>
								</div>
							))
						)}
					</div>

				</div>
				<div className="flex justify-end space-x-4 mt-6">
					<button
						className="px-4 py-2 rounded-lg bg-gradient-custom-gradient border border-buttonBorder w-52 h-12"
						onClick={() => selectedCharacters.length > 0 && router.push(selectedCharacters[0].path)} // Navigate to first selected character's path
						disabled={selectedCharacters.length === 0}
					>
						Next
					</button>
				</div>
			</Card>
		</div>
	);
};

export async function getServerSideProps(context) {
	const { slug } = context.params;
	try {
		const axios = axiosInstance(context);
		const payload = { page: 1, scene_id: slug };
		const response = await axios.post(API_ENDPOINTS.GET_ALL_CHARACTERS_LIST, payload);
		return {
			props: {
				characters: response?.data?.data?.data || [],
			},
		};
	} catch (error) {
		console.error('Error fetching movies:', error);
		return {
			props: {
				characters: [],
			},
		};
	}
}

export default DynamicSlugPage;
