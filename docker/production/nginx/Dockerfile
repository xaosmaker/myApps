FROM node:22-alpine3.19 AS  base



FROM base AS node-build-stage

RUN apk add --no-cache libc6-compat

COPY client/package.json client/yarn.lock* client/package-lock.json* client/pnpm-lock.yaml* ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi


ARG APP_HOME=/app
WORKDIR ${APP_HOME}


COPY ./client ${APP_HOME}
RUN npm run build

RUN chown -R node:node ${APP_HOME}/dist && \
  chmod -R 775 ${APP_HOME}/dist


FROM nginx:1.27-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY ./docker/production/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=node-build-stage /app/dist /app/dist
