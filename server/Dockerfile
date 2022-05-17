FROM node
RUN mkdir /workdir
ADD package.json /workdir

WORKDIR /workdir

RUN npm install
ADD ./ /workdir

EXPOSE 3000
CMD [ "node", "index.js" ]