FROM node:alpine As development

WORKDIR /usr/src/app

COPY package.json ./

COPY pnpm-lock.yaml ./

RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" sh -

RUN corepack enable

RUN pnpm install

COPY . .

RUN pnpm run build


FROM node:alpine as production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./

COPY pnpm-lock.yaml ./

RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" sh -

RUN corepack enable

RUN pnpm install --prod --ignore-scripts

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/app/identity/main"]