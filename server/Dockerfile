FROM node:18
RUN mkdir /workdir
ADD package.json /workdir

WORKDIR /workdir

# SORA-SVL assets
ADD https://xronos-avp-lgsvl-assets.s3.amazonaws.com/avp-wise.tar.gz /workdir
RUN tar -xvf avp-wise.tar.gz /workdir/server/assets/

RUN npm install
ADD ./ /workdir
RUN 

EXPOSE 3000
RUN ["npm", "run", "build"]
CMD [ "npm", "run", "start" ]