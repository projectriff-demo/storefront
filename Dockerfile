FROM node:13-stretch AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run buildprod

FROM nginx:stable
COPY --from=build /app/dist/storefront /var/www
COPY ./nginx-production.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
