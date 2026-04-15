'use client'

import { useState } from 'react'
import Image from 'next/image'

import userImage from '@/app/assets/images/favicon.png'
import { ThemeModeToggle } from './ThemeMode'
import Link from 'next/link'

/** Replace with session / API user when auth is wired. */
const headerUser = {
  name: 'BlueConnects',
  email: 'admin@blueconnects.com',
} as const

function Header() {
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const handleUserMenuOpen = () => {
        setUserMenuOpen(!userMenuOpen)
    }


    return (
        <header
            id="page-topbar"
            className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-700/50"
        >
            <div className="navbar-header flex items-center justify-between h-16 px-4 lg:px-6 padding-left-search">
                <div className="flex items-center">
                   
                    <button
                        type="button"
                        id="vertical-menu-btn"
                        className="vertical-menu-btn inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-white/10"
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
                                className="form-control pl-9 pr-3 py-2 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-white/5 dark:text-gray-100 dark:placeholder:text-gray-500"
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
                   
                    <Link href="/vnoc" 
                    className="hidden lg:inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-[#4387f6] dark:text-[#7eb7ff]">
                        <span className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-full bg-blue-600 text-[12px] text-white">
                            <i className="ri-bubble-chart-fill"></i>
                        </span>
                        <span>Virtual NOC</span>
                    </Link>
                    <button
                        type="button"
                        className="hidden lg:inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-[#4387f6] dark:text-[#7eb7ff]"
                    >
                        <span className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-full bg-blue-600 text-[12px] text-white">
                            <i className="ri-customer-service-2-line"></i>
                        </span>
                        <span>Support</span>
                    </button>
                 
                    <ThemeModeToggle />

                    <div className="relative">
                        <button
                            id="page-header-user-dropdown"
                            type="button"
                            className="inline-flex items-center px-0 py-0 hover:bg-transparent cursor-pointer mt-2"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            onClick={handleUserMenuOpen}
                        >
                            <Image src={userImage} alt="" className="rounded-full header-profile-user" />
                            <span className="text-gray-800 font-size-14 max-w-[140px] truncate sm:max-w-[200px] dark:text-gray-100">
                                {headerUser.name}
                            </span>
                            <i className="ri-arrow-down-s-line ml-1 text-gray-500 dark:text-gray-400"></i>
                        </button>
                        <div
                            className={`dropdown-menu dropdown-menu-end ${userMenuOpen ? '' : 'hidden'} absolute right-0 z-50 mt-3 w-64 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-600 dark:bg-slate-900`}
                            role="menu"
                        >
                            <div className="border-b border-gray-100 bg-gray-50/80 px-3 py-3 dark:border-gray-700 dark:bg-slate-800/80">
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={userImage}
                                        alt=""
                                        width={40}
                                        height={40}
                                        className="size-10 shrink-0 rounded-full border border-gray-200 object-cover"
                                    />
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-50">
                                            {headerUser.name}
                                        </p>
                                        <p
                                            className="truncate text-xs text-gray-500 dark:text-gray-400"
                                            title={headerUser.email}
                                        >
                                            {headerUser.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <Link
                                className="dropdown-item flex items-center font-medium gap-2 px-3 py-2 text-gray-800 font-size-14 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-white/10"
                                href="/profile">
                                <i className="ri-user-line text-base text-gray-600 dark:text-gray-400" aria-hidden />
                                <span className="align-middle">View as User</span>
                            </Link>
                            <Link
                                className="dropdown-item flex items-center gap-2 px-3 py-2 text-gray-800 font-size-14 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-white/10"
                                href="/login">
                                <i className="ri-logout-box-line text-gray-800 dark:text-gray-300"></i>
                                <span className="align-middle">Logout</span>
                            </Link>
                        </div>
                    </div>
                  
                </div>
            </div>
        </header>
    )
}

export default Header
