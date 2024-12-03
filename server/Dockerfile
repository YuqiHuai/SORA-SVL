FROM node:18 AS avp-wise
WORKDIR /workdir

# download and extract WISE assets
ADD https://xronos-avp-lgsvl-assets.s3.amazonaws.com/avp-wise.tar.gz /workdir/
RUN mkdir -p /workdir/assets/
RUN tar -xvf avp-wise.tar.gz -C /workdir/assets/

FROM node:18 AS base
WORKDIR /workdir

# build npm application
COPY package.json /workdir/
COPY package-lock.json /workdir/
RUN npm install

## add third-party licenses so this image may be distributed
FROM base AS licenses
WORKDIR /workdir

ADD https://raw.githubusercontent.com/xronos-inc/node-third-party-licenses/refs/tags/v1.0.0/third-party-licenses.js /workdir/
COPY third-party-licenses/* /workdir/third-party-licenses/
COPY THIRD_PARTY_LICENSES.md /workdir/THIRD_PARTY_LICENSES.md.in
RUN npm install license-checker
RUN npx license-checker --production --json > licenses.json
RUN node third-party-licenses.js licenses.json --include THIRD_PARTY_LICENSES.md.in

FROM base AS app
WORKDIR /workdir

# copy licenses
COPY --from=licenses /workdir/THIRD_PARTY_LICENSES.md /workdir/
COPY --from=licenses /workdir/third-party-licenses /workdir/third-party-licenses
COPY LICENSE /workdir/

# copy WISE assets
COPY --from=avp-wise /workdir/assets /workdir/assets

# deploy static resources and build app
COPY src /workdir/src
COPY .env /workdir/
COPY tsconfig.json /workdir/
COPY tslint.json /workdir/
RUN ["npm", "run", "build"]

EXPOSE 3000
ENTRYPOINT ["npm", "run", "start"]
