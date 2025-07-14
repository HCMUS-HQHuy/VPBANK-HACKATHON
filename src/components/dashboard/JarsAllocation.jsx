import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import JarsIcon from '@/utils/JarsIcon';

const JarsAllocation = () => {
    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-text-primary">Jars Allocation</h3>
                <a href="#" className="text-sm font-semibold text-text-accent hover:underline">Details »</a>
            </div>

            <div className="grid grid-cols-3 gap-y-6 text-center">
                {Object.values(JarsIcon).map(({ label, percent, icon, bgLight, color }) => {
                    return (
                        <div key={label} className="flex flex-col items-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bgLight} ${color} text-xl`}>
                                <FontAwesomeIcon icon={icon} />
                            </div>
                            
                            <p className="text-sm font-medium text-text-secondary mt-2">{label}</p>
                            <p className="font-bold text-text-primary">{percent}</p>
                        </div>
                    )
                })}
            </div>
        </>
    );
};

export default JarsAllocation;