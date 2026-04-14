'use client';

import Image from 'next/image';
import LogoImage from '@/app/assets/images/BlueConnectsLogo.png';
import { useEffect, useRef } from 'react';
import SideSearch from './SideSearch';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Sidebar() {
    const sidebarRef = useRef(null);
    const pathname = usePathname();
    const isDashboard = pathname === '/dashboard';
    const isCustomer = pathname.startsWith('/customer');    
    const isSubscribers = pathname === '/customer/subscribers';

    useEffect(() => {
        const root = sidebarRef.current as unknown as HTMLElement;
        if (!root) return;

        const onClick = (e: MouseEvent) => {
            const anchor = (e.target as HTMLElement).closest('a.has-arrow');
            if (!anchor || !(root as HTMLElement).contains(anchor)) return;
            e.preventDefault();

            const parentLi = anchor.parentElement; // <li>
            const submenu = anchor.nextElementSibling; // immediate <ul>
            if (!submenu || submenu.tagName !== 'UL') return;

            const isOpen = submenu.classList.contains('mm-show');

            // Close siblings at same level (accordion behavior)
            const siblingLis = Array.from(parentLi?.parentElement?.children as unknown as HTMLElement[]);
            siblingLis.forEach((li: HTMLElement) => {
                if (li !== parentLi) {
                    li.classList.remove('mm-active');
                    const sibAnchor = li.querySelector(':scope > a.has-arrow') as HTMLAnchorElement;
                    const sibSub = sibAnchor && sibAnchor.nextElementSibling;
                    if (sibSub && sibSub.tagName === 'UL') {
                        sibSub.classList.remove('mm-show');
                        sibSub.classList.add('mm-collapse');
                        (sibSub as HTMLElement).style.display = 'none';
                    }
                }
            });

            // Toggle current
            parentLi?.classList.toggle('mm-active', !isOpen);
            submenu.classList.add('mm-collapse');
            submenu.classList.toggle('mm-show', !isOpen);
            (submenu as HTMLElement).style.display = !isOpen ? 'block' : 'none';
        };

        (root as HTMLElement).addEventListener('click', onClick);
        return () => (root as HTMLElement).removeEventListener('click', onClick);
    }, []);

const handleClick = () => {
    document.body.classList.toggle("sidebar-open");
}

    return (
        <aside className="vertical-menu" ref={sidebarRef}>
            <div className="navbar-brand-box">
                <Link href="/dashboard" className="logo logo-dark">
                    <span className="logo-sm">
                        <Image src={LogoImage} alt="Logo" className="h-7 w-auto" />
                    </span>
                    <span className="logo-lg">
                        <Image src={LogoImage} alt="Logo" className="h-7 w-auto" />
                    </span>
                </Link>
              
            </div>

            <button type="button" onClick={handleClick} className="btn btn-sm px-3 font-size-24 header-item waves-effect vertical-menu-btn" id="vertical-menu-btn">
                <i className="ri-menu-2-line align-middle"></i>
            </button>

            <div data-simplebar className="vertical-scroll">

                <SideSearch />

                <div id="sidebar-menu">
                    <ul className="metismenu list-unstyled" id="side-menu">
                        <li className={isDashboard ? "mm-active" : ""}>
                            <Link href="/dashboard" className="waves-effect">
                                <i className="ri-apps-2-line"></i>
                                <span>Dashboard</span>
                            </Link>
                        </li>

                        <li className={isCustomer ? "mm-active" : ""}>
                            <Link href="#" className="has-arrow waves-effect">
                                <i className="ri-user-3-line"></i>
                                <span>Customer</span>
                            </Link>
                            <ul
                                className={`sub-menu mm-collapse ${isCustomer ? 'mm-show' : ''}`}
                                aria-expanded={isCustomer ? 'true' : 'false'}
                                style={{ display: isCustomer ? 'block' : 'none' }}
                            >
                                <li>
                                    <Link href="/customer/subscribers" className={isSubscribers ? 'active' : ''}>
                                        <span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Subscribers
                                    </Link>
                                </li>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Async Response</Link></li>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Reserve MSISDN Status</Link></li>
                                <li>
                                    <Link href="#" className="has-arrow"><span className="sidebar-under-icons"><i className="ri-account-pin-box-line"></i></span> Customer Profile</Link>
                                    <ul className="sub-menu mm-collapse" aria-expanded="false" style={{display:'none'}}>
                                        <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Orders</Link></li>
                                        <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Purchase</Link></li>
                                        <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> History</Link></li>
                                        <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Usage</Link></li>
                                        <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Adjust Balance</Link></li>
                                        <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Change Address</Link></li>
                                    </ul>
                                </li>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-user-search-line"></i></span> Recent Searches</Link></li>
                            </ul>
                        </li>

                        <li>
                            <Link href="#" className="has-arrow waves-effect">
                                <i className="ri-calendar-check-line"></i>
                                <span>Plan</span>
                            </Link>
                            <ul className="sub-menu mm-collapse" aria-expanded="false" style={{display:'none'}}>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Lookup Tariff</Link></li>
                            </ul>
                        </li>

                        <li>
                            <Link href="#" className="has-arrow waves-effect">
                                <i className="ri-flashlight-line"></i>
                                <span>Action</span>
                            </Link>
                            <ul className="sub-menu mm-collapse" aria-expanded="false" style={{display:'none'}}>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Bulk / Single Upload</Link></li>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Report</Link></li>
                            </ul>
                        </li>

                        <li>
                            <Link href="#" className="has-arrow waves-effect">
                                <i className="ri-archive-line"></i>
                                <span>Inventory</span>
                            </Link>
                            <ul className="sub-menu mm-collapse" aria-expanded="false" style={{display:'none'}}>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Manage Inventory</Link></li>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Add Inventory</Link></li>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Search Inventory</Link></li>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Total Assigned SIM</Link></li>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Assign / Re-assign SIMs</Link></li>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Inventory Report</Link></li>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> eSIM Unlock</Link></li>
                            </ul>
                        </li>

                        <li>
                            <Link href="#" className="has-arrow waves-effect">
                                <i className="ri-arrow-left-circle-line"></i>
                                <span>Portin Order</span>
                            </Link>
                            <ul className="sub-menu mm-collapse" aria-expanded="false" style={{display:'none'}}>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Create New Order</Link></li>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Pending Portin</Link></li>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Cancel Portin</Link></li>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Completed Ports</Link></li>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Search Ports</Link></li>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Portin Eligibility</Link></li>
                            </ul>
                        </li>

                        <li>
                            <Link href="#" className="has-arrow waves-effect">
                                <i className="ri-file-chart-line"></i>
                                <span>Reports</span>
                            </Link>
                            <ul className="sub-menu mm-collapse" aria-expanded="false" style={{display:'none'}}>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> MSISDN Snapshot</Link></li>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Activation – Billing</Link></li>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Deactivation</Link></li>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> PortOut</Link></li>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> PortIn</Link></li>
                                <li><Link href="/reports/usage-report"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Usage Reports</Link></li>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Billng Usage Reports</Link></li>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> MRC Subscriber</Link></li>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Vendor MRC Subscriber</Link></li>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Device Notification</Link></li>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> PortOut Notification</Link></li>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Threshold Notification</Link></li>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> NetIP Report</Link></li>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> NetIP Report Summary</Link></li>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> NetIP Account Reload</Link></li>
                            </ul>
                        </li>

                        <li>
                            <Link href="#" className="waves-effect">
                                <i className="ri-headphone-line"></i>
                                <span>Need Help?</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="#" className="has-arrow waves-effect">
                                <i className="ri-chat-1-line"></i>
                                <span>Inquiry</span>
                            </Link>
                            <ul className="sub-menu mm-collapse" aria-expanded="false" style={{display:'none'}}>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> View Support Inquiry</Link></li>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Completed Inquiry</Link></li>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Summarize Report</Link></li>
                            </ul>
                        </li>

                        <li>
                            <Link href="/vnoc" className="waves-effect">
                                <i className="ri-cpu-line"></i>
                                <span>Virtual NOC</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="#" className="has-arrow waves-effect">
                                <i className="ri-checkbox-circle-line"></i>
                                <span>Checks</span>
                            </Link>
                            <ul className="sub-menu mm-collapse" aria-expanded="false" style={{display:'none'}}>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Query SIM</Link></li>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Coverage</Link></li>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Validate Device</Link></li>
                                <li><Link href="#"><span className="sidebar-under-icons"><i className="ri-focus-line"></i></span> Get Vendor</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar;