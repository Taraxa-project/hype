FROM node:18.16-alpine AS build

RUN apk --no-cache add --update \
    python3 git build-base

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json yarn.lock ./
COPY packages/contracts/package.json /app/packages/contracts/
COPY services/hype-backend/package.json /app/services/hype-backend/

RUN yarn install --frozen-lockfile \
    && yarn cache clean

COPY packages/contracts /app/packages/contracts
COPY services/hype-backend /app/services/hype-backend

RUN yarn workspace hype-contracts compile
RUN yarn workspace hype-backend build

# Production image
# Make sure you always lock to the correct sha256
# Failure to do this might result in using a different image
# Tags are not 100% reliable

FROM node:18.16-alpine AS release

WORKDIR /app

RUN touch .env

COPY package.json /app/package.json
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/packages/contracts /app/packages/contracts
COPY --from=build /app/services/hype-backend/package.json /app/services/hype-backend/
COPY --from=build /app/services/hype-backend/node_modules /app/services/hype-backend/node_modules
COPY --from=build /app/services/hype-backend/dist /app/services/hype-backend/dist

CMD ["yarn", "workspace", "hype-backend", "start:prod"]
