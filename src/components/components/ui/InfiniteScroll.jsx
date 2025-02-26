import { useRef, useCallback, useState, useEffect } from 'react';

/**
 * InfiniteScroll Component
 * 
 * A reusable component that implements infinite scrolling functionality.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to be rendered
 * @param {boolean} props.hasMore - Whether there are more items to load
 * @param {Function} props.loadMore - Function to call when more items should be loaded
 * @param {boolean} props.loading - Whether items are currently being loaded
 * @param {string} props.className - Additional CSS classes for the container
 * @param {React.ReactNode} props.loader - Custom loader component
 * @param {number} props.threshold - Intersection observer threshold (0 to 1)
 * @param {number} props.loadOffset - How many pixels before the end to start loading more
 * @param {React.RefObject} props.scrollContainerRef - Ref to the scrollable container
 * @returns {JSX.Element}
 */
const InfiniteScroll = ({
	children,
	hasMore,
	loadMore,
	loading,
	className = '',
	loader = null,
	threshold = 0.5,
	loadOffset = 0,
	scrollContainerRef = null
}) => {
	const observerRef = useRef(null);
	const loadMoreTriggerRef = useRef(null);

	// Setup intersection observer for infinite scrolling
	const lastElementRef = useCallback(node => {
		if (loading) return;

		if (observerRef.current) {
			observerRef.current.disconnect();
		}

		observerRef.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && hasMore && !loading) {
				loadMore();
			}
		}, {
			threshold: threshold,
			root: scrollContainerRef?.current || null,
			rootMargin: `0px 0px ${loadOffset}px 0px`
		});

		if (node) {
			observerRef.current.observe(node);
		}
	}, [loading, hasMore, loadMore, threshold, loadOffset, scrollContainerRef]);

	// Clean up observer on unmount
	useEffect(() => {
		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, []);

	return (
		<div className={className}>
			{children}
			<div ref={lastElementRef} className="h-1 w-full"></div>
			{loading && (loader || (
				<div className="flex justify-center items-center py-4">
					<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
				</div>
			))}
		</div>
	);
};

export default InfiniteScroll;