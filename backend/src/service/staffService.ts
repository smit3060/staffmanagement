import { prisma } from "../config/prisma.ts";

export const createStaff = async (data: any) => {
    const { name, email, department } = data;

    const dept = await prisma.department.findFirst({
        where: { name: department }
    });

    if (!dept) {
        throw new Error(`Department "${department}" not found`);
    }

    return await prisma.staff.create({
        data: {
            name,
            email,
            departmentId: dept.id  
        }
    });
};

export const getStaff = async (page:number,limit:number) => {
    const skip = (page-1)*limit;
    const [staff,total] = await Promise.all([
        prisma.staff.findMany({
            skip,
            take :limit,
            include: { department: true }
        }),
        prisma.staff.count()
    ])
    return { staff, total };
};

export const getSpecificStaff = async (id: number) => {
    return await prisma.staff.findUnique({
        where: { id },
        include: { department: true }
    });
};

export const updateStaff = async (id: number, data: any) => {
    const { name, email, department } = data;

    const dept = await prisma.department.findFirst({
        where: { name: department }
    });

    if (!dept) throw new Error(`Department "${department}" not found`);

    return await prisma.staff.update({
        where: { id },
        data: { name, email, departmentId: dept.id } 
    });
};

export const deleteStaff = async (id: number) => {
    return await prisma.staff.delete({
        where: { id }
    });
};