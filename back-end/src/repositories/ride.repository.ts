import { prisma } from "../config/prisma";
import { Ride } from "../types/ride.types";

export class RideRepository {
    async create(ride: Ride): Promise<Ride> {
        return prisma.ride.create({
            data: {
                origin: ride.origin,
                date: ride.date,
                destination: ride.destination,
                distance: ride.distance,
                duration: ride.duration,
                value: ride.value,
                driver_id: ride.driver_id,
            }
        });
    }
}
