# My mistakes doing the challenge

## First

When you want to build the docker image and during the installation of some dependencie you see something like cannot found the dependencie "X",

Probably you are using the wrong version from node.js, I already test it with node:12-stretch and most of the dependencies was getting errors of not found.

### How to solve it?

Just change the image version to the latest or other more recently.

## Second

I need to create the workdir correctly. The main problem with the wrong approach is when you run the container, you cant see the app because the build directory is stored in the wrong folder. So, you cant see the app. 

I tried to do something like this

```shell
WORKDIR /build

COPY --from:0 /build
```
#### How to solve it?

Create the workdir with a different name, as you can see different of the build folder dependencie.

The correct is: 

```shell
WORKDIR /app
COPY /app/build
```
Following this approach you will see the app working 

## Third

I put the USER NODE inside the nginx image. 

I cannot use the user node outside nodejs image, so I started to see errors like the user privilege is wrong.

#### How to solve it? 

Only use node user inside nodejs image.

# Fourth

The npm run build is the correct way to declare the build command.

The wrong version: 

```shell
npm build
```

I started to see error of how to run the correct command but I dont pay attention on the terminal and created so many images following the same error.

# My dockerfile version, totally wrong as you can see.

```shell
# build stage
FROM node:latest
WORKDIR /build
COPY . .
RUN npm ci && npm build

# runtime stage
FROM nginx:alpine
RUN addgroup -S node && adduser -S node -G node
USER node
COPY --from=0 --chown=node:node /build /usr/share/nginx/html
```
