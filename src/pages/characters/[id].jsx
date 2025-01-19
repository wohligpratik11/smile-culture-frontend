import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import { Input } from '../../components/components/ui/input';
import { Card, CardContent } from '../../components/components/ui/card';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { CiSearch } from "react-icons/ci";
import { apiService, API_ENDPOINTS } from '../../lib/api/apiService';
import axiosInstance from '../../lib/api/axiosInstance';
import CryptoJS from 'crypto-js';
import Cookie from 'js-cookie';
import Image from 'next/image';
import { AspectRatio } from "../../components/components/ui/aspect-ratio";

const CharactersPage = ({ initialCharacters, totalCount, page: initialPage, id, prefetchNextPageData }) => {
	const router = useRouter();
	const [titleFromCookie, setTitleFromCookie] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [characters, setCharacters] = useState(initialCharacters);
	console.log("characters", characters)
	const [currentPage, setCurrentPage] = useState(initialPage);
	const [totalPages, setTotalPages] = useState(Math.ceil(totalCount / 8));
	const [selectedCharacters, setSelectedCharacters] = useState([]);
	console.log("selectedCharacters", selectedCharacters)

	useEffect(() => {
		const title = Cookie.get('title');
		setTitleFromCookie(title);
	}, []);

	useEffect(() => {
		const { page } = router.query;
		if (page && parseInt(page) !== currentPage) {
			handlePageChange(parseInt(page));
		}
	}, [router.query.page]);

	const handlePageChange = useCallback(async (page) => {
		if (page < 1 || page > totalPages) return;

		router.push({
			pathname: router.pathname,
			query: { ...router.query, page },
		}, undefined, { shallow: true });

		setCurrentPage(page);

		try {
			const axios = axiosInstance();
			const response = await axios.post(API_ENDPOINTS.GET_ALL_CHARACTERS_LIST, { page, scene_id: id });

			setCharacters(response?.data?.data?.data || []);
			setTotalPages(Math.ceil(response?.data?.data?.totalCount / 8));
		} catch (error) {
			console.error('Error fetching Characters:', error);
		}
	}, [router, totalPages, id]);

	const handleSearchChange = useCallback((e) => {
		setSearchQuery(e.target.value);
	}, []);

	const filteredFeatures = characters?.filter((feature) =>
		feature?.character_real_name?.toLowerCase()?.includes(searchQuery.toLowerCase())
	);
	const handleNextClick = () => {
		if (selectedCharacters.length > 0) {
			console.log("selected", selectedCharacters);
			const encryptedData = CryptoJS.AES.encrypt(
				JSON.stringify(selectedCharacters),
				'your-encryption-key'
			).toString();

			Cookie.set('selectedCharacters', encryptedData, { secure: true });
			router.push(`/upload`);
		} else {
			console.warn('No characters selected.');
		}
	};


	const handleCharactersSelect = (character) => {
		setSelectedCharacters((prevSelected) => {
			const isSelected = prevSelected.includes(character.character_id);
			if (isSelected) {
				return prevSelected.filter((id) => id !== character.character_id);
			} else {
				return [...prevSelected, character.character_id];
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
						<Link href="#" passHref>
							<button
								className="px-4 py-2 rounded-lg bg-gradient-custom-gradient border border-buttonBorder"
								onClick={(e) => {
									e.preventDefault();
									router.back();
								}}
								aria-label="Go Back"
							>
								<ArrowLeft />
							</button>
						</Link>

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
						Choose Character
					</div>

					<div className={`mt-6 ${filteredFeatures.length > 0 ? 'grid grid-cols-1 md:grid-cols-4 gap-6' : ''}`}>
						{filteredFeatures.length === 0 ? (
							<div className="flex justify-center items-center h-full">
								No Character found
							</div>
						) : (
							filteredFeatures.map((feature) => (
								<div key={feature.path} className="space-y-2 text-center">
									<Card
										className={`bg-blue-800/20 border-0 backdrop-blur-sm overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-105  ${selectedCharacters.includes(feature.character_id) ? 'border-buttonBorder border border-solid' : ''
											}`}
										aria-label={`Select ${feature.character_real_name}`}
										onClick={() => handleCharactersSelect(feature)}
									>

										<CardContent className="p-0">
											<AspectRatio ratio={16 / 9} className="w-full">
												<Image
													src={feature.thumbnail_url || '/fallback-image.jpg'}
													alt={`${feature.character_real_name} image`}
													layout="fill"
													objectFit="contain"
													priority={true}
												/>
											</AspectRatio>
										</CardContent>
									</Card>
									<p className="text-sm text-customWhite font-bold mt-2">{feature.character_real_name}</p>
								</div>
							))
						)}
					</div>
				</div>

				<div className="flex justify-between items-center mt-6">
					<div className={`flex justify-center items-center space-x-2 text-center flex-1 ${selectedCharacters ? 'ml-36' : ''}`}>
						<button
							className={`px-4 py-2 rounded-md bg-gradient-custom-gradient border border-buttonBorder text-white transition-all duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : ''
								}`}
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage <= 1}
						>
							<ChevronLeft className="w-5 h-5" />
						</button>

						{[...Array(totalPages)].map((_, index) => {
							const page = index + 1;
							const isActive = currentPage === page;
							return (
								<button
									key={page}
									onClick={() => handlePageChange(page)}
									className={`px-4 py-2 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 ${isActive
										? 'bg-gradient-custom-gradient border border-buttonBorder text-white'
										: 'bg-white text-blue-600 hover:bg-blue-100 hover:border hover:border-blue-500'
										}`}
								>
									{page}
								</button>
							);
						})}

						<button
							className={`px-4 py-2 rounded-md bg-gradient-custom-gradient border border-buttonBorder text-white transition-all duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : ''
								}`}
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage >= totalPages}
						>
							<ChevronRight className="w-5 h-5" />
						</button>
					</div>

					{selectedCharacters && (
						<button
							className="px-4 py-2 rounded-lg bg-gradient-custom-gradient border border-buttonBorder w-52 h-12 ml-4"
							onClick={() => {
								handleNextClick();
							}}
							disabled={!selectedCharacters}
						>
							Next
						</button>

					)}
				</div>
			</Card>
		</div>
	);
};

export async function getServerSideProps(context) {
	const { query } = context;
	const page = query.page || 1;
	const { id } = context.params;

	try {
		const axios = axiosInstance(context);
		const response = await axios.post(API_ENDPOINTS.GET_ALL_CHARACTERS_LIST, { page, scene_id: id });

		// Prefetch next page
		const nextPage = page + 1;
		const nextResponse = await axios.post(API_ENDPOINTS.GET_ALL_CHARACTERS_LIST, { page: nextPage, scene_id: id });

		return {
			props: {
				initialCharacters: response?.data?.data?.data || [],
				totalCount: response?.data?.data?.totalCount || 0,
				page: parseInt(page, 10),
				id,
				prefetchNextPageData: nextResponse?.data?.data?.data || [],
			},
		};
	} catch (error) {
		console.error('Error fetching Characters:', error);
		return {
			props: {
				initialCharacters: [],
				totalCount: 0,
				page: 1,
				id: null,
				prefetchNextPageData: [],
			},
		};
	}
}

export default CharactersPage;
