"use client";
import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

function StaffList(){
    const router = useRouter();
    const [list,setList] = useState<any[]>([]);

    const getList = async () =>{
        try {
            const res =await axios.get(`http://localhost:3000/api/staff/`);
            setList(Array.isArray(res.data.staff) ? res.data.staff : []);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{getList()},[]);

    const handleUpdate = (id: number) => {
      router.push(`/StaffForm?id=${id}`);
    }

    const handleDelete = async (id:number) =>{
            await axios.delete(`http://localhost:3000/api/staff/${id}`);
            getList();
    }


    return(
        <>
          <div className="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />

    <main className="flex-1 px-4 md:px-8 py-10">

        {/* Page Header */}
        <div className="max-w-6xl mx-auto mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
          
                <h1 className="text-2xl font-bold text-gray-800">All Staff Members</h1>
                <p className="text-gray-400 text-sm mt-1">{list.length} members found</p>
            </div>
            <button
                onClick={() => router.push('/StaffForm')}
                className="px-5 py-2.5 bg-blue-500 text-white text-sm font-semibold rounded-xl hover:bg-blue-600 transition shadow-md self-start sm:self-auto"
            >
                + Add Staff
            </button>
        </div>

        {/* Table */}
        <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

            {/* Desktop Table */}
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
                                    <td className="px-5 py-4 text-gray-400">{index + 1}</td>
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
                                            <button
                                                onClick={() => handleUpdate(data.id)}
                                                className="px-3 py-1.5 text-xs bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition font-medium"
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={() => handleDelete(data.id)}
                                                className="px-3 py-1.5 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="sm:hidden divide-y divide-gray-100">
                {list.length === 0 ? (
                    <div className="px-5 py-12 text-center text-gray-400 text-sm">No staff members yet</div>
                ) : (
                    list.map((data: any, index: number) => (
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
                                <button
                                    onClick={() => handleUpdate(data.id)}
                                    className="px-3 py-1 text-xs bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDelete(data.id)}
                                    className="px-3 py-1 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    </main>

</div>
        </>
    )
}

export default StaffList