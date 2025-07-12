import { faHouseChimney, faPiggyBank, faMartiniGlassCitrus, faGraduationCap, faHandHoldingDollar, faGift } from '@fortawesome/free-solid-svg-icons'

const JarsIcon = [
	{ label: 'Necessities',	percent: '55%', icon: faHouseChimney,		background: 'bg-indigo-100',	color: 'text-indigo-600' },
	{ label: 'Savings',		percent: '10%', icon: faPiggyBank, 			background: 'bg-green-100', 	color: 'text-green-600' },
	{ label: 'Fun',			percent: '10%', icon: faMartiniGlassCitrus, background: 'bg-yellow-100', 	color: 'text-yellow-600' },
	{ label: 'Education',	percent: '10%', icon: faGraduationCap, 		background: 'bg-blue-100', 		color: 'text-blue-600' },
	{ label: 'Invest',		percent: '10%', icon: faHandHoldingDollar, 	background: 'bg-red-100', 		color: 'text-red-600' },
	{ label: 'Give',		percent: '5%', 	icon: faGift,				background: 'bg-pink-100', 		color: 'text-pink-600' },
];

export default JarsIcon;