FROM node:lts-alpine as dependencies
WORKDIR /app
COPY package.json ./
RUN npm install --verbose

FROM node:lts-alpine as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build

FROM node:lts-alpine as runner
WORKDIR /app
ENV NODE_ENV production
COPY .env* ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "run", "start"]