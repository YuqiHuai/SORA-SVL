# SPDX-FileCopyrightText: (c) 2024 Yuqi Huai.
# SPDX-License-Identifier: BSD-3-Clause
# Modifications Copyright (c) 2025 Xronos Inc.

ARG BUILDKIT_SBOM_SCAN_CONTEXT=false
ARG BUILDKIT_SBOM_SCAN_STAGE=false

##################
## dependencies stage
##################
ARG BASEIMAGE=mongo:8.0.4-noble
FROM ${BASEIMAGE} AS base

# download and extract WISE assets
USER root
ADD https://soafee-avp-demo.s3.us-east-1.amazonaws.com/avp-wise-geojson.tar.gz /avp-wise-geojson.tar.gz
RUN chown mongodb:mongodb /avp-wise-geojson.tar.gz
RUN mkdir -p /docker-entrypoint-initdb.d/
RUN chown mongodb:mongodb /docker-entrypoint-initdb.d/

USER mongodb
WORKDIR /docker-entrypoint-initdb.d/
RUN tar -xvf /avp-wise-geojson.tar.gz -C /docker-entrypoint-initdb.d/

###################
# third-party stage
###################
FROM base AS licenses

USER mongodb
WORKDIR /docker-entrypoint-initdb.d/

# copy licenses
COPY third-party-licenses /docker-entrypoint-initdb.d/
COPY THIRD_PARTY_LICENSES.md /docker-entrypoint-initdb.d/
COPY LICENSE /docker-entrypoint-initdb.d/

###################
# app stage
###################
FROM ${BASEIMAGE} AS app
ARG BUILDKIT_SBOM_SCAN_STAGE=true

USER mongodb
WORKDIR /docker-entrypoint-initdb.d/

# copy app
COPY --from=base --chown=mongodb:mongodb /docker-entrypoint-initdb.d/* /docker-entrypoint-initdb.d/
COPY ./setup/* /docker-entrypoint-initdb.d/

# copy licenses
COPY --from=licenses --chown=mongodb:mongodb /docker-entrypoint-initdb.d/ /docker-entrypoint-initdb.d/
