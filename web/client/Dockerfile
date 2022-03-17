FROM node:14.15.1

WORKDIR /web-client
COPY . /web-client/
RUN npm install
COPY . /web-client
EXPOSE 8181
ENV PORT=8181

## Label the image

LABEL version="1.0.0"
LABEL description="client website"
LABEL maintainer="Chloé Chauvin | Austin-William Lo | Dylan Faure | Luca Banyols | Quentin Tréheux | Vincent Pichot"
LABEL author="Chloé Chauvin | Austin-William Lo | Dylan Faure | Luca Banyols | Quentin Tréheux | Vincent Pichot"

CMD ["npm", "start"]