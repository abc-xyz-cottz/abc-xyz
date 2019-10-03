FROM node:12.2.0-alpine
RUN mkdir /crmweb
WORKDIR /crmweb
ENV PATH /crmweb/node_modules/.bin:$PATH
COPY package*.json /crmweb/
RUN npm install
COPY . /crmweb/
RUN npm run build