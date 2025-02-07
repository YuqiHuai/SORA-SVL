# SPDX-FileCopyrightText: (c) 2025 Xronos Inc.
# SPDX-License-Identifier: BSD-3-Clause

ARG BUILDIMAGE=python:3.12.8-slim-bookworm
ARG SERVEIMAGE=nginxinc/nginx-unprivileged:1.27.3-bookworm-perl
ARG BUILDKIT_SBOM_SCAN_CONTEXT=false
ARG BUILDKIT_SBOM_SCAN_STAGE=false

##################
## dependencies stage
##################
FROM ${BUILDIMAGE} AS base

WORKDIR /app

# install sphynx
RUN pip3 install \
        --no-warn-script-location \
        --disable-pip-version-check \
        --no-input \
        --progress-bar=off \
        sphinx \
        sphinx_rtd_theme

# build the Sphinx documentation into HTML
COPY ./source /app/source
RUN sphinx-build -b html source build

##################
# app stage
##################
FROM ${SERVEIMAGE} AS app
ARG BUILDKIT_SBOM_SCAN_STAGE=true

USER root

USER nginx
WORKDIR /app

COPY --from=base --chown=nginx:nginx /app/build /usr/share/nginx/html
COPY --chown=nginx:nginx ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8081

ENTRYPOINT ["nginx", "-g", "daemon off;"]
