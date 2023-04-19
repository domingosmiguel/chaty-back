FROM node

WORKDIR /app

COPY package*.json ./

# RUN npm ci --only=production
RUN npm i

COPY . .

# RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start_test"]
