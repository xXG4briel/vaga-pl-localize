FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install
RUN npm install -g @ionic/cli

CMD ["ionic", "serve"]