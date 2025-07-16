import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPencilAlt } from '@fortawesome/free-solid-svg-icons'; 
import JarsIcon from '@/utils/JarsIcon'; 

const JarCard = ({ icon, name, remaining, total, color, bgColor }) => {
    const percentage = total > 0 ? (remaining * 100) / total : 0; // Tránh chia cho 0
  return (
    <div className={`relative p-5 border border-border rounded-xl flex flex-col bg-card hover:bg-card-secondary`}>
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={icon} className={`text-xl w-6 text-center ${color}`}/>
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
                <div className={`${bgColor} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    </div>
  );
};

const JarsAllocationCard = ({ jars = [], onManageClick }) => {
  // console.log("Jars data received in JarsAllocationCard:", jars);

  return (
    <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-text-primary">Jars Allocation & Status</h3>
            {/* Dùng button và gọi onManageClick */}
            <button onClick={onManageClick} className="flex items-center gap-2 text-sm font-semibold text-text-accent hover:underline transition-colors">
                <FontAwesomeIcon icon={faPencilAlt} />
                <span>Manage Allocation</span>
            </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {jars.length > 0 ? (
          jars.map((jar) => {
            const jarKey = jar.name.toLowerCase().replace(/\s/g, '_');
            const iconInfo = JarsIcon[jarKey] || JarsIcon.Default;
            
            return (
              <JarCard 
                key={jar._id} // <-- THÊM DÒNG NÀY VÀO
                icon={iconInfo.icon}
                color={iconInfo.color}
                bgColor={iconInfo.bg}
                name={jar.name} 
                remaining={jar.current_amount}
                total={jar.amount}          
              />
            )
          })
        ) : (
          <p className="col-span-full text-center text-text-secondary py-4">No jars have been set up.</p>
        )}
        </div>
    </div>
  );
};

export default JarsAllocationCard;