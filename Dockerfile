FROM node:boron 

COPY . /src 

WORKDIR /src 

RUN npm install 

EXPOSE 3000 

CMD ["npm","start"]