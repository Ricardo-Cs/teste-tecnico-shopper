import { computeRoutes } from "../common/libs/maps";
import { findDriverById, findDriverByMinKm } from "../repositories/driver.repository";
import { Driver, mapDriversToOptions } from "../common/types/driver.types";
import { rideConfirmRequest, rideEstimateRequest, rideEstimateResponse } from "../common/types/ride.types";
import { insertRide } from "../repositories/ride.repository";

export class RideService {
    async rideEstimate(data: rideEstimateRequest) {
        const response = await computeRoutes(data.destination, data.origin);
        const drivers: Driver[] | null = await findDriverByMinKm(response.distanceMeters / 1000);

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

    async rideConfirm(data: rideConfirmRequest) {
        const driver = await findDriverById(data.driver.id);

        if (!driver) {
            return { status: 404, error_code: "DRIVER_NOT_FOUND", error_description: "Motorista não encontrado" };
        }

        if (driver.name !== data.driver.name) {
            return { status: 400, "error_code": "INVALID_DATA", error_description: "Dados do motorista não batem" };
        }

        if (data.distance < driver.minKm) {
            return { status: 406, error_code: "INVALID_DISTANCE", error_description: "Quilometragem inválida para o motorista" };
        }

        const insertedRide = await insertRide(data);
        return { status: 200, success: true };
    }
}