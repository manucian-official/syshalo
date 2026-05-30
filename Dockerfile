# ==============================================================================
# STAGE 1: Dependency Installation and Asset Compilation (Build Rig)
# ==============================================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Install build-essential tools if any native modules need compilation
RUN apk add --no-cache libc6-compat

# Leverage Docker cache layer optimization for node_modules
COPY package*.json ./
RUN npm ci

# Copy codebase and compile assets (Vite + Express Bundle)
COPY . .
ENV NODE_ENV=production
RUN npm run build

# ==============================================================================
# STAGE 2: Micro-optimized Production Runtime
# ==============================================================================
FROM node:20-alpine AS runner

WORKDIR /app

# Force production environment context
ENV NODE_ENV=production
ENV PORT=3000

# Copy necessary files for launching the server
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Install production-only dependencies to minimize footprint
RUN npm ci --only=production

# Create standard non-root user to enforce container security standards
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 3000

CMD ["node", "dist/server.cjs"]
