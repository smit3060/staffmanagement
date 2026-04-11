"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import { createDepartment, getDepartment, editDepartment, deleteDepartment } from "../services/departmentApi";

function DepartmentPage() {
    const router = useRouter();
    const [list, setList] = useState<any[]>([]);
    const [showDialog, setShowDialog] = useState(false);
    const [deptName, setDeptName] = useState("");
    const [editId, setEditId] = useState<number | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const ITEMS_PER_PAGE = 10;

    const totalPages = Math.ceil(totalRecords / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const [search,setSearch] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("sh_token");
        if (!token) {
            alert("Auth required");
            router.push("/");
        }
    }, []);

    const getList = async (page: number = 1,searchText: string = "") => {
        try {
            const data = await getDepartment(page, ITEMS_PER_PAGE,searchText); 
            setList(Array.isArray(data.department) ? data.department : []);
            setTotalRecords(data.total); 
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { getList(currentPage,search); }, [currentPage]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    const handleSearch = () => {
        setCurrentPage(1);
        getList(1, search);
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    const openAddDialog = () => {
        setEditId(null);
        setDeptName("");
        setShowDialog(true);
    };

    const openEditDialog = (dept: any) => {
        setEditId(dept.id);
        setDeptName(dept.name);
        setShowDialog(true);
    };

    const closeDialog = () => {
        setShowDialog(false);
        setDeptName("");
        setEditId(null);
    };

    const handleSubmit = async () => {
        if (!deptName.trim()) return;
        try {
            if (editId) {
                await editDepartment(editId, deptName);
            } else {
                await createDepartment(deptName);
            }
            closeDialog();
            getList(currentPage); 
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteDepartment(id);
            getList(currentPage); 
        } catch (error: any) {
            alert(error?.response?.data?.message ?? "Cannot delete department — it may still have staff assigned.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-1 px-4 md:px-8 py-10">
                <div className="max-w-4xl mx-auto mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Departments</h1>
                        <p className="text-gray-400 text-sm mt-1">
                            {totalRecords} departments found — Page {currentPage} of {totalPages || 1}
                        </p>
                    </div>
                    <button
                        onClick={openAddDialog}
                        className="px-5 py-2.5 bg-blue-500 text-white text-sm font-semibold rounded-xl hover:bg-blue-600 transition shadow-md self-start sm:self-auto"
                    >
                        + Add Department
                    </button>
                </div>

                <div className="max-w-4xl mx-auto mb-4">
                    <div className="relative flex gap-2">  

                        <div className="relative flex-1">  
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0" />
                            </svg>
                            <input
                                type="text"
                                value={search}
                                onChange={handleInputChange}  
                                onKeyDown={handleKeyDown}     
                                placeholder="Search by name..."
                                className="w-full pl-9 pr-8 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                            />
                            {search && (
                                <button
                                    onClick={() => {
                                        setSearch("");
                                        setCurrentPage(1);
                                        getList(1, "");
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
                </div>

                <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="hidden sm:block overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 border-b border-gray-100">
                                    <th className="px-5 py-4 font-medium">#</th>
                                    <th className="px-5 py-4 font-medium">Department Name</th>
                                    <th className="px-5 py-4 font-medium text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="px-5 py-12 text-center text-gray-400">
                                            <div className="flex flex-col items-center gap-2">
                                                <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                                <p className="text-sm">No departments yet</p>
                                                <button onClick={openAddDialog} className="mt-2 px-4 py-2 bg-blue-500 text-white text-xs rounded-xl hover:bg-blue-600 transition">
                                                    + Add First Department
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    list.map((dept: any, index: number) => (
                                        <tr key={dept.id} className="border-t border-gray-50 hover:bg-gray-50 transition">
                                            <td className="px-5 py-4 text-gray-400">{startIndex + index + 1}</td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-semibold text-sm">
                                                        {dept.name?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="font-medium text-gray-800">{dept.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex gap-2 justify-center">
                                                    <button onClick={() => openEditDialog(dept)} className="px-3 py-1.5 text-xs bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition font-medium">Update</button>
                                                    <button onClick={() => handleDelete(dept.id)} className="px-3 py-1.5 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium">Delete</button>
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
                            <div className="px-5 py-12 text-center text-gray-400 text-sm">No departments yet</div>
                        ) : (
                            list.map((dept: any, index: number) => (
                                <div key={dept.id} className="p-4 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                                            {dept.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800 text-sm">{dept.name}</p>
                                            <p className="text-gray-400 text-xs">Department #{startIndex + index + 1}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1.5 shrink-0">
                                        <button onClick={() => openEditDialog(dept)} className="px-3 py-1 text-xs bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition">Update</button>
                                        <button onClick={() => handleDelete(dept.id)} className="px-3 py-1 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Delete</button>
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

            {showDialog && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-gray-800">
                                    {editId ? "Update Department" : "Add Department"}
                                </h2>
                                <p className="text-xs text-gray-400">
                                    {editId ? "Edit the department name below." : "Enter a name for the new department."}
                                </p>
                            </div>
                        </div>

                        <div className="mb-5">
                            <label className="block text-sm font-medium text-gray-600 mb-1.5">Department Name</label>
                            <input
                                type="text"
                                value={deptName}
                                onChange={(e) => setDeptName(e.target.value)}
                                placeholder="e.g. Engineering"
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm text-gray-800 bg-gray-50"
                            />
                        </div>

                        <div className="flex gap-2">
                            <button onClick={closeDialog} className="flex-1 py-2.5 text-sm border border-gray-200 rounded-xl hover:bg-gray-50 transition text-gray-600 font-medium">
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className={`flex-1 py-2.5 text-sm text-white rounded-xl transition font-semibold shadow-md ${editId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"}`}
                            >
                                {editId ? "Update" : "Add"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DepartmentPage;