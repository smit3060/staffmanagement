"use client";
import { useRouter, usePathname } from "next/navigation";

function Navbar() {
    const router = useRouter();
    const pathname = usePathname();

    const navItems = [
        { label: "Home", path: "/", color: "blue" },
        { label: "Add Staff", path: "/StaffForm", color: "blue" },
        { label: "Staff List", path: "/StaffList", color: "blue" },
        { label: "Departments", path: "/Department", color: "green" },
    ];

    return (
        <nav className="w-full bg-white border-b border-gray-200 px-4 md:px-8 py-3 flex items-center justify-between shadow-sm">

            <div
                onClick={() => router.push('/')}
                className="flex items-center gap-2 cursor-pointer"
            >
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <span className="text-base font-bold text-gray-800 hidden sm:block">
                    Staff<span className="text-blue-500">MS</span>
                </span>
            </div>

            <div className="flex items-center gap-2">
                {navItems.map(item => {
                    const isActive = pathname === item.path;
                    return (
                        <button
                            key={item.path}
                            onClick={() => router.push(item.path)}
                            className={`px-3 py-2 text-sm font-medium rounded-lg transition
                                ${isActive
                                    ? item.color === "green"
                                        ? "bg-green-500 text-white shadow-sm"
                                        : "bg-blue-500 text-white shadow-sm"
                                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                }`}
                        >
                            {item.label}
                        </button>
                    );
                })}
            </div>

        </nav>
    );
}

export default Navbar;