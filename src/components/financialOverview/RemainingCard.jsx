import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';

const RemainingCard = ({ remaining = 0 }) => {
    return (
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex items-center gap-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-green-light text-green text-3xl flex-shrink-0">
                <FontAwesomeIcon icon={faWallet} />
            </div>

            <div>
                <p className="text-sm font-medium text-text-secondary">Remaining this Month</p>
                <p className="text-3xl font-bold text-text-primary mt-1">${remaining.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default RemainingCard;