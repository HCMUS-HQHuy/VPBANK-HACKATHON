import {
  faHouseChimney,
  faPiggyBank,
  faMartiniGlassCitrus,
  faGraduationCap,
  faHandHoldingDollar,
  faGift
} from '@fortawesome/free-solid-svg-icons';

const JarsIcon = {
  Necessities: {
    label: 'Necessities',
    percent: '55%',
    icon: faHouseChimney,
    bgLight: 'bg-primary-light',
    bg: 'bg-primary',
    color: 'text-primary',
    colorLight: 'text-primary-light'
  },
  Savings: {
    label: 'Savings',
    percent: '10%',
    icon: faPiggyBank,
    bgLight: 'bg-green-light',
    bg: 'bg-green',
    color: 'text-green',
    colorLight: 'text-green-light'
  },
  Fun: {
    label: 'Fun',
    percent: '10%',
    icon: faMartiniGlassCitrus,
    bgLight: 'bg-yellow-light',
    bg: 'bg-yellow',
    color: 'text-yellow',
    colorLight: 'text-yellow-light'
  },
  Education: {
    label: 'Education',
    percent: '10%',
    icon: faGraduationCap,
    bgLight: 'bg-blue-light',
    bg: 'bg-blue',
    color: 'text-blue',
    colorLight: 'text-blue-light'
  },
  Invest: {
    label: 'Invest',
    percent: '10%',
    icon: faHandHoldingDollar,
    bgLight: 'bg-danger-light',
    bg: 'bg-danger',
    color: 'text-danger',
    colorLight: 'text-danger-light'
  },
  Give: {
    label: 'Give',
    percent: '5%',
    icon: faGift,
    bgLight: 'bg-pink-light',
    bg: 'bg-pink',
    color: 'text-pink',
    colorLight: 'text-pink-light'
  }
};

export default JarsIcon;
