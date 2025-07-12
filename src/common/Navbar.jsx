import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';

const Navbar = () => {
    // 2. State to manage the visibility of the mobile men
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const baseLinkClass = "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200";
    const activeLinkClass = `${baseLinkClass} bg-primary-light text-primary`;
    const inactiveLinkClass = `${baseLinkClass} text-slate-500 hover:bg-slate-100 hover:text-slate-700`;
    const mobileLinkClass = "block px-3 py-2 rounded-md text-base font-medium";

    return (
        <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo - Use <Link> for simple navigation to home */}
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            <FontAwesomeIcon icon={faLayerGroup} className="text-primary text-2xl  text-blue-700"/>

                            <span className="font-bold text-xl text-slate-800">FinCoach</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation Links - Use <NavLink> for active styling */}
                    <div className="hidden md:flex md:items-center md:space-x-2">
                        <NavLink to="/dashboard" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
                            Dashboard
                        </NavLink>
                        <NavLink to="/jars" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
                            Jars
                        </NavLink>
                        <NavLink to="/transactions" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
                            Transactions
                        </NavLink>
                        <NavLink to="/ai-coach" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>
                            AI Coach
                        </NavLink>
                    </div>

                    {/* User Actions */}
                    <div className="flex items-center">
                        {/* Notifications and Avatar */}
                        <div className="hidden md:flex items-center gap-4">
                            <button type="button" className="relative p-1 text-slate-400 hover:text-slate-600">
                                <span className="sr-only">View notifications</span>
                                <FontAwesomeIcon icon={faBell} className="fa-regular text-xl" />
                                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                            </button>
                            <button type="button" className="flex text-sm bg-slate-200 rounded-full focus:outline-none ring-2 ring-offset-2 ring-primary">
                                <span className="sr-only">Open user menu</span>
                                <img className="h-8 w-8 rounded-full" src="https://i.pravatar.cc/40?u=alex" alt="User avatar" />
                            </button>
                        </div>

                        {/* Mobile Menu Button - Add onClick handler */}
                        <div className="md:hidden">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} // 4. Toggle state
                            >
                                <span className="sr-only">Open main menu</span>
                                <FontAwesomeIcon icon={faBars} className="text-xl" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 5. Conditionally render the mobile menu based on state */}
            {isMobileMenuOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                        <NavLink to="/dashboard" className={({ isActive }) => `${mobileLinkClass} ${isActive ? 'bg-primary-light text-primary' : 'text-slate-700'}`} onClick={() => setIsMobileMenuOpen(false)}>
                            Dashboard
                        </NavLink>
                        <NavLink to="/jars" className={({ isActive }) => `${mobileLinkClass} ${isActive ? 'bg-primary-light text-primary' : 'text-slate-700'}`} onClick={() => setIsMobileMenuOpen(false)}>
                            Jars
                        </NavLink>
                        <NavLink to="/transactions" className={({ isActive }) => `${mobileLinkClass} ${isActive ? 'bg-primary-light text-primary' : 'text-slate-700'}`} onClick={() => setIsMobileMenuOpen(false)}>
                            Transactions
                        </NavLink>
                        <NavLink to="/ai-coach" className={({ isActive }) => `${mobileLinkClass} ${isActive ? 'bg-primary-light text-primary' : 'text-slate-700'}`} onClick={() => setIsMobileMenuOpen(false)}>
                            AI Coach
                        </NavLink>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;