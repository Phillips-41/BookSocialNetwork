# Build stage
FROM node:18.13.0 as build-stage
WORKDIR /app

COPY package*.json ./

RUN npm ci
RUN npm install -g @angular/cli

COPY . .

RUN npm run build --configuration=production

FROM nginx:latest

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=build-stage /app/dist/book-social-network-ui/browser /usr/share/nginx/html

EXPOSE 80
