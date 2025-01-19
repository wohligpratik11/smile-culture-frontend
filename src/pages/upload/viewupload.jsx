import { useRouter } from 'next/router'
import React from 'react'; // Add this line to define React;
import { useState, useEffect } from 'react';
import { Card } from '../../components/components/ui/card';
import Link from 'next/link';
import { ArrowLeft, ArrowUpFromLine } from 'lucide-react';
import { apiService, API_ENDPOINTS } from '../../lib/api/apiService';
import axiosInstance from '../../lib/api/axiosInstance';
import Cookie from 'js-cookie';
import Image from 'next/image';
import CryptoJS from 'crypto-js';
import SelectImage from "../../../public/assets/images/image.webp";
import UploadImages from "../../../public/assets/images/uploadImages.webp";
import MediaUploader from '../../components/components/ui/UppyUploader';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '../../components/components/ui/dialog'; // Import Dialog components
import { AspectRatio } from "../../components/components/ui/aspect-ratio"
import { Button } from "../../components/components/ui/button"
import { RotateCcw, Share } from 'lucide-react'
import ShareLink from '../../components/components/ui/shareLink'
// import { useToaster } from '../../'
import { useUploadContext } from '../../context/UploadContext';
import { ImageConfigContext } from 'next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints';

const ViewUpload = ({ initialMovies }) => {
	const router = useRouter();
	const [titleFromCookie, setTitleFromCookie] = useState('');
	const [selectedCharacters, setSelectedCharacters] = useState([]);
	const [selectedMode, setSelectedMode] = useState(null);
	const [movies, setMovies] = useState(initialMovies);
	console.log("moviesmovies", movies)
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { uploadedData, characterId } = useUploadContext();
	const [isOpen, setIsOpen] = useState(false);

	const handleShareClick = () => {
		setIsOpen(true);
	};

	const handleModalClose = () => {
		setIsOpen(false);
	};
	useEffect(() => {
		const title = Cookie.get('title');
		setTitleFromCookie(title);
		const encryptedData = Cookie.get('selectedCharacters');
		if (encryptedData) {
			const bytes = CryptoJS.AES.decrypt(encryptedData, 'your-encryption-key');
			const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
			if (decryptedData) {
				setSelectedCharacters(JSON.parse(decryptedData));
			}
		}
	}, []);
	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const renderHeader = () => {
		if (titleFromCookie) {
			const formattedTitle = titleFromCookie.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
			return <h1 className="text-2xl leading-10 text-customWhite capitalize font-medium mb-4">{formattedTitle}</h1>;
		}
		return <h1 className="text-2xl leading-10 text-customWhite capitalize font-medium mb-4">Loading...</h1>;
	};

	const handleModeSelect = (mode) => {
		setSelectedMode(mode);
	};
	const handleUploadComplete = (formData) => {
		console.log("Received formData in onUploadComplete: ", formData);

		// Iterate through the formData to check the uploaded files
		for (let pair of formData.entries()) {
			console.log(pair[0] + ': ' + pair[1]);
		}
	};



	return (
		<div className="min-h-screen p-4 h-[835px]">
			<Card className="bg-card-cardCustomBlue p-6">
				<div className="space-y-4">
					<div className="mx-auto max-w-full sm:max-w-5xl space-y-12 p-2">
						<div className="space-y-6 flex flex-col items-center justify-center">
							<Card className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[500px] xl:h-[560px]">
								{movies && movies.length > 0 ? (
									movies.map((movie, index) => (
										<div key={index} className="space-y-6 flex flex-col items-center justify-center">
											{movie.output_video_url ? (
												<div className="relative w-full h-auto">
													<video
														controls
														preload="auto"
														width="100%"
														height="auto"
														controlsList="nodownload"
														disablePictureInPicture
														className="w-full h-auto object-contain rounded-lg border border-buttonBorder"
													>
														<source src={movie.output_video_url} type="video/mp4" />
														Your browser does not support the video tag.
													</video>
												</div>
											) : (
												<div className="relative w-full h-auto">
													<Image
														src={movie.output_video_url}
														alt="Media"
														className="rounded-lg border border-buttonBorder object-contain"
														layout="responsive"
														width={800}
														height={450}
														priority
													/>
												</div>
											)}
										</div>
									))
								) : (
									<div className="text-center text-gray-400">
										<p>No movies found.</p>
									</div>
								)}
							</Card>

							<h2 className="text-center text-3xl font-semibold text-white">Explore</h2>
							<div className="flex flex-wrap justify-center gap-4">
								<Button
									className="min-w-[180px] bg-cyan-400 text-base font-medium text-white hover:bg-cyan-500"
									size="lg"
								>
									Lip-syncing
								</Button>
								<Button
									className="min-w-[180px] bg-cyan-400 text-base font-medium text-white hover:bg-cyan-500"
									size="lg"
								>
									Multilingual
								</Button>
							</div>
						</div>

						<ShareLink />
					</div>
					<div className="flex justify-end gap-4  flex-wrap">
						<Link href="/">
							<Button
								variant="outline"
								size="lg"
								className="min-w-[140px] w-full sm:w-auto border-white/10 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10 hover:text-white"
							>
								<RotateCcw className="mr-2 h-4 w-4" />
								Restart
							</Button>
						</Link>
						<Button
							size="lg"
							className="min-w-[140px] w-full sm:w-auto bg-cyan-400 font-medium text-white hover:bg-cyan-500"
							onClick={handleShareClick}
						>
							<Share />
							Share
						</Button>
					</div>




				</div>
				<ShareLink isOpen={isOpen} onClose={handleModalClose} />

			</Card>

		</div>

	);
};

export async function getServerSideProps(context) {
	const cookies = context.req.cookies;
	const uploadedFileData = cookies.uploadedData || '';  // Get the uploaded data from cookies

	const titleFromCookie = cookies.title.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
	const characterId = cookies.characterId || '';
	const selectMode = cookies.mode || '';
	const formData = new FormData();
	formData.append('feature_used', titleFromCookie);
	formData.append('mode', selectMode);

	if (characterId) {
		console.log("characterId", characterId);
		formData.append('character_ids', characterId);
	}
	if (uploadedFileData) {
		formData.append('user_images', uploadedFileData);
	}

	try {
		const axios = axiosInstance(context);
		const response = await axios.post(API_ENDPOINTS.CREATE_NEW_STORE_DATA, formData);

		return {
			props: {
				initialMovies: response?.data?.data || [],
			},
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return {
			props: {
				initialMovies: [],
			},
		};
	}
}


export default ViewUpload;

