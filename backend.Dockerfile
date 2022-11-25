FROM node:16

WORKDIR /usr/src/app

ENV SERVER_PORT=4000
ENV DB_HOST=db
ENV DB_PORT=3306
ENV DB_USERNAME=root
ENV DB_PASSWORD=root
ENV DB_NAME=database
ENV JWT_SECRET=secret
ENV GOOGLE_CLIENT_ID=google_client_id
ENV GOOGLE_CLIENT_SECRET=google_client_secret
ENV GOOGLE_CALLBACK_URL=http://localhost:4000/auth/google/callback

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src

EXPOSE 4000 

CMD ["npm","run","dev"]