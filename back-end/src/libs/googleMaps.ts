import axios from "axios";
import { env } from "../config/env";

export async function computeRoutes(origin: string, destination: string) {
    const url = "https://routes.googleapis.com/directions/v2:computeRoutes";
    const apiKey = env.GOOGLE_API_KEY;

    const data = {
        origin: {
            location: {
                latLng: {
                    latitude: 37.419734,
                    longitude: -122.0827784,
                },
            },
        },
        destination: {
            location: {
                latLng: {
                    latitude: 37.417670,
                    longitude: -122.079595,
                },
            },
        },
        travelMode: "DRIVE",
        routingPreference: "TRAFFIC_AWARE",
        computeAlternativeRoutes: false,
        routeModifiers: {
            avoidTolls: false,
            avoidHighways: false,
            avoidFerries: false,
        },
        languageCode: "en-US",
        units: "IMPERIAL",
    };

    // Cabeçalhos da requisição
    const headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
    };

    try {
        // Realizando a requisição POST
        const response = await axios.post(url, data, { headers });
        console.log("Resposta da API:", JSON.stringify(response.data, null, 2));
    } catch (error: any) {
        // Tratando erros
        console.error("Erro ao acessar a API:", error.response?.data, error.response?.data.details);
    }
}