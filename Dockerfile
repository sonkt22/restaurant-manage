FROM node:14-alpine as builder

# RUN apk --no-cache add --virtual builds-deps build-base python git

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY . /home/node

RUN npm ci \
    && npm run build

# ---

FROM node:14-alpine

# RUN apk --no-cache add --virtual builds-deps build-base python git

ENV NODE_ENV development

USER node
WORKDIR /home/node

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/dist/ /home/node/dist/

RUN npm ci

CMD ["node", "dist/main.js"]
