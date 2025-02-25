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
import Pagination from '../../components/components/ui/pagination';

const CharactersPage = ({ initialCharacters, totalCount, page: initialPage, id, prefetchNextPageData, mode }) => {
	const router = useRouter();
	const [titleFromCookie, setTitleFromCookie] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [characters, setCharacters] = useState(initialCharacters);
	const [currentPage, setCurrentPage] = useState(initialPage);
	const [totalPages, setTotalPages] = useState(Math.ceil(totalCount / 8));
	const [selectedCharacters, setSelectedCharacters] = useState([]);
	const [swapType, setSwapType] = useState('single');

	useEffect(() => {
		const title = Cookie.get('title');
		const swapType = Cookie.get('swapType'); // Read swapType from cookies
		setTitleFromCookie(title);
		setSwapType(swapType); // Store swapType in the state
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
			let endpoint;

			if (mode === 'video') {
				endpoint = API_ENDPOINTS.GET_ALL_CHARACTERS_LIST;
			} else if (mode === 'image') {
				endpoint = API_ENDPOINTS.GET_ALL_IMAGE_CHARACTERS_LIST;
			}

			const response = await axios.post(endpoint, { page, scene_id: id });

			setCharacters(response?.data?.data?.data || []);
			setTotalPages(Math.ceil(response?.data?.data?.totalCount / 8));
		} catch (error) {
			console.error('Error fetching Characters:', error);
		}
	}, [router, totalPages, id, mode]);

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
		<div className="min-h-screen p-6 h-[835px]">
			<Card className="bg-card-cardCustomBlue p-4">
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
					<div className="mt-4 flex items-center justify-between flex-col sm:flex-row sm:space-x-4"> <div className="relative text-lg font-semibold !text-customWhite mb-4 sm:mb-0"> Choose Character </div>
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
													src={feature.compressed_thumbnail_url || '/fallback-image.jpg'}
													alt={`${feature.character_real_name} image`}
													objectFit="contain"
													layout="responsive"
													quality={100}
													width={500}
													height={500}
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
				<div className="flex justify-between items-center mt-4 flex-col sm:flex-row">
					<div className={`flex justify-center items-center space-x-2 sm:flex-1 md:ml-36 flex-wrap sm:space-x-2 ${selectedCharacters ? 'md:ml-36' : ''}`}>
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={handlePageChange}
						/>
					</div>
					{selectedCharacters.length > 0 && (
						<button
							className="px-4 py-2 rounded-lg bg-gradient-custom-gradient hover:border hover:border-buttonBorder w-52 h-12 mt-4 sm:ml-4 sm:mt-0"
							onClick={() => handleNextClick()}
							disabled={selectedCharacters.length === 0}
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

		const nextPage = page + 1;
		const nextResponse = await axios.post(endpoint, { page: nextPage, scene_id: id });

		return {
			props: {
				initialCharacters: response?.data?.data?.data || [],
				totalCount: response?.data?.data?.totalCount || 0,
				page: parseInt(page, 10),
				id,
				prefetchNextPageData: nextResponse?.data?.data?.data || [],
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
				prefetchNextPageData: [],
				mode: 'image',
			},
		};
	}
}

export default CharactersPage;
