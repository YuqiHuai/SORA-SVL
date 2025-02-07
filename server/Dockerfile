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

# download and extract WISE assets
USER root
ADD https://soafee-avp-demo.s3.us-east-1.amazonaws.com/avp-wise.tar.gz /avp-wise.tar.gz
RUN chown node:node /avp-wise.tar.gz

USER node
WORKDIR /app
RUN mkdir -p /app/assets
RUN tar -xvf /avp-wise.tar.gz -C /app/assets/

# install node dependencies
ENV NODE_ENV=production
COPY --chown=node:node package.json /app/
COPY --chown=node:node package-lock.json /app/
RUN npm install --omit=dev

###################
# third-party stage
###################
FROM base AS licenses

USER node
WORKDIR /app

RUN npm install license-checker@25.0.1
RUN npx license-checker --production --json > licenses.json
ADD --chown=node:node https://raw.githubusercontent.com/xronos-inc/node-third-party-licenses/refs/tags/v1.0.0/third-party-licenses.js /app/
COPY third-party-licenses/* /app/third-party-licenses/
COPY THIRD_PARTY_LICENSES.md /app/THIRD_PARTY_LICENSES.md.in
RUN node third-party-licenses.js licenses.json --include THIRD_PARTY_LICENSES.md.in

###################
# app stage
###################
FROM ${BASEIMAGE} AS app
ARG BUILDKIT_SBOM_SCAN_STAGE=true

USER node
WORKDIR /app

# copy app
COPY --from=base --chown=node:node /app/ /app/

# copy licenses
COPY --from=licenses --chown=node:node /app/THIRD_PARTY_LICENSES.md /app/
COPY --from=licenses --chown=node:node /app/third-party-licenses /app/third-party-licenses
COPY --chown=node:node LICENSE /app/

# deploy static resources and build app
COPY --chown=node:node src /app/src
COPY --chown=node:node .env /app/
COPY --chown=node:node tsconfig.json /app/
COPY --chown=node:node tslint.json /app/
ENV NODE_ENV=production
RUN npm run build --omit=dev

EXPOSE 3000
ENTRYPOINT ["npm", "run", "start"]
