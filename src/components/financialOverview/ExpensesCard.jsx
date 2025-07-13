import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendDown } from '@fortawesome/free-solid-svg-icons';

const ExpensesCard = () => {
    return (
        // The unnecessary fragment is removed, and theme classes are applied.
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex items-center gap-6">

            {/* 
                CHANGED: 
                - bg-red-100 -> bg-danger-light
                - text-red-700 -> text-danger (Tailwind will use the appropriate dark/light shade)
            */}
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-danger-light text-danger text-3xl flex-shrink-0">
                <FontAwesomeIcon icon={faArrowTrendDown} />
            </div>

            <div>
                {/* CHANGED: text-slate-500 -> text-text-secondary */}
                <p className="text-sm font-medium text-text-secondary">Expenses this Month</p>

                {/* CHANGED: text-slate-800 -> text-text-primary */}
                <p className="text-3xl font-bold text-text-primary mt-1">$1,150</p>
            </div>
        </div>
    );
};

export default ExpensesCard;