FROM node

WORKDIR /app

ADD package.json /app
ADD package-lock.json /app

RUN npm install

COPY ./ /app

EXPOSE 3000

CMD ["npm", "start"]
