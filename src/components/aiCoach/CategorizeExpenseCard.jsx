import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faPencil } from '@fortawesome/free-solid-svg-icons';

const CategorizeExpenseCard = () => {
    return (
        <div className="glass-card p-6 rounded-xl border border-border shadow-sm">
            <h3 className="text-xl font-bold text-text-primary mb-4">Categorize Expense</h3>
            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Expense Description (e.g., lunch for 25k)"
                    className="w-full p-3 text-text-primary border border-border rounded-lg focus:ring-2 focus:ring-ring"
                />
                <div className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center text-center">
                    <FontAwesomeIcon icon={faUpload} className="text-2xl text-text-secondary mb-2" />
                    <p className="text-sm font-medium text-text-secondary">Upload Receipt Image</p>
                </div>
                <button className="w-full px-4 py-3 bg-green text-white text-base font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                    <FontAwesomeIcon icon={faPencil} />
                    <span>Auto-Categorize</span>
                </button>
            </div>
        </div>
    );
};

export default CategorizeExpenseCard;
