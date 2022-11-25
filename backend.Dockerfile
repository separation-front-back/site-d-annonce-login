FROM node:16

WORKDIR /usr/src/app

ENV SERVER_PORT=4001
ENV DB_HOST=db
ENV DB_PORT=3306
ENV DB_USERNAME=root
ENV DB_PASSWORD=root
ENV DB_NAME=database
ENV JWT_SECRET=secret
ENV GOOGLE_CLIENT_ID=759931392035-bj1vpfhhqi5spl3ftmfqrgjf2ioju5sl.apps.googleusercontent.com
ENV GOOGLE_CLIENT_SECRET=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
ENV GOOGLE_CALLBACK_URL=http://localhost:4000/auth/google/callback

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src

EXPOSE 4001 



CMD ["npm","run","dev"]