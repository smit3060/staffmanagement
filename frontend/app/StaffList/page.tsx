"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { getStaff, removeStaff } from "../services/staffApi";
import { getDepartment } from "../services/departmentApi";

function StaffList() {
    const router = useRouter();
    const [list, setList] = useState<any[]>([]);
    const [selectedDept, setSelectedDept] = useState("");
    const [departmentList, setDepartmentList] = useState<{id: number, name: string}[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [totalRecords, setTotalRecords] = useState(0);

    const ITEMS_PER_PAGE = 10; 

    const totalPages = Math.ceil(totalRecords / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const [search, setSearch] = useState("");

    useEffect(() => {
        const takeDepts = async () => {
            const data = await getDepartment(1, 100);
            setDepartmentList(data.department);
        };
        takeDepts();
    }, []);

    const getList = async (page: number = 1,searchText: string = "",dept: string = "") => {
        try {
            const res = await getStaff(page, ITEMS_PER_PAGE,searchText,dept);
            setList(res.staff);         
            setTotalRecords(res.total); 
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("sh_token");
        if (!token) {
            alert("Auth required");
            router.push("/");
        }
    }, []);

    useEffect(() => { getList(currentPage,search,selectedDept); }, [currentPage]);

    const handleUpdate = (id: number) => {
        router.push(`/StaffForm?id=${id}`);
    };

    const handleSearch = () =>{
        setCurrentPage(1);
        getList(1,search,selectedDept);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleDeptChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedDept(value);
        setCurrentPage(1);
        getList(1, search, value); 
    };

    const handleDelete = async (id: number) => {
        try {
            await removeStaff(id);
            getList(currentPage); 
        } catch (error) {
            console.error(error);
        }
    };

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page); 
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-1 px-4 md:px-8 py-10">

                <div className="max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">All Staff Members</h1>
                        <p className="text-gray-400 text-sm mt-1">
                            {totalRecords} members found — Page {currentPage} of {totalPages || 1}
                        </p>
                    </div>
                    <button
                        onClick={() => router.push('/StaffForm')}
                        className="px-5 py-2.5 bg-blue-500 text-white text-sm font-semibold rounded-xl hover:bg-blue-600 transition shadow-md self-start sm:self-auto"
                    >
                        + Add Staff
                    </button>
                </div>

                <div className="max-w-6xl mx-auto mb-4 flex gap-3">

                    <div className="relative flex-1 flex gap-2">
                        <div className="relative flex-1">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0" />
                            </svg>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Search by name..."
                                className="w-full pl-9 pr-8 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                            />
                            {search && (
                                <button
                                    onClick={() => {
                                        setSearch("");
                                        setCurrentPage(1);
                                        getList(1, "", selectedDept); 
                                    }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                        
                        <button
                            onClick={handleSearch}
                            className="px-5 py-2.5 bg-blue-500 text-white text-sm font-semibold rounded-xl hover:bg-blue-600 transition shadow-sm"
                        >
                            Search
                        </button>
                    </div>
                        
                    <select
                        value={selectedDept}
                        onChange={handleDeptChange}
                        className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm min-w-[180px]"
                    >
                        <option value="">All Departments</option>
                        {departmentList.map(dept => (
                            <option key={dept.id} value={dept.name}>
                                {dept.name}
                            </option>
                        ))}
                    </select>
                    
                </div>

                <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                    <div className="hidden sm:block overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 border-b border-gray-100">
                                    <th className="px-5 py-4 font-medium">#</th>
                                    <th className="px-5 py-4 font-medium">Name</th>
                                    <th className="px-5 py-4 font-medium">Email</th>
                                    <th className="px-5 py-4 font-medium">Department</th>
                                    <th className="px-5 py-4 font-medium text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-5 py-12 text-center text-gray-400">
                                            <div className="flex flex-col items-center gap-2">
                                                <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <p className="text-sm">No staff members yet</p>
                                                <button
                                                    onClick={() => router.push('/StaffForm')}
                                                    className="mt-2 px-4 py-2 bg-blue-500 text-white text-xs rounded-xl hover:bg-blue-600 transition"
                                                >
                                                    + Add First Staff
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    list.map((data: any, index: number) => (
                                        <tr key={data.id} className="border-t border-gray-50 hover:bg-gray-50 transition">
                                            <td className="px-5 py-4 text-gray-400">{startIndex + index + 1}</td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center font-semibold text-sm">
                                                        {data.name?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="font-medium text-gray-800">{data.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 text-gray-500">{data.email}</td>
                                            <td className="px-5 py-4">
                                                <span className="inline-block bg-green-100 text-green-600 text-xs font-medium px-2.5 py-1 rounded-full">
                                                    {data.department?.name ?? "—"}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex gap-2 justify-center">
                                                    <button onClick={() => handleUpdate(data.id)} className="px-3 py-1.5 text-xs bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition font-medium">Update</button>
                                                    <button onClick={() => handleDelete(data.id)} className="px-3 py-1.5 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium">Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="sm:hidden divide-y divide-gray-100">
                        {list.length === 0 ? (
                            <div className="px-5 py-12 text-center text-gray-400 text-sm">No staff members yet</div>
                        ) : (
                            list.map((data: any) => (
                                <div key={data.id} className="p-4 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                                            {data.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800 text-sm">{data.name}</p>
                                            <p className="text-gray-400 text-xs">{data.email}</p>
                                            <span className="inline-block bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full mt-1">
                                                {data.department?.name ?? "—"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1.5 shrink-0">
                                        <button onClick={() => handleUpdate(data.id)} className="px-3 py-1 text-xs bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition">Update</button>
                                        <button onClick={() => handleDelete(data.id)} className="px-3 py-1 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Delete</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {totalPages > 1 && (
                        <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between gap-4">
                            <p className="text-sm text-gray-400">
                                Showing {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, totalRecords)} of {totalRecords}
                            </p>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                                >
                                    ← Prev
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`px-3 py-1.5 text-xs rounded-lg border transition font-medium
                                            ${currentPage === page
                                                ? 'bg-blue-500 text-white border-blue-500'
                                                : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                                >
                                    Next →
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default StaffList;