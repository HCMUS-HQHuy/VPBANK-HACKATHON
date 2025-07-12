import { faHouseChimney, faPiggyBank, faMartiniGlassCitrus, faGraduationCap, faHandHoldingDollar, faGift } from '@fortawesome/free-solid-svg-icons'

const JarsIcon = [
	{ label: 'Necessities',	percent: '55%', icon: faHouseChimney,		background: 'bg-primary-light',	color: 'text-primary' },
	{ label: 'Savings',		percent: '10%', icon: faPiggyBank, 			background: 'bg-green-light', 	color: 'text-green' },
	{ label: 'Fun',			percent: '10%', icon: faMartiniGlassCitrus, background: 'bg-yellow-light', 	color: 'text-yellow' },
	{ label: 'Education',	percent: '10%', icon: faGraduationCap, 		background: 'bg-blue-light', 	color: 'text-blue' },
	{ label: 'Invest',		percent: '10%', icon: faHandHoldingDollar, 	background: 'bg-danger-light', 	color: 'text-danger' },
	{ label: 'Give',		percent: '5%', 	icon: faGift,				background: 'bg-pink-light', 	color: 'text-pink' },
];

export default JarsIcon;