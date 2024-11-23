FROM node:20.15.1

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i

COPY . .

RUN npm run dev:docker

EXPOSE 8080

CMD [ "npm", "start" ]