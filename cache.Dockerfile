FROM node:18-bullseye AS base

# 1. Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.

WORKDIR /app

ARG SECRET_DEPLOY_GITHUB_TOKEN=""
ARG SECRET_DEPLOY_GITHUB_USER=""
ENV SECRET_DEPLOY_GITHUB_TOKEN $SECRET_DEPLOY_GITHUB_TOKEN
ENV SECRET_DEPLOY_GITHUB_USER $SECRET_DEPLOY_GITHUB_USER
RUN git config --global url."https://${SECRET_DEPLOY_GITHUB_USER}:${SECRET_DEPLOY_GITHUB_TOKEN}@github.com/TrustlessComputer/".insteadOf "https://github.com/TrustlessComputer/"

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN yarn install
