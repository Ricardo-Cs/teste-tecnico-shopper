import { prisma } from "../config/prisma";
import { Driver } from "../common/types/driver.types";

export const findDriverByMinKm = async (distance: number): Promise<Driver[] | null> => {
    return prisma.driver.findMany({
        where: {
            minKm: { lte: distance }
        }, orderBy: { ratePerKm: "asc" }
    });
}

export const findDriverById = async (id: number): Promise<Driver | null> => {
    return prisma.driver.findUnique({
        where: {
            id
        }
    });
};