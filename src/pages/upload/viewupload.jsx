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
import MediaUploader from '../../components/components/ui/UppyUploader';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '../../components/components/ui/dialog'; // Import Dialog components
import { AspectRatio } from "../../components/components/ui/aspect-ratio"
import { Button } from "../../components/components/ui/button"
import { RotateCcw, Share } from 'lucide-react'
import ShareLink from '../../components/components/ui/shareLink'
import { useUploadContext } from '../../context/UploadContext';

const ViewUpload = () => {
	const router = useRouter();
	const [titleFromCookie, setTitleFromCookie] = useState('');
	const [selectedCharacters, setSelectedCharacters] = useState([]);
	const [mode, setSelectedMode] = useState(null);
	console.log("mode", mode);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const { uploadedData, characterId } = useUploadContext();
	const [isOpen, setIsOpen] = useState(false);
	console.log("Received mode prop:", mode); // Log the mode prop
	const [movies, setMovies] = useState([]);
	console.log("movies1qqqq", movies);
	console.log("Received mode prop:", mode); // Log the mode prop

	const handleShareClick = () => {
		setIsOpen(true);
	};

	const handleModalClose = () => {
		setIsOpen(false);
	};
	useEffect(() => {
		const storedMode = Cookie.get('mode'); // Retrieve 'mode' from cookies
		if (storedMode) {
			setSelectedMode(storedMode); // Set the mode from cookie to state
		}
	}, []);
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
	useEffect(() => {
		const encryptedUrl = Cookie.get('output_video_url');
		console.log("Encrypted URL from cookie:", encryptedUrl);  // Log encrypted URL

		if (encryptedUrl) {
			const bytes = CryptoJS.AES.decrypt(encryptedUrl, 'your-encryption-key');
			const decryptedUrl = bytes.toString(CryptoJS.enc.Utf8);

			console.log("Decrypted output_video_url:", decryptedUrl);

			setMovies([decryptedUrl]);
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
			<Card className="bg-card-cardCustomBlue p-6 ">
				<div className="space-y-4">
					<div className="mx-auto max-w-full sm:max-w-5xl space-y-12 p-2">
						<div className="space-y-6 flex flex-col items-center justify-center">
							<Card className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[00px] xl:h-[560px]">
								{movies && movies.length > 0 ? (
									movies.map((movie, index) => (
										<div key={index} className="space-y-6 flex flex-col items-center justify-center">
											{mode === 'image' ? (
												movie ? (
													<div className="relative w-full h-auto">
														<Image
															src={movie}
															alt="Media"
															className="rounded-lg border border-buttonBorder object-contain"
															layout="responsive"
															width={800}
															height={450}
															priority
														/>
													</div>
												) : (
													<p className="text-center text-gray-400 text-2xl">Oops! Something went wrong. Please try again later.</p>
												)
											) : (
												movie ? (
													<div className="relative w-full h-auto">
														<video
															controls
															preload="auto"
															width="100%"
															height="auto"
															controlsList="nodownload"
															disablePictureInPicture
															playsInline
															className="w-full h-full object-contain rounded-lg border border-buttonBorder"
														>
															<source src={movie} type="video/mp4" />
														</video>
													</div>
												) : (
													<div className="text-center text-gray-400">Video not available</div>
												)
											)}

										</div>
									))
								) : (
									<div className="flex items-center justify-center h-full w-full border border-slateBlue shadow rounded-xl">
										<p className="text-center text-gray-400 text-2xl">Oops! Something went wrong. Please try again later.</p>
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
				<ShareLink isOpen={isOpen} onClose={handleModalClose} movies={movies} />

			</Card>

		</div>

	);
};



export default ViewUpload;

