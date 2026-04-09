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
    return await prisma.department.delete({
        where: { id }
    });
};