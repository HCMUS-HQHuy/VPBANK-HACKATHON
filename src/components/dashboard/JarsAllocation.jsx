import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'; 
import JarsIcon from '@/utils/JarsIcon';

const formatJarName = (name) => {
  return name
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const JarsAllocation = ({ jars = [] }) => {
  if (!jars || jars.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-text-secondary">No budget jars configured.</p>
        <Link to="/jars" className="text-text-accent hover:underline mt-2 inline-block">
          Set up your jars
        </Link>
      </div>
    );
  }

  const jarsToDisplay = jars.slice(0, 6);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-text-primary">Jars Allocation</h3>
        <Link to="/jars" className="text-sm font-semibold text-text-accent hover:underline">
          Details »
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-y-6 text-center">
        {jarsToDisplay.map((jar, index) => {
          const iconInfo = JarsIcon[jar.name] || JarsIcon.Default;
          const { icon, color, bgLight } = iconInfo;
          const isOverlayItem = index === 5 && jars.length > 6;

          return (
            <div key={jar.id || jar.name} className="flex flex-col items-center">
              <Link 
                to="/jars" 
                className={`relative group ${isOverlayItem ? 'cursor-pointer' : 'cursor-default pointer-events-none'}`}
                onClick={(e) => !isOverlayItem && e.preventDefault()}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bgLight} ${color} text-xl transition-opacity ${isOverlayItem ? 'group-hover:opacity-100' : ''}`}>
                  <FontAwesomeIcon icon={icon} />
                </div>
                
                {isOverlayItem && (
                  <div className="absolute inset-0 w-12 h-12 rounded-full flex items-center justify-center bg-card/60 backdrop-blur-sm text-text-primary opacity-80 group-hover:opacity-100 transition-opacity">
                    <FontAwesomeIcon icon={faEllipsisH} className="text-2xl" />
                  </div>
                )}
              </Link>
              
              <p className="text-sm font-medium text-text-secondary mt-2">
                {formatJarName(jar.name)}
              </p>
              <p className="font-bold text-text-primary">{`${(jar.percent * 100).toFixed(0)}%`}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default JarsAllocation;