FROM node:16

WORKDIR /app

# Install app dependencies
COPY . .

EXPOSE 3001

RUN npm install

# build the app
RUN npm run build


# run the migrations

CMD [ "npm", "run", "start:prod" ]