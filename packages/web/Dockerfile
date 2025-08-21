# Build Stage
FROM node:20-alpine AS builder
WORKDIR /app

COPY .env .env
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY tsconfig.json next.config.ts ./
COPY public ./public
COPY src ./src

RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]