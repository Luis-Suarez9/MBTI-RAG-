# --- Install dependencies ---
FROM node:22.20.0-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --include=dev --no-audit --no-fund
# package-lock.json was created on macOS, so npm ci may omit Linux-only
# optional native packages (for example lightningcss). Resolve those for the
# current container platform without changing the lockfile.
RUN npm install --include=optional --package-lock=false --no-audit --no-fund

# --- Build application ---
FROM node:22.20.0-alpine AS builder
WORKDIR /app

# NEXT_PUBLIC_* values are embedded into the browser bundle at build time.
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID
ARG BACKEND_URL
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID
ENV BACKEND_URL=$BACKEND_URL

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# --- Production image ---
FROM node:22.20.0-alpine AS runner
WORKDIR /app
EXPOSE 3000

ENV NODE_ENV=production
ENV BACKEND_URL=http://mbti_express:5175

COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

CMD ["npm", "run", "start"]
