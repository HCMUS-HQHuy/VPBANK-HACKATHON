import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import JarsIcon from '@/utils/JarsIcon'; 

const JarCard = ({ icon, color, name, remaining, total }) => {
  const percentage = remaining * 100 /total;
  const themeColor = `bg-${color}`;
  const iconColor =  `text-${color}`;
  console.log(themeColor);
  console.log(iconColor);
  return (
    <div className={`relative p-5 border border-border rounded-xl flex flex-col bg-card hover:bg-card-secondary`}>
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={icon} className={`text-xl w-6 text-center ${iconColor}`}/>
                <h4 className="font-bold text-text-primary">{name}</h4>
            </div>
        </div>
        <div className="mt-4 flex-grow">
            <p className="text-sm font-medium text-text-secondary">Remaining</p>
            <p className="text-2xl font-bold text-text-primary">
                {remaining} <span className="text-lg font-normal text-text-secondary">/ {total}</span>
            </p>
        </div>
        <div className="mt-2">
            <div className="w-full bg-card-secondary rounded-full h-2.5">
                <div className={`${themeColor} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    </div>
  );
};

const JarsAllocationCard = () => {
  const data = {
    Necessities: {
      remaining: "925.00",
      total: "1925.00"
    },
    Savings: {
      remaining: "350.00",
      total: "350.00"
    },
    Fun: {
      remaining: "70.00",
      total: "350.00"
    },
    Education: {
      remaining: "300.00",
      total: "350.00"
    },
    Invest: {
      remaining: "17.50",
      total: "175.00"
    },
    Give: {
      remaining: "175.00",
      total: "175.00"
    }
  }

  return (
    <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-text-primary">Jars Allocation & Status</h3>
            <a href="#" className="flex items-center gap-2 text-sm font-semibold text-text-accent hover:underline transition-colors">
                <FontAwesomeIcon icon={faPencil} />
                <span>Manage Allocation</span>
            </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {Object.values(JarsIcon).map(({ label, icon, color }) => (
            <JarCard 
              key={label}
              icon={icon}
              color={color} 
              name={label} 
              remaining={data[label].remaining} 
              total={data[label].total} />
          ))}
        </div>
    </div>
  );
};

export default JarsAllocationCard;