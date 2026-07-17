# --- Base Stage ---
FROM node:22.20.0-alpine AS base
WORKDIR /app
EXPOSE 3000

# --- Development Stage ---
FROM base AS development
ENV NODE_ENV=development
COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund
COPY . .
CMD ["npm", "run", "dev"]

# --- Production Stage (Static Hosting) ---
# FROM base AS build
# COPY package.json package-lock.json* ./
# RUN npm ci --no-audit --no-fund
# COPY . .
# RUN npm run build

# FROM nginx:alpine AS production
# COPY --from=build /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]