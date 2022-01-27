import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {
	useState,
	useRef
} from 'react'
import { Landing } from '../components/Landing'
import { Entrance
 } from '../components/Entrance'

import { s3Client } from '../utils/s3'

interface IndexProps {
	imageURLs: string[]
	musicURL: string
}

const Index: NextPage<IndexProps> = ({
	imageURLs,
	musicURL,
}) => {
	const [imagesPreloaded, setImagesPreloaded] = useState(false)
	const [musicCanPlay, setMusicCanPlay] = useState(false)
	// const [readyToMount, setReadyToMount] = useState(false)
	const [mounted, setMounted] = useState(false)
	console.log(imagesPreloaded)
	console.log(musicCanPlay)
	return (
		<>
			{
				!mounted && musicCanPlay && imagesPreloaded && <Entrance setMounted={setMounted} />  
			}
			<div className="TaikiFriends">
				<Landing mounted={mounted} imageURLs={imageURLs} musicURL={musicURL} setMusicCanPlay={setMusicCanPlay} setImagesPreloaded={setImagesPreloaded} /> 
			</div>
		</>
		
	)
}

export async function getStaticProps() {
	let imageURLs: string[] = []
	let musicURL: string = ''
	const bucketURL = 'https://taiki.s3.us-west-2.amazonaws.com/'
	const imageData = await s3Client.listObjectsV2({
		Bucket: 'taiki',
		Prefix: 'taiki_images'
	})
	const musicData = await s3Client.listObjectsV2({
		Bucket: 'taiki',
		Prefix: 'music/taiki_music.mp3'
	})
	// console.log(musicData)
	if (musicData.Contents !== undefined && musicData.Contents.length > 0) {
		musicURL = `${bucketURL}${musicData.Contents[0].Key}`
	}
	if (imageData.Contents !== undefined && imageData.Contents.length > 0) {
		imageData.Contents.forEach(content => imageURLs.push(`${bucketURL}${content.Key}`))
	}
	
	return {
		props: {
			imageURLs,
			musicURL
		}, // will be passed to the page component as props
	}
}

export default Index;