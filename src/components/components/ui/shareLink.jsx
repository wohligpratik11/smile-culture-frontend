"use client";

import { X } from "lucide-react";
import { useState } from "react";
import Instagram from "../../../../public/assets/images/instagram.webp"
import Facebook from "../../../../public/assets/images/facebook.webp"
import Mail from "../../../../public/assets/images/mail.webp"
import Reddit from "../../../../public/assets/images/reddit.webp"
import XIcon from "../../../../public/assets/images/x.webp"
import Thread from "../../../../public/assets/images/thread.webp"

export default function ShareModal({ isOpen, onClose, url }) {
	const [copied, setCopied] = useState(false);

	if (!isOpen) return null;

	const shareOptions = [
		{
			name: "Instagram",
			icon: Instagram,
			link: `https://www.instagram.com/sharer.php?u=${url}`,
		},
		{
			name: "WhatsApp",
			icon: Mail,
			link: `https://wa.me/?text=${url}`,
		},
		{
			name: "Facebook",
			icon: Facebook,
			link: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
		},
		{
			name: "Twitter",
			icon: XIcon,
			link: `https://twitter.com/intent/tweet?url=${url}`,
		},
		{
			name: "Reddit",
			icon: Reddit,
			link: `https://reddit.com/submit?url=${url}`,
		},
		{
			name: "Thread",
			icon: Thread,
			link: `https://reddit.com/submit?url=${url}`,
		},
	];

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(url);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy text: ", err);
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="relative w-full max-w-lg rounded-xl bg-deepNavy p-6 text-white shadow-lg">
				<button
					onClick={onClose}
					className="absolute right-4 top-4 text-gray-400 hover:text-white"
					aria-label="Close share modal"
				>
					<X className="h-6 w-6" />
				</button>

				<h2 className="mb-8 text-2xl font-semibold">Share</h2>

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
								<img src={option.icon.src || "/placeholder.svg"} alt="" className="w-14 h-14" aria-hidden="true" />
							</div>
							<span className="text-sm text-white font-normal">{option.name}</span>
						</a>
					))}
				</div>

				<div className="flex items-center gap-2 rounded-md bg-[#2c387e] p-2 border">
					<input
						type="text"
						value={url}
						readOnly
						className="flex-1 bg-transparent px-2 border-none font-normal text-lg text-white focus:outline-none"
					/>
					<button
						onClick={handleCopy}
						className="rounded-lg bg-[#00BCD4] px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-[#00ACC1] focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:ring-offset-2 focus:ring-offset-[#2B3147]"
					>
						{copied ? "Copied!" : "Copy"}
					</button>
				</div>
			</div>
		</div>
	);
}
