import React, { useCallback } from 'react';
import { X } from 'lucide-react';

const FullscreenModal = ({ isOpen, onClose, media }) => {
	if (!isOpen || !media) return null;

	const handleClose = useCallback((e) => {
		e.stopPropagation(); 
		onClose();
	}, [onClose]);

	const handleModalClick = useCallback((e) => {
		e.stopPropagation();
	}, []);

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
			onClick={handleClose} 
		>
			<div
				className="relative w-full h-full flex items-center justify-center p-4"
				onClick={handleModalClick} 
			>
				<button
					onClick={handleClose}
					className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
					aria-label="Close modal"
				>
					<X className="w-6 h-6 text-white" />
				</button>

				{media.mode === 'video' ? (
					<video
						src={media.output_video_url}
						controls
						autoPlay
						className="max-w-full max-h-full object-contain"
						controlsList="nodownload"
						disablePictureInPicture
					/>
				) : (
					<img
						src={media.output_video_url}
						alt={media.scene_name || 'Full screen image'}
						className="max-w-full max-h-full object-contain"
					/>
				)}
			</div>
		</div>
	);
};

export default FullscreenModal;