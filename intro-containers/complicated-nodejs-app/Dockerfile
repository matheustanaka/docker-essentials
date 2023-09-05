FROM node:12-stretch

USER node

RUN mkdir /home/node/code 

WORKDIR /home/node/code

COPY --chown=node:node . .

# use npm ci, its a best practice, try to search about it too.
RUN npm ci

# use -P when you build the container to follow this port that was declared here
EXPOSE 3000

CMD ["node", "index.js"]
