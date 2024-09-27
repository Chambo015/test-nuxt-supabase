FROM node:20.15.1 AS base

WORKDIR /app

ARG NUXT_BASE_URL
ENV NUXT_BASE_URL=${NUXT_BASE_URL}

ARG NUXT_SITE_ENV
ENV NUXT_SITE_ENV=${NUXT_SITE_ENV}

ARG PORT
ENV PORT=${PORT}

ARG NUXT_SITE_URL
ENV NUXT_SITE_URL=${NUXT_SITE_URL}

ARG NUXT_DEV_SITE_URL
ENV NUXT_DEV_SITE_URL=${NUXT_DEV_SITE_URL}

ARG NUXT_GOOGLE_CLIENT_ID
ENV NUXT_GOOGLE_CLIENT_ID=${NUXT_GOOGLE_CLIENT_ID}

ARG NUXT_SENTRY_DSN
ENV NUXT_SENTRY_DSN=${NUXT_SENTRY_DSN}

ARG NUXT_TIPTOP_PUBLIC_ID
ENV NUXT_TIPTOP_PUBLIC_ID=${NUXT_TIPTOP_PUBLIC_ID}

# Setup pnpm environment
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable


# --- Dependencies ---
FROM base AS deps
WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prefer-frozen-lockfile

# --- Builder ---
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm run build

ENV NODE_ENV=production

EXPOSE ${PORT}

RUN npm install pm2 -g

CMD [ "pm2-runtime" , "ecosystem.config.cjs" ]
