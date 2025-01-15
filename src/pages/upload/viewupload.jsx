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
import Video from "../../../public/assets/images/video.webp";
import UploadImages from "../../../public/assets/images/uploadImages.webp";
import MediaUploader from '../../components/components/ui/UppyUploader';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '../../components/components/ui/dialog'; // Import Dialog components
import { AspectRatio } from "../../components/components/ui/aspect-ratio"
import { Button } from "../../components/components/ui/button"
import { RotateCcw, Share } from 'lucide-react'
import ShareLink from '../../components/components/ui/shareLink'
import { useUploadContext } from '../../context/UploadContext';

const ViewUpload = ({ characters, movies, selectedImages }) => {
	console.log("Uploading", selectedImages)
	const router = useRouter();
	const [titleFromCookie, setTitleFromCookie] = useState('');
	const [selectedCharacters, setSelectedCharacters] = useState([]);
	const [selectedMode, setSelectedMode] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);


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
					<div className="flex items-center gap-4">

						<div className="text-lg font-medium leading-10 mt-[17px]">

						</div>
					</div>

					<div className="mx-auto max-w-5xl space-y-12">
						<div className="space-y-6 flex flex-col items-center justify-center">
							<Card className="group relative overflow-hidden border-0 bg-transparent shadow-2xl !w-[550px] !h-[316.93px]">
								<div className="relative aspect-video overflow-hidden rounded-xl">
									<Image
										src="/assets/images/boy.webp"
										alt="After preview"
										fill
										className="object-cover"
										priority
									/>
								</div>
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
						{/* Action Buttons */}

					</div>
					<div className="flex justify-end gap-4 pt-4">
						<Link href="/">
							<Button
								variant="outline"
								size="lg"
								className="min-w-[140px] border-white/10 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10 hover:text-white"
							>
								<RotateCcw className="mr-2 h-4 w-4" />
								Restart
							</Button>
						</Link>
						<Button
							size="lg"
							className="min-w-[140px] bg-cyan-400 font-medium text-white hover:bg-cyan-500"
						>
							<Share className="mr-2 h-4 w-4" />
							Share
						</Button>
					</div>
				</div>
			</Card>
		</div>
	);
};

export async function getServerSideProps(context) {
	// Retrieve cookies from the request
	const cookies = context.req.cookies;
	const uploadedFileData = cookies.uploadedData || '';
	console.log("uploadedFileData", uploadedFileData)
	const titleFromCookie = cookies.title.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
	const characterId = cookies.characterId || '';
	const formData = new FormData();
	formData.append('feature_used', titleFromCookie);

	if (characterId) {
		const characterIdArray = Array.isArray(characterId) ? characterId : [characterId];
		formData.append('character_ids', JSON.stringify(characterIdArray));
	}

	if (uploadedFileData) {
		formData.append('user_images', uploadedFileData);
	}

	try {
		const axios = axiosInstance(context);
		const response = await axios.post(API_ENDPOINTS.CREATE_NEW_STORE_DATA, formData);

		// Return the data as props
		return {
			props: {
				initialMovies: response?.data?.data || [],
				uploadedDataFile: response?.data?.uploadedDataFile || [],
			},
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return {
			props: {
				initialMovies: [],
				uploadedDataFile: [],
			},
		};
	}
}

export default ViewUpload;

