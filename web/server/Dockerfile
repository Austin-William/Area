FROM node:14.15.1

WORKDIR /server
COPY . /server/
RUN npm install
COPY . /server
EXPOSE 8080
ENV PORT=8080

## Label the image

LABEL version="1.0.0"
LABEL description="backend website & application"
LABEL maintainer="Chloé Chauvin | Austin-William Lo | Dylan Faure | Luca Banyols | Quentin Tréheux | Vincent Pichot"
LABEL author="Chloé Chauvin | Austin-William Lo | Dylan Faure | Luca Banyols | Quentin Tréheux | Vincent Pichot"

CMD ["npm", "start"]