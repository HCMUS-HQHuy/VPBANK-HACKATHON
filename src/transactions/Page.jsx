import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendar, faPlus } from '@fortawesome/free-solid-svg-icons';
import JarsIcon from '@/common/JarsIcon'; // Tái sử dụng để lấy thông tin màu sắc

// Dữ liệu mẫu cho bảng giao dịch
const transactionsData = [
    {
        date: 'June 1, 2024',
        description: 'Rent Payment',
        jar: 'Necessities',
        amount: -1200.00,
    },
    {
        date: 'June 3, 2024',
        description: 'Grocery Store',
        jar: 'Necessities',
        amount: -87.20,
    },
    {
        date: 'June 5, 2024',
        description: 'Coffee Shop',
        jar: 'Fun',
        amount: -5.75,
    },
    {
        date: 'June 10, 2024',
        description: 'Udemy Course - Tailwind CSS',
        jar: 'Education',
        amount: -12.99,
    },
    {
        date: 'June 12, 2024',
        description: 'Dinner with friends',
        jar: 'Fun',
        amount: -45.50,
    },
];

const TransactionsPage = () => {

    const getJarPillClasses = (jarName) => {
        const jarInfo = JarsIcon.find(j => j.label === jarName);
        if (!jarInfo) return 'text-text-secondary text-text-secondary';
        
        // Tạo tên lớp Tailwind động từ thông tin trong JarsIcon
        return `bg-${jarInfo.colorLight} text-${jarInfo.color}`;
    };

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                
                {/* Thanh công cụ: Tìm kiếm, Lọc và Nút hành động */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    {/* Phần Lọc */}
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="relative">
                            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                            <input
                                type="text"
                                placeholder="Search descriptions..."
                                className="pl-10 pr-4 py-2 w-64 text-text-secondary border border-border rounded-lg focus:ring-2 focus:ring-ring"
                            />
                        </div>
                        <select className="px-4 py-2 text-text-secondary border border-border rounded-lg focus:ring-2 focus:ring-ring">
                            <option>All Jars</option>
                            {JarsIcon.map(jar => <option key={jar.label}>{jar.label}</option>)}
                        </select>
                        <div className="flex items-center gap-2 text-text-secondary">
                            <input type="text" defaultValue="06/01/2024" className="w-28 p-2 text-text-secondary border border-border rounded-lg focus:ring-2 focus:ring-ring" />
                            <span>to</span>
                            <input type="text" defaultValue="06/30/2024" className="w-28 p-2 text-text-secondary border border-border rounded-lg focus:ring-2 focus:ring-ring" />
                        </div>
                    </div>
                    {/* Nút hành động */}
                    <button className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
                        <FontAwesomeIcon icon={faPlus} />
                        <span>Add Transaction</span>
                    </button>
                </div>

                {/* Bảng dữ liệu giao dịch */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b-2 border-border text-text-secondary">
                            <tr>
                                <th className="p-3 text-sm font-semibold text-text-secondary">Date</th>
                                <th className="p-3 text-sm font-semibold text-text-secondary">Description</th>
                                <th className="p-3 text-sm font-semibold text-text-secondary">Jar</th>
                                <th className="p-3 text-sm font-semibold text-text-secondary">Amount</th>
                                <th className="p-3 text-sm font-semibold text-text-secondary">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactionsData.map((trx, index) => (
                                <tr key={index} className="border-b border-border">
                                    <td className="p-3 text-sm text-text-secondary">{trx.date}</td>
                                    <td className="p-3 font-medium text-text-primary">{trx.description}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getJarPillClasses(trx.jar)}`}>
                                            {trx.jar}
                                        </span>
                                    </td>
                                    <td className="p-3 font-medium text-text-primary">
                                        - ${trx.amount.toFixed(2).replace('-', '')}
                                    </td>
                                    <td className="p-3 text-sm space-x-4">
                                        {/* <a href="#" className="font-semibold text-text-accent hover:underline">Edit</a> */}
                                        <a href="#" className="font-semibold text-danger hover:underline">Delete</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default TransactionsPage;