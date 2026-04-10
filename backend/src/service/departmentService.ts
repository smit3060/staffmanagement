import { prisma } from "../config/prisma.ts";

export const getAllDepartments = async (page:number,limit:number) => {
    const skip = (page-1)*limit;
    const [department,total] = await Promise.all([
        prisma.department.findMany({
            skip,
            take:limit,
        }),
        prisma.department.count()
    ])
    return {department,total};
};

export const addDepartment = async (name: string) => {
    return await prisma.department.create({
        data: { name }
    });
};

export const updateDepartment = async (id: number, name: string) => {
    return await prisma.department.update({
        where: { id },
        data: { name }
    });
};

export const deleteDepartment = async (id: number) => {
    const staffCount = await prisma.staff.count({
        where: { department: { id } }
    });
 
    if (staffCount > 0) {
        throw new Error(`Cannot delete: ${staffCount} staff member(s) are assigned to this department.`);
    } 
    return await prisma.department.delete({
        where: { id }
    });
};