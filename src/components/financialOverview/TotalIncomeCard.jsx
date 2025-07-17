import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const TotalIncomeCard = ({ income = 0, onEditClick }) => {
    return (
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-text-primary">Total Income</h3>
                <button onClick={onEditClick} className="text-sm font-semibold text-text-accent hover:underline">
                    <FontAwesomeIcon icon={faEdit} />
                    <span> Edit </span>
                </button>
            </div>
            <p className="text-4xl font-bold text-text-primary mt-2">
                ${(income || 0).toFixed(2)}
                <span className="text-xl font-medium text-text-secondary"> / month</span>
            </p>
        </div>
    );
};

export default TotalIncomeCard;