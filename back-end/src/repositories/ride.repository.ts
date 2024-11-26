import { prisma } from "../config/prisma";
import { Ride, rideConfirmRequest } from "../common/types/ride.types";

export const insertRide = (ride: rideConfirmRequest) => {
    return prisma.ride.create({
        data: {
            origin: ride.origin,
            destination: ride.destination,
            distance: ride.distance,
            duration: ride.duration,
            value: ride.value,
            driver_id: ride.driver.id,
            customer_id: ride.customer_id,
        }
    });
};

export const getRidesByCustomerAndDriverId = async (customer_id: string, driver_id: string) => {
    return prisma.ride.findMany({
        where: {
            customer_id,
            driver_id
        },
        select: {
            id: true,
            origin: true,
            destination: true,
            date: true,
            distance: true,
            duration: true,
            value: true,
            driver: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });
}

export const getRidesByCustomerId = async (customer_id: string) => {
    return prisma.ride.findMany({
        where: {
            customer_id
        },
        select: {
            id: true,
            origin: true,
            destination: true,
            date: true,
            distance: true,
            duration: true,
            value: true,
            driver: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });
}
