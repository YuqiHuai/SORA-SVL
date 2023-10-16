FROM node:18
RUN mkdir /workdir
ADD package.json /workdir

WORKDIR /workdir

RUN npm install
ADD ./ /workdir

ENV MONGO_URL="mongodb://sorasvl-mongo:27017"
ENV MONGO_DB_NAME="WISE"

EXPOSE 3000
RUN ["npm", "run", "build"]
CMD [ "npm", "run", "start" ]