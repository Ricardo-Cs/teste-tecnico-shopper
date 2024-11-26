import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({});

// Cria os dados de driver no banco diretamente, apenas para testar mais facilmente
export async function main() {
    const existingDrivers = await prisma.driver.count();
    const existingCustomers = await prisma.customer.count();

    if (existingDrivers === 0) {
        await prisma.driver.createMany({
            data: [
                {
                    name: "Homer Simpson",
                    description: "Relaxe e aproveite o passeio.",
                    vehicle: "Plymouth Valiant 1973",
                    rating: 2,
                    comment: "Errou o caminho 3 vezes.",
                    ratePerKm: 2.5,
                    minKm: 1,
                },
                {
                    name: "Dominic Toretto",
                    description: "Rapidez e segurança.",
                    vehicle: "Dodge Charger R/T 1970",
                    rating: 4,
                    comment: "Carro incrível!",
                    ratePerKm: 5.0,
                    minKm: 5,
                },
                {
                    name: "James Bond",
                    description: "Classe e discrição.",
                    vehicle: "Aston Martin DB5",
                    rating: 5,
                    comment: "Digno de um agente secreto.",
                    ratePerKm: 10.0,
                    minKm: 10,
                },
            ],
        });
    }

    if (existingCustomers === 0) {
        await prisma.customer.create({
            data: {
                email: "user@gmail.com",
                name: "User"
            }
        })
    }
}
