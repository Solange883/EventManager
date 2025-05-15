# Étape 1 : Build Angular (identique à ci-dessus)
FROM node:18-alpine AS builder
WORKDIR /frontend
COPY . .
RUN npm install && npm run build --prod

# Étape 2 : Serveur NGINX
FROM nginx:alpine
COPY --from=builder /frontend/dist/frontend/browser /usr/share/nginx/html
EXPOSE 80