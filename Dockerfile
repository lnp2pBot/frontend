# @lnp2pbot frontend for rust-api
# -------------------------------
FROM node:14-alpine

# Create App directory in Container
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Upddate
RUN apk update && apk upgrade

# Install App dependencies (package*.json)
COPY . .
RUN npm install
#RUN npm install typescript # Avoid typescript module not found error

# build for production
RUN npm run build

# Launch server
EXPOSE 3000
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
CMD ["npm", "start"]
