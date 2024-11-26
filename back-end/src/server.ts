import express from 'express';
import cors from 'cors';
import router from './routes/routes';
import { main, prisma } from './config/prisma';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

// Cria os dados dos motoristas no banco diretamente, apenas para testar mais facilmente
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

app.listen(8080, () => { console.log('Server running on port 8080') });