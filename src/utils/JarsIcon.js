// file: src/utils/JarsIcon.js

import { faHome, faPiggyBank, faMugHot, faBook, faChartLine, faGift, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const JarsIcon = {
  // THAY ĐỔI KEY Ở ĐÂY: "Necessities" -> "necessities"
  necessities: {
    label: "Necessities",
    icon: faHome,
    color: 'text-blue',
    bgLight: 'bg-blue-light',
    bg: 'bg-blue'
  },
  // THAY ĐỔI KEY Ở ĐÂY: "Savings" -> "long_term_savings" (khớp với database.py)
  long_term_savings: {
    label: "Savings",
    icon: faPiggyBank,
    color: 'text-green',
    bgLight: 'bg-green-light',
    bg: 'bg-green'
  },
  // THAY ĐỔI KEY Ở ĐÂY: "Fun" -> "play" (khớp với database.py)
  play: {
    label: "Fun",
    icon: faMugHot,
    color: 'text-yellow',
    bgLight: 'bg-yellow-light',
    bg: 'bg-yellow'
  },
  // THAY ĐỔI KEY Ở ĐÂY: "Education" -> "education"
  education: {
    label: "Education",
    icon: faBook,
    color: 'text-primary',
    bgLight: 'bg-primary-light',
    bg: 'bg-primary'
  },
  // THAY ĐỔI KEY Ở ĐÂY: "Invest" -> "financial_freedom" (khớp với database.py)
  financial_freedom: {
    label: "Invest",
    icon: faChartLine,
    color: 'text-pink',
    bgLight: 'bg-pink-light',
    bg: 'bg-pink'
  },
  // THAY ĐỔI KEY Ở ĐÂY: "Give" -> "give"
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