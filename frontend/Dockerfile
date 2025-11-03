# build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# For Vite use VITE_API_URL; for CRA use REACT_APP_API_URL
ARG API_BASE_URL
ENV VITE_API_URL=$API_BASE_URL
RUN npm run build

# serve
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
