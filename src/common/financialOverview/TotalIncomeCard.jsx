import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const TotalIncomeCard = () => {
    return (
        // The unnecessary fragment is removed, and theme classes are applied.
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
            <div className="flex justify-between items-center">
                {/* CHANGED: text-slate-800 -> text-text-primary */}
                <h3 className="text-xl font-bold text-text-primary">Total Income</h3>
                
                {/* CHANGED: text-primary -> text-text-accent */}
                <a href="#" className="text-sm font-semibold text-text-accent hover:underline">
                    <FontAwesomeIcon icon={faEdit} />
                    <span> Edit </span>
                </a>
            </div>
            
            <p className="text-4xl font-bold text-text-primary mt-2">
                $3,500.00 
                {/* CHANGED: text-slate-500 -> text-text-secondary */}
                <span className="text-xl font-medium text-text-secondary"> / month</span>
            </p>
        </div>
    );
};

export default TotalIncomeCard;