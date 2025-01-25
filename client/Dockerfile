# SPDX-FileCopyrightText: (c) 2024 Yuqi Huai.
# SPDX-License-Identifier: BSD-3-Clause
# Modifications Copyright (c) 2025 Xronos Inc.

ARG BUILDKIT_SBOM_SCAN_CONTEXT=false
ARG BUILDKIT_SBOM_SCAN_STAGE=false

##################
## dependencies stage
##################
ARG BASEIMAGE=node:23.6.1-slim
FROM ${BASEIMAGE} AS base

RUN mkdir -p /app
RUN chown node:node /app

USER node
WORKDIR /app

# install node dependencies
ENV NODE_ENV=production
COPY --chown=node:node package.json /app/
COPY --chown=node:node package-lock.json /app/
RUN npm install --omit=dev

# install serve entrypoint
RUN npm install --omit=dev serve@14.2.4

###################
# third-party stage
###################
FROM base AS licenses

USER node
WORKDIR /app

RUN npm install license-checker@25.0.1
RUN npx license-checker --production --json > licenses.json
ADD --chown=node:node https://raw.githubusercontent.com/xronos-inc/node-third-party-licenses/refs/tags/v1.0.0/third-party-licenses.js /app/
RUN node third-party-licenses.js licenses.json

###################
# app stage
###################
FROM ${BASEIMAGE} AS app
ARG BUILDKIT_SBOM_SCAN_STAGE=true

USER node
WORKDIR /app
RUN chown node:node /app

# copy app
COPY --from=base --chown=node:node /app/ /app/

# copy licenses
COPY --from=licenses --chown=node:node /app/THIRD_PARTY_LICENSES.md /app/
COPY --from=licenses --chown=node:node /app/third-party-licenses /app/third-party-licenses
COPY --chown=node:node LICENSE /app/

# build application
COPY --chown=node:node public /app/public
COPY --chown=node:node src /app/src
COPY --chown=node:node .env /app/
COPY --chown=node:node tailwind.config.js /app/
COPY --chown=node:node tsconfig.json /app/
ENV NODE_ENV=production
RUN npm run build --omit=dev

EXPOSE 3000
ENTRYPOINT ["npm", "exec", "serve", "-s", "build"]
