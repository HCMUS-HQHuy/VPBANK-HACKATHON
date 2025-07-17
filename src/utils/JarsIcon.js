import { faHome, faPiggyBank, faMugHot, faBook, faChartLine, faGift, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const JarsIcon = {
  necessities: {
    label: "Necessities",
    icon: faHome,
    color: 'text-blue',
    bgLight: 'bg-blue-light',
    bg: 'bg-blue'
  },
  long_term_savings: {
    label: "Savings",
    icon: faPiggyBank,
    color: 'text-green',
    bgLight: 'bg-green-light',
    bg: 'bg-green'
  },

  play: {
    label: "Fun",
    icon: faMugHot,
    color: 'text-yellow',
    bgLight: 'bg-yellow-light',
    bg: 'bg-yellow'
  },

  education: {
    label: "Education",
    icon: faBook,
    color: 'text-primary',
    bgLight: 'bg-primary-light',
    bg: 'bg-primary'
  },

  financial_freedom: {
    label: "Invest",
    icon: faChartLine,
    color: 'text-pink',
    bgLight: 'bg-pink-light',
    bg: 'bg-pink'
  },

  give: {
    label: "Give",
    icon: faGift,
    color: 'text-danger',
    bgLight: 'bg-danger-light',
    bg: 'bg-danger'
  },
  
  Default: {
    label: "Other",
    icon: faQuestionCircle,
    color: 'text-text-secondary',
    bgLight: 'bg-card-secondary',
    bg: 'bg-border'
  }
};

export default JarsIcon;