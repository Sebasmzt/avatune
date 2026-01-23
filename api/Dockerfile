FROM oven/bun:1.3.1 AS base
WORKDIR /app

# Install dependencies stage
FROM base AS install
COPY package.json bun.lock turbo.json biome.json ./
COPY packages/ ./packages/
COPY apps/ ./apps/
COPY api/ ./api/
COPY patches/ ./patches/

RUN bun install --frozen-lockfile

# Build stage
FROM install AS build
RUN bun run build

# Production stage
FROM base AS production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/packages ./packages
COPY --from=build /app/api ./api

WORKDIR /app/api

EXPOSE 3000

CMD ["bun", "run", "src/index.ts"]
