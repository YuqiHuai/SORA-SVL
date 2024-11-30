## node application base
FROM node AS base
WORKDIR /app

# install node dependencies
COPY package.json /app/
COPY package-lock.json /app/
RUN npm install

# install serve entrypoint
RUN npm install -g serve

## add third-party licenses so this image may be distributed
FROM base AS licenses
WORKDIR /app

ADD https://raw.githubusercontent.com/xronos-inc/node-third-party-licenses/refs/tags/v1.0.0/third-party-licenses.js /app/
RUN npm install license-checker
RUN npx license-checker --production --json > licenses.json
RUN node third-party-licenses.js licenses.json

## application stage
FROM base AS app
WORKDIR /app

# copy licenses
COPY --from=licenses /app/THIRD_PARTY_LICENSES.md /app/
COPY --from=licenses /app/third-party-licenses /app/third-party-licenses
COPY LICENSE /app/

# build application
COPY public /app/public
COPY src /app/src
COPY .env /app/
COPY tailwind.config.js /app/
COPY tsconfig.json /app/
RUN npm run build --production

EXPOSE 3000
ENTRYPOINT ["serve", "-s", "build"]
