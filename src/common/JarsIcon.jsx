import { faHouseChimney, faPiggyBank, faMartiniGlassCitrus, faGraduationCap, faHandHoldingDollar, faGift } from '@fortawesome/free-solid-svg-icons'

const JarsIcon = [
	{ label: 'Necessities',	percent: '55%', icon: faHouseChimney,		colorLight: 'primary-light',color: 'primary' },
	{ label: 'Savings',		percent: '10%', icon: faPiggyBank, 			colorLight: 'green-light', 	color: 'green' },
	{ label: 'Fun',			percent: '10%', icon: faMartiniGlassCitrus, colorLight: 'yellow-light', color: 'yellow' },
	{ label: 'Education',	percent: '10%', icon: faGraduationCap, 		colorLight: 'blue-light', 	color: 'blue' },
	{ label: 'Invest',		percent: '10%', icon: faHandHoldingDollar, 	colorLight: 'danger-light', color: 'danger' },
	{ label: 'Give',		percent: '5%', 	icon: faGift,				colorLight: 'pink-light', 	color: 'pink' },
];

export default JarsIcon;