import { rideEstimateResponse } from "./ride.types";

export interface Driver {
    id: string;
    name: string;
    description: string;
    vehicle: string;
    rating: number;
    comment: string;
    ratePerKm: number;
    minKm: number;
}

export const mapDriversToOptions = (drivers: Driver[], distanceMeters: number): rideEstimateResponse['options'] => {
    return drivers.map((driver) => ({
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle,
        review: {
            rating: driver.rating,
            comment: driver.comment
        },
        value: driver.ratePerKm * (distanceMeters / 1000)
    }));
};