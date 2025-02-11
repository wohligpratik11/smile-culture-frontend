"use client";

import { X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Instagram from "../../../../public/assets/images/instagram.webp";
import Facebook from "../../../../public/assets/images/facebook.webp";
import Whatsapp from "../../../../public/assets/images/whatsapp.webp";
import Reddit from "../../../../public/assets/images/reddit.webp";
import XIcon from "../../../../public/assets/images/x.webp";
import Thread from "../../../../public/assets/images/thread.webp";

export default function ShareModal({ isOpen, onClose, movies }) {
	const [copied, setCopied] = useState(false);
	const modalRef = useRef(null);

	const videoUrl = movies;
	const shareOptions = [
		{
			name: "Whatsapp",
			icon: Whatsapp,
			link: `https://api.whatsapp.com/send?text=${videoUrl}`,
		},
		{
			name: "Facebook",
			icon: Facebook,
			link: `https://www.facebook.com/`,
		},
		{
			name: "X",
			icon: XIcon,
			link: `https://x.com/intent/tweet?url=${videoUrl}`,
		},
		{
			name: "Reddit",
			icon: Reddit,
			link: `https://www.reddit.com/submit?url=${videoUrl}`,
		},
		{
			name: "Instagram",
			icon: Instagram,
			link: `https://www.instagram.com/`,
			disabled: false,  // Allow clicking
			tooltip: "Copy link to share on Instagram manually"
		},
		{
			name: "Thread",
			icon: Thread,
			link: `https://www.threads.net/`,
			disabled: true,
			tooltip: "Threads sharing not supported yet"
		},
	];


	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(videoUrl);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy text: ", err);
		}
	};

	// Close modal if click outside
	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				onClose();
			}
		};

		document.addEventListener("mousedown", handleOutsideClick);
		return () => document.removeEventListener("mousedown", handleOutsideClick);
	}, [onClose]);

	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 ${!isOpen ? 'hidden' : ''}`}
		>

			<div
				ref={modalRef}
				className="relative w-full max-w-lg rounded-xl bg-deepNavy p-6 text-white shadow-lg"
			>
				<div className="flex items-center justify-between mb-4 bg-deepNavy">
					<span className="text-xl font-medium leading-8 text-customWhite">Share the video with anyone you like!</span>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-white leading-8"
						aria-label="Close share modal"
					>
						<X className="h-6 w-6 text-xl font-medium text-customWhite" />
					</button>
				</div>


				<div className="mb-8 grid grid-cols-3 gap-8 sm:grid-cols-6">
					{shareOptions.map((option) => (
						<a
							key={option.name}
							href={option.link}
							target="_blank"
							rel="noopener noreferrer"
							className="flex flex-col items-center gap-2"
						>
							<div className={`flex h-16 w-16 items-center justify-center rounded-full ${option.icon.src}`}>
								<img
									src={option.icon.src || "/placeholder.svg"}
									alt=""
									className="w-14 h-14"
									aria-hidden="true"
								/>
							</div>
							<span className="text-sm text-white font-normal">{option.name}</span>
						</a>
					))}
				</div>

				<div className="flex items-center gap-2 rounded-md bg-[#2c387e] p-2 border">
					<input
						type="text"
						value={videoUrl}
						readOnly
						className="flex-1 bg-transparent px-2 border-none font-normal text-lg text-white focus:outline-none"
					/>
					<button
						onClick={handleCopy}
						className="rounded-lg bg-gradient-custom-gradient px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-[#00ACC1] focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:ring-offset-2 focus:ring-offset-[#2B3147]"
					>
						{copied ? "Copied!" : "Copy"}
					</button>
				</div>
			</div>
		</div>
	);
}
