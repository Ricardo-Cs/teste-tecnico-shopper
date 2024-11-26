export interface Ride {
    id?: number;
    origin: string;
    date: Date;
    destination: string;
    distance: number;
    duration: string;
    value: number;
    driver_id: number;
}

export interface rideEstimateRequest {
    customer_id: number;
    origin: string;
    destination: string;
}

export interface rideEstimateResponse {
    origin: {
        latitude: number,
        longitude: number
    };
    destination: {
        latitude: number,
        longitude: number
    };
    distance: number;
    duration: string;
    options:
    {
        id: number,
        name: string,
        description: string,
        vehicle: string,
        review: {
            rating: number,
            comment: string
        },
        value: number
    }[] | null;
    routeResponse: object;
}