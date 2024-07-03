FROM node:16.17.1

WORKDIR /home/simocaver-frontend

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli@14.2.0

COPY . .


EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]
