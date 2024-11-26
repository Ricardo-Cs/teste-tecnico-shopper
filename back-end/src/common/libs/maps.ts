import axios from "axios";
import { env } from "../../config/env";

export async function computeRoutes(origin: string, destination: string) {
    const url = "https://routes.googleapis.com/directions/v2:computeRoutes";
    const apiKey = env.GOOGLE_API_KEY;

    const data = {
        origin: {
            address: origin
        },
        destination: {
            address: destination
        },
        travelMode: "DRIVE",
        routingPreference: "TRAFFIC_AWARE",
        computeAlternativeRoutes: false,
        routeModifiers: {
            avoidTolls: false,
            avoidHighways: false,
            avoidFerries: false
        },
        languageCode: "en-US",
        units: "IMPERIAL"
    };

    // Cabeçalhos da requisição
    const headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "routes.duration,routes.distanceMeters,routes.legs.startLocation,routes.legs.endLocation",
    };

    try {
        const response = await axios.post(url, data, { headers });
        return response.data.routes[0];
    } catch (error: any) {
        console.error("Erro ao acessar a API:", error.response?.data, error.response?.data.details);
    }
}