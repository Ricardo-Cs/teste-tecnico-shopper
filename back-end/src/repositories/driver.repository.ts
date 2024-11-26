import { prisma } from "../config/prisma";
import { Driver } from "../common/types/driver.types";

export const findByMinKm = async (distance: number): Promise<Driver[] | null> => {
    return prisma.driver.findMany({
        where: {
            minKm: { lte: distance }
        }, orderBy: { ratePerKm: "asc" }
    })
}