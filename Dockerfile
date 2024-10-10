FROM node:latest as base

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

RUN useradd --user-group --create-home --shell /bin/false app && \
npm install --global tsc-watch npm ntypescript typescript ts-node 


WORKDIR /home/node/app

COPY package*.json yarn.lock ./

USER node

RUN yarn install

COPY  --chown=node:node . .
RUN yarn build

# development
# FROM base as development

# ENV NODE_ENV=development


# CMD ["yarn", "", "dev"]

# # production
# FROM base as production

# ENV NODE_PATH = ./dist

# RUN yarn run build

EXPOSE 3000

CMD ["node", "dist/index.js"]

