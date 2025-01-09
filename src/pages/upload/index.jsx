import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Card } from '../../components/components/ui/card';
import Link from 'next/link';
import { ArrowLeft, ArrowUpFromLine } from 'lucide-react';
import Cookie from 'js-cookie';
import Image from 'next/image';
import CryptoJS from 'crypto-js';
import SelectImage from "../../../public/assets/images/image.webp";
import Video from "../../../public/assets/images/video.webp";
import UploadImages from "../../../public/assets/images/uploadImages.webp";
import MediaUploader from '../../components/components/ui/UppyUploader';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '../../components/components/ui/dialog'; // Import Dialog components

const UploadPage = ({ characters }) => {
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
					<h2 className="text-white text-xl mb-4">Select Mode</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-xs sm:max-w-sm">
						<Card
							className={`p-4 sm:p-6 cursor-pointer transition-all h-[122px] w-full sm:w-[172px] rounded-xl ${selectedMode === 'image'
								? 'bg-gradient-custom-gradient border border-buttonBorder rounded-lg'
								: 'bg-blueYonder'
								}`}
							onClick={() => handleModeSelect('image')}
						>
							<div className="flex flex-col items-center gap-2">
								<Image src={SelectImage} alt="Image Icon" className="w-10 sm:w-12 h-10 sm:h-12" />
								<span className="text-white text-sm sm:text-base">Image</span>
							</div>
						</Card>


						<Card
							className={`p-4 sm:p-6 cursor-pointer transition-all h-[122px] w-full sm:w-[172px] rounded-xl ${selectedMode === 'video'
								? 'bg-gradient-custom-gradient border border-buttonBorder'
								: 'bg-blueYonder'
								}`}
							onClick={() => handleModeSelect('video')}
						>
							<div className="flex flex-col items-center gap-2">
								<Image src={Video} alt="Video Icon" className="w-10 sm:w-12 h-10 sm:h-12" />
								<span className="text-white text-sm sm:text-base">Video</span>
							</div>
						</Card>
					</div>

					<h2 className="text-white text-xl mb-4">Upload Selfie</h2>
					<span className="text-white text-xl mb-4">character 1</span>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-xs sm:max-w-sm">
						<Card
							className={`p-4 sm:p-6 cursor-pointer transition-all h-[122px] w-full sm:w-[172px] rounded-xl ${selectedMode === 'image'
								? 'bg-gradient-custom-gradient border border-buttonBorder rounded-lg'
								: 'bg-blueYonder'
								}`}
							onClick={openModal}
						>
							<div className="flex flex-col items-center gap-2">
								<Image src={UploadImages} alt="Image Icon" className="w-10 sm:w-12 h-10 sm:h-12" />
								<div className="flex items-center space-x-2" onClick={openModal}>
									<ArrowUpFromLine size={20} strokeWidth={3} absoluteStrokeWidth />
									<span className="text-white font-medium text-xs">Upload Image</span>
								</div>
							</div>
						</Card>
					</div>

					<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
						<DialogTrigger asChild>
							{/* Trigger Component */}
						</DialogTrigger>
						<DialogContent className="mx-auto max-w-4xl p-4 !bg-deepNavy rounded-lg">
							<DialogTitle className="text-xl font-medium">Upload Selfie Image</DialogTitle>
							<MediaUploader />
						</DialogContent>
					</Dialog>



				</div>
				<div className="flex justify-end space-x-4 mt-6">
					<button
						className="px-4 py-2 bg-gradient-custom-gradient border border-buttonBorder rounded-lg w-52 h-12"
						disabled={!selectedMode}
						onClick={() => {
							if (selectedMode) {
								router.push(`/next-step?mode=${selectedMode}`);
							}
						}}
					>
						Next
					</button>
				</div>
			</Card>
		</div>
	);
};

export async function getServerSideProps(context) {
	try {
		return {
			props: {
				characters: [],
			},
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return {
			props: {
				characters: [],
			},
		};
	}
}

export default UploadPage;
