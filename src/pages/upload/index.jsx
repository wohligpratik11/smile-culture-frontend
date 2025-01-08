import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Input } from '../../components/components/ui/input';
import { Card, CardContent } from '../../components/components/ui/card';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CiSearch } from "react-icons/ci";
import { apiService, API_ENDPOINTS } from '../../lib/api/apiService';
import axiosInstance from '../../lib/api/axiosInstance';
import Cookie from 'js-cookie';
import Image from 'next/image';
import CryptoJS from 'crypto-js';

const uploadPage = ({ characters }) => {
	const router = useRouter();
	const [titleFromCookie, setTitleFromCookie] = useState(null);
	const [selectedCharacters, setSelectedCharacters] = useState([]);
	console.log("selectedCharacters", selectedCharacters)
	useEffect(() => {
		// Get the title from cookies
		const title = Cookie.get('title');
		setTitleFromCookie(title);

		// Retrieve the encrypted selected characters from cookies
		const encryptedData = Cookie.get('selectedCharacters');

		if (encryptedData) {
			// Decrypt the data
			const bytes = CryptoJS.AES.decrypt(encryptedData, 'your-encryption-key');
			const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

			if (decryptedData) {
				// Parse the decrypted data to an array of characters
				setSelectedCharacters(JSON.parse(decryptedData));
			}
		}
	}, []);

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
						Select Mode
					</div>

				</div>
				<div className="flex justify-end space-x-4 mt-6">
					<button
						className="px-4 py-2 rounded-lg bg-gradient-custom-gradient border border-buttonBorder w-52 h-12"
						onClick={() => selectedMovie && router.push(selectedMovie.path)}
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
		const axios = axiosInstance(context);
		const selectedCharactersCookie = Cookie.get('selectedCharacters');
		const payload = selectedCharactersCookie ? {
			selected_characters: selectedCharactersCookie,
		} : {};


		const response = await axios.post(API_ENDPOINTS.GET_ALL_SELECTED_CHARACTERS_LIST, payload);
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

export default uploadPage;
