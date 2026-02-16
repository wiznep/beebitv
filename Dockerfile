# syntax=docker.io/docker/dockerfile:1

FROM imbios/bun-node:1.3.3-20.19.6-alpine AS base

# Step 1. Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json bun.lock* ./

# Omit --production flag for TypeScript devDependencies
RUN bun install --frozen-lockfile

COPY src ./src
COPY public ./public
COPY next.config.mjs .
COPY jsconfig.json .
COPY eslint.config.mjs .
COPY postcss.config.mjs .

# Environment variables must be present at build time
# https://github.com/vercel/next.js/discussions/14030
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
ARG NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}

# Build Next.js based on the preferred package manager
RUN bun run build

# Note: It is not necessary to add an intermediate step that does a full copy of `node_modules` here

# Step 2. Production image, copy all the files and run next
FROM base AS runner

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 9001 nodejs
RUN adduser --system --uid 9001 nextjs
USER nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Environment variables must be redefined at run time
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
ARG NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}

# Uncomment the following line to disable telemetry at run time
# ENV NEXT_TELEMETRY_DISABLED 1

# Note: Don't expose ports here, Compose will handle that for us

CMD ["node", "server.js"]
