FROM node:10

RUN mkdir -p /usr/src/app

WORKDIR /use/src/app 

ENV GOOGLE_APPLICATION_CREDENTIALS  /** Insert Your Google API json file here **/

COPY package*.json ./

RUN npm install 

COPY . .

RUN export GOOGLE_APPLICATION_CREDENTIALS=GOOGLE_APPLICATION_CREDENTIALS

EXPOSE 8000 

CMD ["npm","start"]