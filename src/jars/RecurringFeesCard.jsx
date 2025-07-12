import React from 'react';

const RecurringFeesCard = () => {
  return (
    <>
      {/* Enhanced Recurring Fees Table Component */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-slate-800">Recurring Fees</h3>
          <button className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
            + Add New Fee
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b-2 border-slate-200 bg-slate-50">
              <tr>
                <th className="p-3 text-sm font-semibold text-slate-500">Name</th>
                <th className="p-3 text-sm font-semibold text-slate-500">Amount</th>
                <th className="p-3 text-sm font-semibold text-slate-500">Frequency</th>
                <th className="p-3 text-sm font-semibold text-slate-500">Next Due</th>
                <th className="p-3 text-sm font-semibold text-slate-500">Jar</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="p-3 font-medium text-slate-800">Rent</td>
                <td className="p-3 text-slate-600">$1200.00</td>
                <td className="p-3 text-slate-600">Monthly</td>
                <td className="p-3 text-slate-600">July 1</td>
                <td className="p-3"><i className="fa-solid fa-house-chimney text-xl w-6 text-center text-primary"></i></td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-3 font-medium text-slate-800">Spotify</td>
                <td className="p-3 text-slate-600">$15.00</td>
                <td className="p-3 text-slate-600">Monthly</td>
                <td className="p-3 text-slate-600">June 28</td>
                <td className="p-3"><i className="fa-solid fa-martini-glass-citrus text-xl w-6 text-center text-yellow"></i></td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="p-3 font-medium text-slate-800">Weekly Allowance</td>
                <td className="p-3 text-slate-600">$20.00</td>
                <td className="p-3 text-slate-600">Weekly</td>
                <td className="p-3 text-slate-600">June 21</td>
                <td className="p-3"><i className="fa-solid fa-piggy-bank text-xl w-6 text-center text-green"></i></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* "Add New Recurring Fee" Modal */}
      {/* In a real app, the first div's className would be dynamic, e.g., `className={isModalOpen ? 'fixed ...' : 'hidden'}` */}
      {/* <div className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"> */}
      <div className="hidden fixed inset-0 bg-black bg-opacity-50 items-center justify-center p-4 z-50">
        <div className="bg-white w-full max-w-lg p-6 md:p-8 rounded-xl shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-slate-800">Add New Recurring Fee</h3>
            <button className="text-slate-400 hover:text-slate-800 text-2xl">{'\u00D7'}</button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-600">Description</label>
              <input type="text" placeholder="e.g., Netflix Subscription" className="mt-1 w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-600">Amount</label>
                <input type="number" placeholder="0.00" className="mt-1 w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Frequency</label>
                <select className="mt-1 w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary" defaultValue="Monthly">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Yearly</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-600">Start Date</label>
                <input type="date" className="mt-1 w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">End Date (Optional)</label>
                <input type="date" className="mt-1 w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Link to Jar</label>
              <select className="mt-1 w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary">
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
            <button className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200">Cancel</button>
            <button className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-indigo-700">Save Fee</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecurringFeesCard;