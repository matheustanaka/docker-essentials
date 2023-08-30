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
