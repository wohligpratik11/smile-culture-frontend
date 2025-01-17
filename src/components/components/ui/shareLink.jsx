
'use client'

import { X } from 'lucide-react'
import { useState } from 'react'
import { Button } from "../ui/button"
import Instagram from "../../../../public/assets/images/instagram.webp"
import Facebook from "../../../../public/assets/images/facebook.webp"
import Mail from "../../../../public/assets/images/mail.webp"
import Reddit from "../../../../public/assets/images/reddit.webp"
import XIcon from "../../../../public/assets/images/x.webp"
import Thread from "../../../../public/assets/images/thread.webp"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog"

export default function SocialShareModal({ open, onClose, movies }) {
	const [copied, setCopied] = useState(false)
	useEffect(() => {
		console.log('Movies array:', movies);
	}, [movies]);
	const shareUrl = movies
		?.map((movie) => movie.output_video_url)
		.filter(Boolean) // Remove undefined or null values
		.join(','); // Use comma or other delimiter if needed
	const socialLinks = [
		{
			name: 'Instagram',
			url: `https://www.instagram.com/share?url=${encodeURIComponent(shareUrl)}`,
			icon: Instagram,
		},
		{
			name: 'Facebook',
			url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
			icon: Facebook,
		},
		{
			name: 'Email',
			url: `mailto:?body=${encodeURIComponent(shareUrl)}`,
			icon: Mail,
		},
		{
			name: 'Reddit',
			url: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}`,
			icon: Reddit,
		},
		{
			name: 'X',
			url: '#',
			icon: XIcon,
		},
		{
			name: 'Thread',
			url: '#',
			icon: Thread,
		},
	];
	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(shareUrl);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy text: ', err);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md bg-[#1a237e] text-white">
				<DialogHeader>
					<DialogTitle className="text-center text-white">Share</DialogTitle>
					<Button
						variant="ghost"
						className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
						onClick={() => onClose(false)}
					>
						<X className="h-4 w-4 text-white" />
						<span className="sr-only">Close</span>
					</Button>
				</DialogHeader>
				<div className="flex justify-center gap-4 py-4">
					{socialLinks.map((social) => (
						<a
							key={social.name}
							href={social.url}
							target="_blank"
							rel="noopener noreferrer"
							className="flex flex-col items-center gap-1"
						>
							<img src={social.icon.src} alt={social.name} className="w-14 h-14" />
							<span className="text-sm text-white font-normal">{social.name}</span>
						</a>
					))}
				</div>
				<div className="flex items-center gap-2 bg-[#2c387e] rounded-md p-2 border">
					<input
						type="text"
						readOnly
						value={shareUrl}
						className="flex-1 bg-transparent border-none font-normal text-lg text-white focus:outline-none"
					/>
					<Button
						type="submit"
						size="sm"
						onClick={copyToClipboard}
						className="bg-[#3d5afe] hover:bg-[#536dfe] text-white"
					>
						{copied ? 'Copied!' : 'Copy'}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
