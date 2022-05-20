FROM node
RUN mkdir /workdir
ADD package.json /workdir

WORKDIR /workdir

RUN npm install
ADD ./ /workdir

EXPOSE 3000
RUN ["npm", "run", "build"]
CMD [ "npm", "run", "start" ]