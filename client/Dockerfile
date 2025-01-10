ARG BUILDKIT_SBOM_SCAN_CONTEXT=true

##################
## dependencies stage
##################
ARG BASEIMAGE=node:23.6
FROM ${BASEIMAGE} AS base
ARG BUILDKIT_SBOM_SCAN_CONTEXT=false

RUN mkdir -p /app
RUN chown node:node /app

USER node
WORKDIR /app

# install node dependencies
COPY --chown=node:node package.json /app/
COPY --chown=node:node package-lock.json /app/
RUN npm install --omit=dev

# install serve entrypoint
RUN npm install --omit=dev serve@14.2.4

###################
# third-party stage
###################
FROM base AS licenses
ARG BUILDKIT_SBOM_SCAN_STAGE=false

USER node
WORKDIR /app

RUN npm install license-checker@25.0.1
RUN npx license-checker --production --json > licenses.json
ADD --chown=node:node https://raw.githubusercontent.com/xronos-inc/node-third-party-licenses/refs/tags/v1.0.0/third-party-licenses.js /app/
RUN node third-party-licenses.js licenses.json

###################
# app stage
###################
FROM base AS app
ARG BUILDKIT_SBOM_SCAN_STAGE=true

WORKDIR /app

# copy licenses
COPY --from=licenses /app/THIRD_PARTY_LICENSES.md /app/
COPY --from=licenses /app/third-party-licenses /app/third-party-licenses
COPY LICENSE /app/

# non-root container user
USER node

# build application
COPY --chown=node:node public /app/public
COPY --chown=node:node src /app/src
COPY --chown=node:node .env /app/
COPY --chown=node:node tailwind.config.js /app/
COPY --chown=node:node tsconfig.json /app/
RUN npm run build --production

EXPOSE 3000
ENTRYPOINT ["npm", "exec", "serve", "-s", "build"]
