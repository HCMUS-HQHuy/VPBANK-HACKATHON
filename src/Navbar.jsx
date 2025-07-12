import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'


const Navbar = () => {
    return (
        <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <a href="#" className="flex-shrink-0 flex items-center gap-2">
                            <FontAwesomeIcon icon={faLayerGroup} className="text-primary text-2xl text-blue-700"/>
                            <span className="font-bold text-xl text-slate-800">FinCoach</span>
                        </a>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex md:items-center md:space-x-2">
                        <a
                            href="#"
                            className="bg-primary-light text-primary px-3 py-2 rounded-md text-sm font-medium"
                            aria-current="page"
                        >
                            Dashboard
                        </a>
                        <a
                            href="#"
                            className="text-slate-500 hover:bg-slate-100 hover:text-slate-700 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Jars
                        </a>
                        <a
                            href="#"
                            className="text-slate-500 hover:bg-slate-100 hover:text-slate-700 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Transactions
                        </a>
                        <a
                            href="#"
                            className="text-slate-500 hover:bg-slate-100 hover:text-slate-700 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            AI Coach
                        </a>
                    </div>

                    {/* User Actions */}
                    <div className="flex items-center">
                        {/* Notifications and Avatar */}
                        <div className="hidden md:flex items-center gap-4">
                            <button
                                type="button"
                                className="relative p-1 text-slate-400 hover:text-slate-600"
                            >
                                <span className="sr-only">View notifications</span>
                                <i className="fa-regular fa-bell text-xl"></i>
                                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                            </button>

                            <button
                                type="button"
                                className="flex text-sm bg-slate-200 rounded-full focus:outline-none ring-2 ring-offset-2 ring-primary"
                            >
                                <span className="sr-only">Open user menu</span>
                                <img
                                    className="h-8 w-8 rounded-full"
                                    src="https://i.pravatar.cc/40?u=alex"
                                    alt="User avatar"
                                />
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400"
                            >
                                <i className="fa-solid fa-bars text-xl"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
