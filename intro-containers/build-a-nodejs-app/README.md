# Getting started

With the Dockerfile created and your index.js, you can build this container. So to start the dockerfile we need to build it first.

```shell
# You need to be in the same directory of your Dockerfile
docker build .
```

Docker build will execute everything that is inside of your Dockerfile.

But we have a little problem with this approach, we aren't adding tags.

When you run docker image ls will show something like this <none>

# Adding TAGS

Follow this step to add tags in your container 

```shell
# Building and adding tag
docker build -t <name:version>

# Running the container 
docker run <name:version>
```

Building your container with a name and version, when you run docker image ls it will display the name and version that
you defined before.

# Running the NODE.JS container

Ok, now you created your image with Dockerfile and started to run.

Our application is creating a server where points to localhost:3000

If we try to access this route, we will get a error.

## WHY?

Let's comeback to namespaces, we are not sharing the network with host network.
So, everything that is outside of our container will be unable to acess this network.
We did not give the explicit permission to this container to talk to the host network.

## How do we solve it?

You need to "publish" the route.

- First: add EXPOSE 3000 inside Dockerfile, before CMD field
- Second: You need to put -p 3000:3000 in your docker run command, like this:


```shell
docker run -p 3000:3000 <name:version> 
```

Following this command with -p tag you will be able to acess the localhost

# Dockerfile tags

As you can see, we need to declare what we will do in Dockerfile. 

I will explain the tags below:

```shell
# Define the base image for your Docker container.
FROM node:12-stretch 

# Sets the user that the following commands and CMD at the end will be run as. 
# Remember, always create a user, if dont put USER tag the container will run as root user.
USER node

# This sets the working directory, it's equivalent to running 'cd /home/node/code'
WORKDIR /home/node/code

# This copies the index.js file from your current directory on your host machine to the current directory in the container.
# The --chown=node:node sets the owner of the index.js file to the node user.
COPY --chown=node:node index.js

# Define the port
EXPOSE 3000

# Sets the default command to run when the container starts. it will run:
# node index.js
CMD ["node", "index.js"]
```
