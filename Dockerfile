FROM node:20-slim AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build


FROM node:20-slim
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci --production
COPY --from=build /usr/src/app/lib ./lib
EXPOSE 3000
ENV NODE_ENV=production
CMD ["npm", "run", "start:prod"]

# Docker build Version with 1 and latest
# docker build -t sreeteja06/gh-app-labels-and-badges:1.0.0 -t sreeteja06/gh-app-labels-and-badges:latest .

# Docker run
# docker run --env-file ./.env -p 3000:3000 -d --name gh_app sreeteja06/gh-app-labels-and-badges:latest
