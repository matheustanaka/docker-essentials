# Docker Compose

As the previous chaperts you could see how difficult is to set up multiple containers and connect them.

Docker developed a tool called as Docker Compose, where you can define and run multi-container applications. With Compose, you use YAML file to configure your applications services.

Then, with a single command you create and start all the services that you describe in your docker-compose.yml

## Why Docker Compose? 

Docker Compose is pretty easy to configure, you can connect multiple containers in the same file. 

Also, is useful to development environment when you want to run multi-containers applications on a single machine.

When it comes to production deployments that require scalability across multiple machines, other solutions or orchestratos (like Kubernetes) might be more recommended.

# Set up your Container with Docker Compose

I will copy the project from [docker-network](../docker-network/) to see how we can create a container and connect them in a single file and without running multiple containers to start our applications.

You can find the [project](./docker-network/) here.

### docker-compose.yml

This is basically all of the CLI configurations we were giving to the containers but captured in a YAML file. 

We can just run this command: 

```shell 
docker-compose up
```

```shell
# docker-compose.yml

version: "3"
services:
  web:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/home/node/code
      - /home/node/code/node_modules
    links:
      - db
    environment:
      MONGO_CONNECTION_STRING: mongodb://db:27017
  db:
    image: mongo:3
```

### Understanding the tags

    version: "3" --> The version of docker compose that we are using
    services: --> Define the containers that we need for this app.
    web: --> the "web" container is our app
        build: . --> Identify where Dockerfile is. As we used a custom image, we need to Dockerfile.
        ports: --> Expose the Port 
        - "3000:3000"
        volumes: --> mounting in our code, so that we can keep code without having to rebuild the image.
        - .:/home/node/code
        - /home/node/code/node_modules --> Getting the node_modules from the first build container, we do this to don't break the dependencies if we were using different System Operators (MacOS, windows or linux). Use this to keep the same OS binary dependencie and don't break your container.
        links: --> Connect to the second container 
        - db --> the container that should be connected         
        environment: --> Specify our enviroment variable
        MONGO_CONNECTION_STRING: mongodb://db:27017
    db:  --> the "database" container
        image: mongo:3


# Dockerfile and docker-compose, can I use both?

Yes, you can dockerfile and docker-compose in the same project. 

You will choose Dockerfile option when you have to create your own image with different configurations from those images of DockerHub

By the way, you can use only the docker-compose, but if you need to add something inside your image you should create a dockerfile.

In Summary: 

- If you're only using pre-built images from a registry, you don't need a Dockerfile.

- If you're building custom images for your application or services, you will typically use a Dockerfile to define how those images should be built, and docker-compose can then build and run those images for you.

### Custom Images with Dockerfile 

For each change that you made in your Dockerfile, you should rebuild the image again. 

But how can we do it? 

```shell 
docker-compose up --build
```

With this command you will rebuild the image.
