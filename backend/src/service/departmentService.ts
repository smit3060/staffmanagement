import { prisma } from "../config/prisma.ts";

export const getAllDepartments = async () => {
    return await prisma.department.findMany();
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