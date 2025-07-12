import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// CHANGED: Import the data from its new file
import JarsIcon from '@/common/JarsIcon'; 

const JarsAllocation = () => {
    return (
        <>
            <div className="flex justify-between items-center mb-6">
                {/* CHANGED: Replaced hardcoded colors with theme-aware classes */}
                <h3 className="text-xl font-bold text-text-primary">Jars Allocation</h3>
                <a href="#" className="text-sm font-semibold text-text-accent hover:underline">Details »</a>
            </div>

            <div className="grid grid-cols-3 gap-y-6 text-center">
                {/* CHANGED: Destructure 'themeColor' instead of 'background' and 'color' */}
                {JarsIcon.map(({ label, percent, icon, background, color }) => (
                    <div key={label} className="flex flex-col items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${background} ${color} text-xl`}>
                            <FontAwesomeIcon icon={icon} />
                        </div>
                        
                        {/* CHANGED: Replaced hardcoded colors with theme-aware classes */}
                        <p className="text-sm font-medium text-text-secondary mt-2">{label}</p>
                        <p className="font-bold text-text-primary">{percent}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default JarsAllocation;