import { axiosIns } from "./api";

export const editDepartment = async (editId: number, deptName: string) => {
    try {
        const res = await axiosIns.put(`/api/staff/department/department/${editId}`, { name: deptName });
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export const getDepartment = async(page:number=1,limit:number=10,search: string = "")=>{
    try {
        const res = await axiosIns.get(`/api/staff/department/department/?page=${page}&limit=${limit}&search=${search}`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export const createDepartment = async (deptName: string) => {
    try {
        const res = await axiosIns.post(`/api/staff/department/department/add`, { name: deptName }); 
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export const deleteDepartment = async (editId: number) => {
    const res = await axiosIns.delete(`/api/staff/department/department/${editId}`);
    return res.data;
};