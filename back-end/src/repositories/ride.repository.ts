import { prisma } from "../config/prisma";
import { rideConfirmRequest } from "../common/types/ride.types";

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
    })
}