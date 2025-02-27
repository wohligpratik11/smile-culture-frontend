import { useRouter } from 'next/router';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Input } from '../../components/components/ui/input';
import { Card, CardContent } from '../../components/components/ui/cardborderxl';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CiSearch } from "react-icons/ci";
import { apiService, API_ENDPOINTS } from '../../lib/api/apiService';
import axiosInstance from '../../lib/api/axiosInstance';
import CryptoJS from 'crypto-js';
import Cookie from 'js-cookie';
import Image from 'next/image';
import { AspectRatio } from "../../components/components/ui/aspect-ratio";
import InfiniteScroll from '../../components/components/ui/InfiniteScroll';

const CharactersPage = ({ initialCharacters, totalCount, page: initialPage, id, mode }) => {
	const router = useRouter();
	const [titleFromCookie, setTitleFromCookie] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [characters, setCharacters] = useState(initialCharacters);
	const [currentPage, setCurrentPage] = useState(initialPage);
	const [selectedCharacters, setSelectedCharacters] = useState([]);
	const [swapType, setSwapType] = useState('single');
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const scrollContainerRef = useRef(null);

	useEffect(() => {
		const title = Cookie.get('title');
		const swapType = Cookie.get('swapType'); // Read swapType from cookies
		setTitleFromCookie(title);
		setSwapType(swapType); // Store swapType in the state
	}, []);

	// Initialize hasMore based on initialCharacters and totalCount
	useEffect(() => {
		setHasMore(currentPage < Math.ceil(totalCount / 8));
	}, [totalCount, currentPage]);

	const fetchCharacters = async (page, replace = false) => {
		if (loading || !hasMore) return;

		setLoading(true);
		try {
			const axios = axiosInstance();
			let endpoint;

			if (mode === 'video') {
				endpoint = API_ENDPOINTS.GET_ALL_CHARACTERS_LIST;
			} else if (mode === 'image') {
				endpoint = API_ENDPOINTS.GET_ALL_IMAGE_CHARACTERS_LIST;
			}

			const response = await axios.post(endpoint, { page, scene_id: id });

			console.log('Fetched characters for page:', page, response?.data?.data);

			const newCharacters = response?.data?.data?.data || [];
			const total = response?.data?.data?.totalCount || 0;

			if (newCharacters.length === 0) {
				setHasMore(false);
			} else {
				setCharacters(prev => replace ? newCharacters : [...prev, ...newCharacters]);
				setHasMore(page < Math.ceil(total / 8));
			}
		} catch (error) {
			console.error('Error fetching Characters:', error);
		} finally {
			setLoading(false);
		}
	};

	const loadMoreItems = useCallback(() => {
		const nextPage = currentPage + 1;
		setCurrentPage(nextPage);
		fetchCharacters(nextPage, false);
	}, [currentPage]);

	const handleSearchChange = useCallback((e) => {
		setSearchQuery(e.target.value);
	}, []);

	const filteredFeatures = characters?.filter((feature) =>
		feature?.character_real_name?.toLowerCase()?.includes(searchQuery.toLowerCase())
	);

	const handleNextClick = () => {
		if (selectedCharacters.length > 0) {
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
		if (swapType === 'single') {
			// If swapType is 'single', only one character can be selected
			setSelectedCharacters([character.character_id]);
		} else {
			// If swapType is 'multiple', allow multiple characters to be selected
			setSelectedCharacters((prevSelected) => {
				const isSelected = prevSelected.includes(character.character_id);
				if (isSelected) {
					return prevSelected.filter((id) => id !== character.character_id);
				} else {
					return [...prevSelected, character.character_id];
				}
			});
		}
	};

	const renderHeader = () => {
		if (titleFromCookie) {
			const formattedTitle = titleFromCookie.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
			return <h1 className="text-2xl leading-10 text-customWhite capitalize font-medium mb-4">{formattedTitle}</h1>;
		}
		return <h1 className="text-2xl leading-10 text-customWhite capitalize font-medium mb-4">Loading...</h1>;
	};

	return (
		<div className="min-h-screen p-6  overflow-hidden">
			<Card className="bg-card-cardCustomBlue p-6 h-full overflow-y-auto hide-scrollbar" ref={scrollContainerRef}>
				<div className="space-y-4">
					<div className="flex items-center gap-4">
						<Link href={router.asPath} passHref>
							<button
								className="px-4 py-2 rounded-lg bg-gradient-custom-gradient hover:border hover:border-buttonBorder"
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
							placeholder="Search for Characters"
							value={searchQuery}
							onChange={handleSearchChange}
							maxLength={50}
							className="w-full pl-12 pr-3 py-3 border-none bg-blueYonder rounded-full text-customWhite placeholder-customWhite"
						/>
					</div>
					<div className="mt-4 flex items-center justify-between flex-col sm:flex-row sm:space-x-4">
						<div className="relative text-lg font-semibold !text-customWhite sm:mb-0">
							Choose Character
						</div>
						{selectedCharacters.length > 0 && (
							<div className="flex justify-end">
								<button
									className="px-4 py-2 rounded-lg bg-gradient-custom-gradient hover:border hover:border-buttonBorder w-52 h-12"
									onClick={handleNextClick}
								>
									Next
								</button>
							</div>
						)}
					</div>


					{/* Characters with InfiniteScroll */}
					{filteredFeatures.length === 0 && !loading ? (
						<div className="flex justify-center items-center h-full mt-6">
							No Character found
						</div>
					) : (
						<InfiniteScroll
							hasMore={hasMore}
							loadMore={loadMoreItems}
							loading={loading}
							scrollContainerRef={scrollContainerRef}
							className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6"
							loader={
								<div className="flex justify-center items-center py-4 col-span-full">
									<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-buttonBorder"></div>
								</div>
							}
						>
							{filteredFeatures.map((feature) => (
								<div key={feature.character_id} className="space-y-2 text-center">
									<Card
										className={`bg-blue-800/20 border-0 backdrop-blur-sm overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-105 ${selectedCharacters.includes(feature.character_id) ? 'border-buttonBorder border border-solid' : ''
											}`}
										aria-label={`Select ${feature.character_real_name}`}
										onClick={() => handleCharactersSelect(feature)}
									>
										<CardContent className="p-0">
											<AspectRatio ratio={16 / 9} className="w-full">
												<Image
													src={feature.compressed_thumbnail_url || '/fallback-image.jpg'}
													alt={`${feature.character_real_name} image`}
													width={500}
													height={500}
													objectFit="contain"
													priority={feature.character_id < 4} // Only prioritize first 4 images
												/>
											</AspectRatio>
										</CardContent>
									</Card>
									<p className="text-sm text-customWhite font-bold mt-2">{feature.character_real_name}</p>
								</div>
							))}
						</InfiniteScroll>
					)}
				</div>


			</Card>
		</div>
	);
};

export async function getServerSideProps(context) {
	const { query, req } = context;
	const page = query.page || 1;
	const { id } = context.params;

	const mode = req.cookies.mode || 'image';

	try {
		const axios = axiosInstance(context);
		let endpoint;

		if (mode === 'video') {
			endpoint = API_ENDPOINTS.GET_ALL_CHARACTERS_LIST;
		} else if (mode === 'image') {
			endpoint = API_ENDPOINTS.GET_ALL_IMAGE_CHARACTERS_LIST;
		}

		const response = await axios.post(endpoint, { page, scene_id: id });

		return {
			props: {
				initialCharacters: response?.data?.data?.data || [],
				totalCount: response?.data?.data?.totalCount || 0,
				page: parseInt(page, 10),
				id,
				mode,
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
				mode: 'image',
			},
		};
	}
}

export default CharactersPage;