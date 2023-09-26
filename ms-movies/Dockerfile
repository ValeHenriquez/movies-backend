FROM node:16

WORKDIR /app

COPY . .

EXPOSE 3002

RUN npm install

RUN npm run build

CMD ["npm", "run", "start:prod"]