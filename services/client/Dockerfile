# build environment
FROM node:14-alpine as build

# Default replace vars for entrypoint
# Should be removed after we able to configure at runtime
ARG REACT_APP_API_HOST=REACT_APP_API_HOST_STRING_REPLACE

RUN apk --no-cache add --update git python3 make g++\
    --virtual .build_deps \
    build-base

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json yarn.lock /app/
COPY services/client/package.json /app/services/client/

RUN yarn install

COPY . /app
RUN SKIP_PREFLIGHT_CHECK=true yarn workspace hype-client build

# nginx
FROM nginx:1.18-alpine

COPY services/client/docker-files/nginx.conf /etc/nginx/conf.d/default.conf
COPY services/client/docker-files/entrypoint.sh /entrypoint.sh

COPY --from=build /app/services/client/build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]