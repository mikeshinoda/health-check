# ---- Base Node ----
FROM node:carbon AS base
# Create app directory
# RUN mkdir -p /app
WORKDIR /app

# ---- Dependencies ----
FROM base AS dependencies  
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY .npmrc ./
# install app dependencies including 'devDependencies'
RUN npm install

# ---- Copy Files/Build ----
FROM dependencies AS build  
WORKDIR /app
COPY . /app

# --- Release with Alpine ----
FROM node:8.9.4-alpine AS release  
# Create app directory
WORKDIR /app

COPY --from=dependencies /app/package.json ./
COPY --from=dependencies /app/.npmrc ./
# Install app production dependencies 
RUN npm install --production
COPY --from=build /app ./

# CMD [ "npm", "start" ]
CMD ["node", "./bin/www"]