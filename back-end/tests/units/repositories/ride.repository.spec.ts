import { prisma } from "../../../src/config/prisma";
import { RideRepository } from "../../../src/repositories/ride.repository";
import { Ride } from "../../../src/common/types/ride.types";

describe("RideRepository", () => {
    const rideRepository = new RideRepository();

    beforeAll(async () => {
        await prisma.$connect();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    beforeEach(async () => {
        // Limpa o banco de testes antes de cada teste
        await prisma.ride.deleteMany();
    });

    test("should create a ride in the database", async () => {
        // Mock data
        const rideData: Ride = {
            origin: "Location A",
            date: new Date(),
            destination: "Location B",
            distance: 100,
            duration: "1h 30m",
            value: 200,
            driver_id: 1,
        };

        // Execute o método
        const ride = await rideRepository.create(rideData);

        // Verifique se o registro foi criado corretamente
        expect(ride).toHaveProperty("id");
        expect(ride.origin).toBe(rideData.origin);
        expect(ride.destination).toBe(rideData.destination);
        expect(ride.driver_id).toBe(rideData.driver_id);

        // Verifique no banco diretamente
        const savedRide = await prisma.ride.findUnique({
            where: { id: ride.id },
        });
        expect(savedRide).not.toBeNull();
    });
});
