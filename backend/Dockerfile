# --- Production image ---
FROM node:22.20.0-alpine
WORKDIR /app
EXPOSE 5175

# Prisma CLI is needed at runtime by the start script to apply migrations.
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --include=dev --no-audit --no-fund

COPY . .
RUN npm run build

CMD ["npm", "run", "start"]
