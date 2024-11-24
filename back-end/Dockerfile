FROM node:20.15.1

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "npm", "start" ]