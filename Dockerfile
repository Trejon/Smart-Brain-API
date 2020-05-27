FROM node:stretch

WORKDIR /usr/src/smart-brain

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]