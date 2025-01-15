import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
} from 'react'
import { createPortal } from 'react-dom'
import { AiFillExclamationCircle } from 'react-icons/ai'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import SolidSubtleMultiAlert from '../../components/components/ui/sollidalert'

const ToasterContext = createContext()

export const useToaster = () => {
	const context = useContext(ToasterContext)
	if (!context) {
		throw new Error('useToaster must be used within a ToasterProvider')
	}
	return context
}

export const ToasterProvider = ({ children }) => {
	const [toast, setToast] = useState(null)
	const [toasterContainer, setToasterContainer] = useState(null)

	const toastTypeIconColors = {
		success: 'text-green-500',
		error: 'text-red-500',
		warning: 'text-amber-500',
		info: 'text-blueSecondary',
	}

	const toastBgColors = {
		success: 'bg-[#C9FBD5] dark:!bg-navy-700',
		error: 'bg-[#FDE0D0] dark:!bg-navy-700',
		warning: 'bg-[#FFF6DA] dark:!bg-navy-700',
		info: 'bg-[#E9E3FF] dark:!bg-navy-700',
	}

	const addToast = useCallback((toastData) => {
		const iconColor = toastTypeIconColors[toastData.type] || ''
		const bgColor = toastBgColors[toastData.type] || ''
		setToast({ ...toastData, iconColor, bgColor })
		setTimeout(() => {
			removeToast()
		}, toastData.duration || 5000)
	}, [])

	const removeToast = useCallback(() => {
		setToast(null)
	}, [])

	useEffect(() => {
		// Ensure this code only runs in the browser
		if (typeof window !== 'undefined') {
			const container = document.createElement('div')
			container.className = 'toast-container'
			document.body.appendChild(container)
			setToasterContainer(container)

			// Cleanup on unmount
			return () => {
				document.body.removeChild(container)
			}
		}
	}, [])

	return (
		<ToasterContext.Provider value={{ addToast, removeToast }}>
			{children}
			{toast &&
				toasterContainer &&
				createPortal(
					<div className="toast">
						<SolidSubtleMultiAlert
							title={toast.title}
							description={toast.description}
							iconColor={toast.iconColor}
							icon={
								toast?.type === 'success' ? (
									<BsFillCheckCircleFill />
								) : (
									<AiFillExclamationCircle />
								)
							}
							closeBg="hover:bg-white/20 text-navy-900 dark:text-white"
							bg={toast.bgColor}
							removeToast={removeToast}
						/>
					</div>,
					toasterContainer
				)}
		</ToasterContext.Provider>
	)
}
