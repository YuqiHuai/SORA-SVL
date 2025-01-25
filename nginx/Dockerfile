# SPDX-FileCopyrightText: (c) 2024 Yuqi Huai.
# SPDX-License-Identifier: BSD-3-Clause
#
# Modifications Copyright (c) 2025 Xronos Inc.

ARG BUILDKIT_SBOM_SCAN_CONTEXT=false
ARG BUILDKIT_SBOM_SCAN_STAGE=false

##################
# app stage
##################
ARG BASEIMAGE=nginxinc/nginx-unprivileged:1.27.3-bookworm-perl
FROM ${BASEIMAGE}
ARG BUILDKIT_SBOM_SCAN_STAGE=true

USER nginx

COPY --chown=nginx:nginx ./nginx.conf /etc/nginx/conf.d/default.conf
COPY LICENSE /
