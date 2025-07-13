import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';

const RemainingCard = () => {
    return (
        // The unnecessary fragment is removed, and theme classes are applied.
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex items-center gap-6">
            
            {/* 
                CHANGED: 
                - bg-green-100 -> bg-green-light
                - text-green-700 -> text-green (Tailwind will use the appropriate dark/light shade)
            */}
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-green-light text-green text-3xl flex-shrink-0">
                <FontAwesomeIcon icon={faWallet} />
            </div>

            <div>
                {/* CHANGED: text-slate-500 -> text-text-secondary */}
                <p className="text-sm font-medium text-text-secondary">Remaining this Month</p>
                
                {/* CHANGED: text-slate-800 -> text-text-primary */}
                <p className="text-3xl font-bold text-text-primary mt-1">$2,350</p>
            </div>
        </div>
    );
};

export default RemainingCard;