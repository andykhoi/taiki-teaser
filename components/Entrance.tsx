import {
	FC,
	Dispatch,
	SetStateAction,
	useState,
} from "react";

interface EntranceProps {
	setMounted: Dispatch<SetStateAction<boolean>>
}

export const Entrance: FC<EntranceProps> = ({
	setMounted
}) => {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<div className="Entrance">
			<button onClick={() => setMounted(() => true)} onMouseOver={() => setIsHovered(() => true)} onMouseLeave={() => setIsHovered(() => false)}>
				<div className="DoorIcon">{ isHovered ? 	
					<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M2.66669 27.9999V25.3333H5.33335V6.44661C5.33335 5.80128 5.79469 5.24928 6.42802 5.13461L19.0574 2.83861C19.492 2.75861 19.908 3.04795 19.9867 3.48261C19.996 3.52928 20 3.57595 20 3.62528V5.33195L25.3334 5.33328C26.0694 5.33328 26.6667 5.93061 26.6667 6.66661V25.3333H29.3334V27.9999H24V7.99995H20V27.9999H2.66669ZM17.3334 5.86128L8.00002 7.55995V25.3333H17.3334V5.86128ZM16 14.6666V17.3333H13.3334V14.6666H16Z" fill="black"/>
					</svg> 
					:
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0 24V21.3333H2.66667V1.33333C2.66667 0.597333 3.264 0 4 0H20C20.736 0 21.3333 0.597333 21.3333 1.33333V21.3333H24V24H0ZM18.6667 2.66667H5.33333V21.3333H18.6667V2.66667ZM16 10.6667V13.3333H13.3333V10.6667H16Z" fill="black"/>
					</svg> 
				}</div>
				<div>Enter</div>
			</button>
		</div>
	)
}