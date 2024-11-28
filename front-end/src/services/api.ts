import axios from "axios";

const API_URL = "http://localhost:8080";

export const estimateTrip = (data: any) =>
    axios.post(`${API_URL}/ride/estimate`, data).then((res) => res.data);

export const confirmTrip = (data: any) =>
    axios.patch(`${API_URL}/ride/confirm`, data).then((res) => res.data);

export const getTripHistory = (customer_id: string, driver_id?: string) =>
    axios.get(`${API_URL}/ride/${customer_id}?driver_id=${driver_id}`).then((res) => res.data);
