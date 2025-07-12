import { faHouseChimney, faPiggyBank, faMartiniGlassCitrus, faGraduationCap, faHandHoldingDollar, faGift } from '@fortawesome/free-solid-svg-icons'

const JarsIcon = {
  Necessities: {
    label: 'Necessities',
    percent: '55%',
    icon: faHouseChimney,
    colorLight: 'primary-light',
    color: 'primary'
  },
  Savings: {
    label: 'Savings',
    percent: '10%',
    icon: faPiggyBank,
    colorLight: 'green-light',
    color: 'green'
  },
  Fun: {
    label: 'Fun',
    percent: '10%',
    icon: faMartiniGlassCitrus,
    colorLight: 'yellow-light',
    color: 'yellow'
  },
  Education: {
    label: 'Education',
    percent: '10%',
    icon: faGraduationCap,
    colorLight: 'blue-light',
    color: 'blue'
  },
  Invest: {
    label: 'Invest',
    percent: '10%',
    icon: faHandHoldingDollar,
    colorLight: 'danger-light',
    color: 'danger'
  },
  Give: {
    label: 'Give',
    percent: '5%',
    icon: faGift,
    colorLight: 'pink-light',
    color: 'pink'
  }
};


export default JarsIcon;