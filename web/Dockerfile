FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install

CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]