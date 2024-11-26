export interface Ride {
    id?: string;
    origin: string;
    date?: Date;
    destination: string;
    distance: number;
    duration: string;
    value: number;
    driver_id: string | null;
    customer_id: string | null;
}

export interface rideEstimateRequest {
    customer_id: string;
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
};

export interface rideConfirmRequest {
    customer_id: string;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    driver: {
        id: number;
        name: string;
    },
    value: number;
}

export interface getUserRidesResponse {
    customer_id: string;
    rides: {
        id: number;
        date: Date;
        origin: string;
        destination: string;
        distance: number;
        duration: string;
        driver?: {
            id: number;
            name?: string;
        }[] | null
        value: number
    }
}