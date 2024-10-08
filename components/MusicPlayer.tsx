import {
	FC,
	useState,
	useRef,
	Dispatch,
	SetStateAction,
	SyntheticEvent,
	useEffect
} from "react";

interface MusicPlayerProps {
	musicURL: string
	// isPlaying: boolean
	mounted: boolean
	setMusicCanPlay: Dispatch<SetStateAction<boolean>>
}

export const MusicPlayer: FC<MusicPlayerProps> = ({
	musicURL,
	mounted,
	setMusicCanPlay
}) => {
	const [playing, setPlaying] = useState(false)
	const [muted, setMuted] = useState(true);
	const [ended, setEnded] = useState(false)
	const audioRef = useRef<HTMLAudioElement>(null)
	// console.log(playing, muted, ended)
	useEffect(() => {
		
	}, [mounted])

	useEffect(() => {
		if (mounted && audioRef.current) {
			setMuted(() => false)
			setPlaying(() => true)
			audioRef.current.play()
		}
	}, [mounted])

	useEffect(() => {
		if (audioRef.current) {
			if (playing) {
				audioRef.current.play()
			} else {
				audioRef.current.pause()
			}
		}	
	}, [playing])

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.load()
		}
	}, [])
	return (
		<div className="MusicPlayer">
			<audio 
				// controls={true}
				muted={muted}
				// autoPlay={muted ? false : true}
				id="audio"
				src={musicURL}
				ref={audioRef}
				onCanPlay={() => {
					setMusicCanPlay(() => true)}
				}
				onEnded={() => {
					setEnded(() => true)
					setPlaying(() => false)
				}}
			>
			</audio>
			<div className="AudioControls">
				{
					ended && !playing && <button onClick={() => {
						if (audioRef.current) {
							audioRef.current.currentTime = 0
							audioRef.current.muted = false
							audioRef.current.play()
							setEnded(() => false)
							setMuted(() => false)
							setPlaying(() => true)
						}
					}}> 
						<svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M3.72724 6.88366C3.44028 6.80795 3.20177 6.60869 3.07622 6.33978C2.95067 6.07086 2.95106 5.76007 3.07727 5.49147L5.29161 0.77895C5.45662 0.427769 5.80989 0.203745 6.19791 0.204224C6.58592 0.204705 6.93864 0.429602 7.10278 0.78119L8.07962 2.8735C8.11454 2.85978 8.1506 2.84788 8.18771 2.83793C13.9842 1.28477 19.9422 4.72465 21.4954 10.5211C23.0485 16.3176 19.6087 22.2756 13.8122 23.8288C8.01573 25.3819 2.05768 21.9421 0.504523 16.1456C0.010626 14.3024 0.0217369 12.4398 0.454314 10.7082C0.588166 10.1724 1.13104 9.84651 1.66686 9.98037C2.20268 10.1142 2.52854 10.6571 2.39469 11.1929C2.04229 12.6036 2.03258 14.121 2.43637 15.628C3.70365 20.3575 8.56502 23.1642 13.2946 21.8969C18.0241 20.6297 20.8308 15.7683 19.5635 11.0388C18.317 6.38655 13.5929 3.59481 8.93743 4.71088L9.92302 6.82195C10.0872 7.17353 10.0331 7.58834 9.78433 7.88611C9.53556 8.18389 9.13699 8.31088 8.76181 8.2119L3.72724 6.88366Z" fill="white"/>
						</svg>
					</button> 
				}
				{ playing && !muted &&
					<button onClick={() => {
						if (audioRef.current) {
							audioRef.current.muted = true
							setMuted(() => true)
							// setPlaying(() => false)
						}
					}}> 
						<svg width="26" height="22" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M16.4794 1.46093C16.3486 0.414756 15.1127 -0.0729464 14.3028 0.602011L7.61064 6.17879C7.49083 6.27863 7.33981 6.33331 7.18385 6.33331H1.99992C1.07944 6.33331 0.333252 7.0795 0.333252 7.99998V14C0.333252 14.9205 1.07944 15.6666 1.99992 15.6666H7.18385C7.33981 15.6666 7.49083 15.7213 7.61064 15.8212L14.3028 21.3979C15.1127 22.0729 16.3486 21.5852 16.4794 20.539L16.6071 19.517C17.3141 13.861 17.3141 8.13895 16.6071 2.48292L16.4794 1.46093Z" fill="white"/>
							<path d="M23.5441 2.92767C24.0685 2.75425 24.6341 3.03873 24.8076 3.56308C25.5815 5.90304 25.9999 8.40365 25.9999 11C25.9999 13.5963 25.5815 16.0969 24.8076 18.4369C24.6341 18.9612 24.0685 19.2457 23.5441 19.0723C23.0198 18.8989 22.7353 18.3332 22.9087 17.8089C23.6165 15.669 23.9999 13.3803 23.9999 11C23.9999 8.61971 23.6165 6.331 22.9087 4.1911C22.7353 3.66675 23.0198 3.10109 23.5441 2.92767Z" fill="white"/>
							<path d="M21.043 5.59691C20.8525 5.07851 20.2778 4.	81267 19.7594 5.00314C19.241 5.19361 18.9752 5.76826 19.1657 6.28667C19.705 7.75458 19.9999 9.34172 19.9999 11C19.9999 12.3755 19.797 13.7018 19.4202 14.9515C19.3992 15.0212 19.3777 15.0906 19.3556 15.1597C19.2962 15.346 19.2328 15.5306 19.1657 15.7133C18.9752 16.2317 19.241 16.8064 19.7594 16.9968C20.2778 17.1873 20.8525 16.9215 21.043 16.4031C21.12 16.1934 21.1927 15.9816 21.2609 15.7678C21.2863 15.6884 21.311 15.6088 21.3351 15.5289C21.7677 14.0939 21.9999 12.5732 21.9999 11C21.9999 9.10293 21.6623 7.28247 21.043 5.59691Z" fill="white"/>
						</svg>
					</button> 	
				}
				{
					!ended && muted && <button onClick={() => {
						if (audioRef.current) {
							audioRef.current.muted = false
							setMuted(() => false)
						}
					}}>
						<svg width="26" height="22" viewBox="0 0 27 22" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M16.4794 1.46093C16.3486 0.414756 15.1127 -0.0729463 14.3028 0.602011L7.61064 6.17879C7.49083 6.27863 7.33981 6.33331 7.18385 6.33331H1.99992C1.07944 6.33331 0.333252 7.0795 0.333252 7.99998V14C0.333252 14.9205 1.07944 15.6666 1.99992 15.6666H7.18385C7.33981 15.6666 7.49083 15.7213 7.61064 15.8212L14.3028 21.3979C15.1127 22.0729 16.3486 21.5852 16.4794 20.539L16.6071 19.517C17.3141 13.861 17.3141 8.13895 16.6071 2.48292L16.4794 1.46093Z" fill="white"/>
							<path d="M19.9832 7.93584C20.3737 7.54532 21.0069 7.54532 21.3974 7.93584L23.0473 9.58576L24.6972 7.93584C25.0877 7.54532 25.7209 7.54532 26.1114 7.93584C26.502 8.32637 26.502 8.95953 26.1114 9.35006L24.4615 11L26.1114 12.6499C26.502 13.0404 26.502 13.6736 26.1114 14.0641C25.7209 14.4546 25.0877 14.4546 24.6972 14.0641L23.0473 12.4142L21.3974 14.0641C21.0069 14.4546 20.3737 14.4546 19.9832 14.0641C19.5926 13.6736 19.5926 13.0404 19.9832 12.6499L21.6331 11L19.9832 9.35006C19.5926 8.95953 19.5926 8.32637 19.9832 7.93584Z" fill="white"/>
						</svg>
					</button>
				}
			</div>
		</div>
	)
}