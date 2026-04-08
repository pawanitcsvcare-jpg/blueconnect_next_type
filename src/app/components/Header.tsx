 'use client';
 
 import { useState } from 'react';
import Image from 'next/image';
import userImage from '../assets/images/favicon.png';

function Header() {
     const [userMenuOpen, setUserMenuOpen] = useState(false);
     const handleUserMenuOpen = () => {
        setUserMenuOpen(!userMenuOpen);
     }
    return (
        <header id="page-topbar" className="sticky top-0 z-40 bg-white border-b border-gray-200">
            <div className="navbar-header flex items-center justify-between h-16 px-4 lg:px-6 padding-left-search">
                <div className="flex items-center">
                   
                    <button
                        type="button"
                        id="vertical-menu-btn"
                        className="vertical-menu-btn inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50"
                    >
                        <i className="ri-menu-2-line text-xl"></i>
                    </button>
                </div>

                {/* Center search */}
                <div className="lg:flex justify-center">
                    <form className="app-search w-full max-w-[720px]">
                        <div className="relative">
                            <input
                                id="customSearchInput"
                                type="text"
                                className="form-control pl-9 pr-3 py-2 w-full rounded-md border border-gray-200 bg-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Search"
                            />
                            <div
                                className="ri-search-line absolute cursor-pointer top-search-icons left-[10px] top-1/2 -translate-y-1/2 text-base"
                            ></div>
                            <div className="ai-mode-button-parent">
                                <i className="ri-search-eye-line"></i>
                                AI Mode
                            </div>

                            <div className="shortcut-globally-search-parent">
                                <div className="shortcut-globally-search">
                                    <span>⌘</span>
                                    <span>K</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        className="hidden lg:inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-[#4387f6]"
                    >
                        <span className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-full bg-blue-600 text-white text-[12px]">
                            <i className="ri-bubble-chart-fill"></i>
                        </span>
                        <span>Virtual NOC</span>
                    </button>
                    <button
                        type="button"
                        className="hidden lg:inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-[#4387f6]"
                    >
                        <span className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-full bg-blue-600 text-white text-[12px]">
                            <i className="ri-customer-service-2-line"></i>
                        </span>
                        <span>Support</span>
                    </button>
                    <button
                        type="button"
                        className="lg:inline-flex h-9 w-9 items-center justify-center text-gray-700 hover:bg-gray-50"
                        data-toggle="fullscreen"
                    >
                        <i className="ri-fullscreen-line text-lg"></i>
                    </button>
                    <div className="relative">
                        <button
                            id="page-header-user-dropdown"
                            type="button"
                            className="inline-flex items-center px-0 py-0 hover:bg-transparent"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            onClick={handleUserMenuOpen}
                        >
                            <Image src={userImage} alt="Header Avatar" className="rounded-full header-profile-user" />
                            <span className="text-gray-800 font-size-14">BlueConnects</span>
                            <i className="ri-arrow-down-s-line ml-1 text-gray-500"></i>
                        </button>
                        <div className={`dropdown-menu dropdown-menu-end ${userMenuOpen ? '' : 'hidden'} absolute right-0 mt-3 w-44 rounded-md border border-gray-200 bg-white shadow-sm`}>
                            <a className="dropdown-item flex items-center gap-2 px-3 py-2 text-gray-800 font-size-14 hover:bg-gray-50" href="#">
                                <i className="ri-headphone-line text-gray-800"></i>
                                <span className="align-middle">Need Help</span>
                            </a>
                            <a className="dropdown-item flex items-center gap-2 px-3 py-2 text-gray-800 font-size-14 hover:bg-gray-50" href="#">
                                <i className="ri-mic-line text-gray-800"></i>
                                <span className="align-middle">Support</span>
                            </a>
                            <a className="dropdown-item flex items-center gap-2 px-3 py-2 text-gray-800 font-size-14 hover:bg-gray-50" href="#">
                                <i className="ri-logout-box-line text-gray-800"></i>
                                <span className="align-middle">Logout</span>
                            </a>
                        </div>
                    </div>
                  
                </div>
            </div>
        </header>
    );
}

export default Header;