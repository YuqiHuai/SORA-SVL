FROM mongo AS geojson
WORKDIR /app

# download WISE geojson
ADD https://xronos-avp-lgsvl-assets.s3.amazonaws.com/avp-wise-geojson.tar.gz /app/
RUN mkdir -p /app/geojson/
RUN tar -xvf avp-wise-geojson.tar.gz -C /app/geojson/

FROM mongo AS app

# copy licenses
COPY third-party-licenses /app/third-party-licenses
COPY THIRD_PARTY_LICENSES.md /app/

# copy WISE assets
COPY ./setup/* /docker-entrypoint-initdb.d/
COPY --from=geojson /app/geojson/* /docker-entrypoint-initdb.d/
