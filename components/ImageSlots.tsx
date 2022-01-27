/* eslint-disable @next/next/no-img-element */
import {
	Dispatch,
	FC,
	SetStateAction,
	useEffect,
	useRef,
	useCallback,
	useState
} from 'react'
import Img from 'next/image' 

interface ImageSlotsProps {
	imageURLs: string[]
	setImagesPreloaded: Dispatch<SetStateAction<boolean>>
	mounted: boolean
}

export const ImageSlots: FC<ImageSlotsProps> = ({
	imageURLs,
	setImagesPreloaded,
	mounted
}) => {
	
	const urlStore = useRef(imageURLs)
	const loadedImages = useRef<string[]>([])
	const iterations = useRef(0)
	const [activeImages, setActiveImages] = useState<[string | undefined, string | undefined, string | undefined]>([undefined, undefined, undefined])
	// preload the first 9 images 
	// get random index value 
	const preloadImage = useCallback((url: string) => {
		// console.log(url)
		const image = new Image()
		image.src = url
		image.onload = () => {
			loadedImages.current.push(url)
			if (loadedImages.current.length === 3) {
				console.log('test')
				loadActiveImages(iterations.current)
				setImagesPreloaded(() => true) 
			}
		}
	}, [setImagesPreloaded])
	
	const loadImages = useCallback((num: number) => {
		for (let i = 0; i < num; i++) {
			const randIndex = Math.floor(Math.random()*urlStore.current.length)
			const value = urlStore.current[randIndex]
			urlStore.current.splice(randIndex, 1)
			preloadImage(value)
		}
	}, [preloadImage])

	const loadActiveImages = (iteration: number) => {
		setActiveImages(() => {
			let multiple = iteration * 3
			if (multiple >= loadedImages.current.length) {
				multiple = 0
				iterations.current = 0
			}
			return [loadedImages.current[multiple], loadedImages.current[multiple + 1], loadedImages.current[multiple + 2]]
		})
		iterations.current++
	}
	
	useEffect(() => {
		loadImages(9)
	}, [])

	useEffect(() => {
		if (mounted) {
			const interval = setInterval(() => {
				loadActiveImages(iterations.current)
			}, 1000)
		}
	}, [mounted])

	return (
		<div className="ImageSlots">
			<div className="Slot">
				<img src={activeImages[0]} alt="taiki friend uno" />
			</div>
			<div className="Slot">
				<img src={activeImages[1]} alt="taiki friend uno" />
			</div>
			<div className="Slot">
				<img src={activeImages[2]} alt="taiki friend uno" />
			</div>
		</div>
	)
}