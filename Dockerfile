FROM node:14

ENV PORT=3001
EXPOSE 3001

WORKDIR /usr/app
COPY package*.json ./
COPY . .

RUN npm install
RUN npm run build 

CMD ["npm", "run", "start:prod"]