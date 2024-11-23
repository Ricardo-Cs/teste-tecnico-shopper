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