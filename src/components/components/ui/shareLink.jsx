// components/SocialShareModal.js

'use client'

import { X } from 'lucide-react'
import { useState } from 'react'
import { Button } from "../ui/button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog"

export default function SocialShareModal({ open, onClose, shareUrl }) {
	const [copied, setCopied] = useState(false)

	const socialLinks = [
		{
			name: "Instagram",
			icon: "/instagram.svg",
			color: "bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-500",
			url: `https://www.instagram.com/share?url=${shareUrl}`,
		},
		{
			name: "WhatsApp",
			icon: "/whatsapp.svg",
			color: "bg-[#25D366]",
			url: `https://wa.me/?text=${shareUrl}`,
		},
		{
			name: "Facebook",
			icon: "/facebook.svg",
			color: "bg-[#1877F2]",
			url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
		},
		{
			name: "Twitter",
			icon: "/twitter.svg",
			color: "bg-[#1DA1F2]",
			url: `https://twitter.com/intent/tweet?url=${shareUrl}`,
		},
		{
			name: "Email",
			icon: "/gmail.svg",
			color: "bg-[#EA4335]",
			url: `mailto:?body=${shareUrl}`,
		},
		{
			name: "Reddit",
			icon: "/reddit.svg",
			color: "bg-[#FF4500]",
			url: `https://reddit.com/submit?url=${shareUrl}`,
		},
	]

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(shareUrl)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error("Failed to copy text: ", err)
		}
	}

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
							<div className={`p-3 rounded-full ${social.color}`}>
								<img
									src={social.icon}
									alt={social.name}
									className="w-6 h-6"
								/>
							</div>
							<span className="text-xs text-white">{social.name}</span>
						</a>
					))}
				</div>
				<div className="flex items-center gap-2 bg-[#2c387e] rounded-md p-2">
					<input
						type="text"
						readOnly
						value={shareUrl}
						className="flex-1 bg-transparent border-none text-sm text-white focus:outline-none"
					/>
					<Button
						type="submit"
						size="sm"
						onClick={copyToClipboard}
						className="bg-[#3d5afe] hover:bg-[#536dfe] text-white"
					>
						{copied ? "Copied!" : "Copy"}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
