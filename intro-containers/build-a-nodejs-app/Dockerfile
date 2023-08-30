FROM node:12-stretch 

USER node

WORKDIR /home/node/code

COPY --chown=node:node index.js

EXPOSE 3000

CMD ["node", "index.js"]
