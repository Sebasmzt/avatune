FROM oven/bun:1.3.1 AS base
WORKDIR /app

# Install dependencies stage
FROM base AS install
COPY package.json turbo.json biome.json ./
COPY packages/ ./packages/
COPY apps/ ./apps/
COPY api/ ./api/
COPY patches/ ./patches/

RUN bun install

# Build stage - only build api and its dependencies, limit concurrency
FROM install AS build
ENV NODE_OPTIONS="--max-old-space-size=1536"
RUN bunx turbo run build --filter=api... --concurrency=2

# Production stage
FROM base AS production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/packages ./packages
COPY --from=build /app/api ./api

WORKDIR /app/api

EXPOSE 3000

CMD ["bun", "run", "src/index.ts"]
