import { computeRoutes } from "../common/libs/maps";
import { findByMinKm } from "../repositories/driver.repository";
import { Driver, mapDriversToOptions } from "../common/types/driver.types";
import { rideEstimateRequest, rideEstimateResponse } from "../common/types/ride.types";

export class RideService {
    async rideEstimate(data: rideEstimateRequest) {
        const response = await computeRoutes(data.destination, data.origin);
        const drivers: Driver[] | null = await findByMinKm(response.distanceMeters / 1000);

        let options: rideEstimateResponse['options'] = [];
        if (drivers != null) {
            options = mapDriversToOptions(drivers, response.distanceMeters);
        }

        const estimateResponse: rideEstimateResponse = {
            distance: response.distanceMeters,
            duration: response.duration,
            origin: {
                latitude: response.legs[0].startLocation.latLng.latitude,
                longitude: response.legs[0].startLocation.latLng.longitude
            },
            destination: {
                latitude: response.legs[0].endLocation.latLng.latitude,
                longitude: response.legs[0].endLocation.latLng.longitude
            },
            options: options,
            routeResponse: response
        }
        return { status: 200, response: estimateResponse };
    }
}