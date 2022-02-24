FROM node:alpine AS build
RUN apk update
RUN apk add --no-cache git

WORKDIR /app
ENV PNPM_VERSION=6.30.0

RUN npm i -g pnpm@${PNPM_VERSION}
COPY pnpm-lock.yaml ./
RUN pnpm fetch
RUN ls -a

COPY . .
RUN pnpm install --frozen-lock

RUN pnpm run build:admin

FROM nginx:stable

EXPOSE 80
WORKDIR /app

COPY --from=build /app/apps/admin/dist /usr/share/nginx/html

STOPSIGNAL SIGQUIT

CMD ["nginx", "-g", "daemon off;"]
