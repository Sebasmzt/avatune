# syntax=docker/dockerfile:1
FROM oven/bun:1.3.14-slim AS base
WORKDIR /app

# Install dependencies stage
FROM base AS install
ENV HUSKY=0
COPY package.json turbo.json biome.json ./
COPY packages/ ./packages/
COPY apps/ ./apps/
COPY api/ ./api/

RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install || (sleep 5 && bun install) || (sleep 15 && bun install)

# Build stage - build api's deps plus every theme package (index.ts discovers
# themes from packages/themes/* at runtime, so all of them must have dist/ output
# regardless of whether api/package.json declares them), limit concurrency
FROM install AS build
ENV NODE_OPTIONS="--max-old-space-size=1536"
RUN bunx turbo run build --filter=api... --filter='./packages/themes/*' --concurrency=2

# Production stage
FROM base AS production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/packages ./packages
COPY --from=build /app/api ./api

WORKDIR /app/api

EXPOSE 3000

CMD ["bun", "run", "src/index.ts"]
