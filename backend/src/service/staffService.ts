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

export const getStaff = async (page: number, limit: number, search: string = "",department: string = "") => {
    const skip = (page - 1) * limit;
    const where:any = {}
    if (search) {
        where.name = {
            contains: search,
            mode: "insensitive" as const
        };
    }
    if (department) {
        where.department = {
            name: {
                equals: department,
                mode: "insensitive" as const
            }
        };
    }
    const [staff, total] = await Promise.all([
        prisma.staff.findMany({
            skip,
            take: limit,
            where,
            include: { department: true }
        }),
        prisma.staff.count({ where })
    ]);

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