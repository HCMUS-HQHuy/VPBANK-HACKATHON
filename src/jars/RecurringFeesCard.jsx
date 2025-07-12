import React from 'react';

const RecurringFeesCard = () => {
    // In a real app, this would be controlled by state, e.g.,
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const isModalOpen = false; // Set to true to test the modal's appearance

    return (
        <>
            {/* Enhanced Recurring Fees Table Component */}
            {/* CHANGED: Main container now uses theme-aware classes */}
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    {/* CHANGED: Text and button colors are now theme-aware */}
                    <h3 className="text-xl font-bold text-text-primary">Recurring Fees</h3>
                    <button className="px-4 py-2 bg-brand-primary text-text-accent text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">
                        + Add New Fee
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        {/* CHANGED: Table header now uses theme-aware classes */}
                        <thead className="border-b-2 border-border bg-card-secondary">
                            <tr>
                                <th className="p-3 text-sm font-semibold text-text-secondary">Name</th>
                                <th className="p-3 text-sm font-semibold text-text-secondary">Amount</th>
                                <th className="p-3 text-sm font-semibold text-text-secondary">Frequency</th>
                                <th className="p-3 text-sm font-semibold text-text-secondary">Next Due</th>
                                <th className="p-3 text-sm font-semibold text-text-secondary">Jar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* CHANGED: All rows now use theme-aware classes */}
                            <tr className="border-b border-border">
                                <td className="p-3 font-medium text-text-primary">Rent</td>
                                <td className="p-3 text-text-secondary">$1200.00</td>
                                <td className="p-3 text-text-secondary">Monthly</td>
                                <td className="p-3 text-text-secondary">July 1</td>
                                <td className="p-3"><i className="fa-solid fa-house-chimney text-xl w-6 text-center text-brand-primary"></i></td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="p-3 font-medium text-text-primary">Spotify</td>
                                <td className="p-3 text-text-secondary">$15.00</td>
                                <td className="p-3 text-text-secondary">Monthly</td>
                                <td className="p-3 text-text-secondary">June 28</td>
                                <td className="p-3"><i className="fa-solid fa-martini-glass-citrus text-xl w-6 text-center text-yellow"></i></td>
                            </tr>
                            <tr> {/* Last row has no bottom border */}
                                <td className="p-3 font-medium text-text-primary">Weekly Allowance</td>
                                <td className="p-3 text-text-secondary">$20.00</td>
                                <td className="p-3 text-text-secondary">Weekly</td>
                                <td className="p-3 text-text-secondary">June 21</td>
                                <td className="p-3"><i className="fa-solid fa-piggy-bank text-xl w-6 text-center text-green"></i></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* "Add New Recurring Fee" Modal */}
            {/* The outer div's class would be toggled to show/hide the modal */}
            <div className={`${isModalOpen ? 'flex' : 'hidden'} fixed inset-0 bg-black bg-opacity-50 items-center justify-center p-4 z-50`}>
                {/* CHANGED: The entire modal is now theme-aware */}
                <div className="bg-card w-full max-w-lg p-6 md:p-8 rounded-xl shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-text-primary">Add New Recurring Fee</h3>
                        <button className="text-text-secondary hover:text-text-primary text-2xl">{'\u00D7'}</button>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-text-secondary">Description</label>
                            <input type="text" placeholder="e.g., Netflix Subscription" className="mt-1 w-full p-2 bg-card-secondary border border-border rounded-md focus:ring-2 focus:ring-ring" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-text-secondary">Amount</label>
                                <input type="number" placeholder="0.00" className="mt-1 w-full p-2 bg-card-secondary border border-border rounded-md focus:ring-2 focus:ring-ring" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-text-secondary">Frequency</label>
                                <select className="mt-1 w-full p-2 bg-card-secondary border border-border rounded-md focus:ring-2 focus:ring-ring" defaultValue="Monthly">
                                    <option>Daily</option>
                                    <option>Weekly</option>
                                    <option>Monthly</option>
                                    <option>Yearly</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-text-secondary">Start Date</label>
                                <input type="date" className="mt-1 w-full p-2 bg-card-secondary border border-border rounded-md focus:ring-2 focus:ring-ring" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-text-secondary">End Date (Optional)</label>
                                <input type="date" className="mt-1 w-full p-2 bg-card-secondary border border-border rounded-md focus:ring-2 focus:ring-ring" />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-text-secondary">Link to Jar</label>
                            <select className="mt-1 w-full p-2 bg-card-secondary border border-border rounded-md focus:ring-2 focus:ring-ring">
                                <option>Fun</option>
                                <option>Necessities</option>
                                <option>Education</option>
                                <option>Invest</option>
                                <option>Give</option>
                                <option>Savings</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end gap-3">
                        <button className="px-4 py-2 bg-card-secondary text-text-primary font-semibold rounded-lg hover:bg-border">Cancel</button>
                        <button className="px-4 py-2 bg-brand-primary text-white font-semibold rounded-lg hover:opacity-90">Save Fee</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecurringFeesCard;