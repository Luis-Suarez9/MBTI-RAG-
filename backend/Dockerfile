# --- Base Stage ---
FROM node:22.20.0-alpine AS base
WORKDIR /app
EXPOSE 5175

# --- Development Stage ---
FROM base AS development
ENV NODE_ENV=development
COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund
COPY . .
CMD ["npm", "run", "dev"]

# --- Production Stage ---
# FROM base AS production
# ENV NODE_ENV=production
# COPY package.json package-lock.json* ./
# RUN npm ci --only=production --no-audit --no-fund
# COPY . .
# CMD ["node", "server.js"]