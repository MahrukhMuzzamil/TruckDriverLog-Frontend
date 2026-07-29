# ---- Build stage -------------------------------------------------------------
FROM node:20-alpine AS build

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
# Same-origin /api by default; nginx routes it to Django.
RUN npm run build

# ---- Serve stage --------------------------------------------------------------
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
