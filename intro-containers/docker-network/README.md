# Docker Network 

Docker network provides a way for containers to communicate with each other.

You can connect multiples containers in the same network to connect them. The same happens when you work with server administration, usually, you have a network where these servers are connected. If one server is outside this network, the servers that are inside the network won't be able to see the server that is outside.

## Default Networks

- **Bridge** is the default network for containers, if you don't specify a network when running a new container, it gets attached to this network.
    - Containers on the same bridge network can communicate, but there are limitations.

- **Host** Removes network isolation and allows a container to use the host network directly

- **None** A network namespace with no access to external networks or other containers. Essentially, no networking.

# User-defined Networks

Docker allows you to create a **custom networks** using the docker network create command.

Always create your own network when you want to connect containers, use the default **bridge** is not recommended.

# Creating your own network

The command below will create a network called **app-net**

```shell
docker network create --driver=bridge app-net
```

We can see the list of networks using the command:

```shell
docker network ls
```
The list of networks:

```shell
NETWORK ID     NAME      DRIVER    SCOPE
18b0497debe4   app-net   bridge    local
3ab6119b3d07   bridge    bridge    local
e56db834b50d   host      host      local
5f78e16ce8de   none      null      local
```

# Connecting containers

Let's create a MongoDB server. 

```shell
docker run -d --network=app-net -p 27017:27017 --name=db --rm mongo:3
```

- **-d** = Run in the background
- **--network=app-net** = Connect to the app-net network
- **-p 27017:27017** = Specify the port (Mongo use this port as default)
- **--name=db** = Define the container name as db, it can be used as network address.
- **--rm** = Be automatically removed when it's stopped, useful for temporary containers. 

The second container will another MongoDB, but this time will run the mongo Client.

```shell
docker run -it --network=app-net --rm mongo:3 mongo --host db
```

- **-it** = Run interactive mode, this way you can interact with the container in terminal
- **-network=app-net** = Connect to the same network bridge as the first container above.
- **mongo:3** = Specify the image and version
- **mongo** = This initiates the MongoDB CLI, in this case the Client.
- **--host db** = Instructing the MondoDB CLI to connect to a MongoDB server running on a host named **db** (our first container, btw).

# Validate the connection between the containers 

Run this command to inspect it to see details, including which containers are connected to it:

```shell
docker network inspect app-net
```

```shell
❯ docker network inspect app-net

[
    {
        "Name": "app-net",
        "Id": "18b0497debe454815f80cfc56f90cb5f30a2bbd539dd3c383b8c327080b3fa5e",
        "Created": "2023-09-21T22:04:12.682236215Z",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "172.18.0.0/16",
                    "Gateway": "172.18.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {
            "18ca664cd8c4dcd5ec29b6061e8f9fdcc60adeaeeb2a9817512442ea664ff6dd": {
                "Name": "eloquent_ganguly",
                "EndpointID": "aa71838192f9dae20068197c49871391cab01112ff3ee16f1c50c65ec046c3eb",
                "MacAddress": "02:42:ac:12:00:03",
                "IPv4Address": "172.18.0.3/16",
                "IPv6Address": ""
            },
            "550b56d9a7b4a9cc59ddc4b77950c7d4e5dace02ba96a3df8a17c93ad2af8cf0": {
                "Name": "db",
                "EndpointID": "bd686c369f2c71a9b09ea4c884513212917277784e841c900d38156a4d3c92a9",
                "MacAddress": "02:42:ac:12:00:02",
                "IPv4Address": "172.18.0.2/16",
                "IPv6Address": ""
            }
        },
        "Options": {},
        "Labels": {}
    }
]
```

# Adding a Node.js project to test it 

We can also add one more container to this connection. 

- First we need to setup a server with Express.js and Install mongo dependecies.

- Then, we will be able to connect this server with the database just sharing the url of mongodb using the default port 27017.

- Create the [Dockerfile](./Dockerfile)

Pay attention, we need to start the mongodb container before to start the node.js app. Go to the top side to start these containers.

```shell 
# Building the dockerfile 
docker build --tag=my-app-with-mongo .

# Running the container with the app-net defined 
docker run -p 3000:3000 --network=app-net --env MONGO_CONNECTION_STRING=mongodb://db:27017 my-app-with-mongo
```

As you can see, our containers are connected and working together.

You can also access the url [localhost](http://localhost:3000/) and go to the /add page. Then, press F5 for three times. Go back to the / page and you will the counter with the result "3" because you refresh the page 3 times.

```shell 
repos/docker-essentials/intro-containers on  main ?!
❯ docker network inspect app-net

[
    {
        "Name": "app-net",
        "Id": "18b0497debe454815f80cfc56f90cb5f30a2bbd539dd3c383b8c327080b3fa5e",
        "Created": "2023-09-21T22:04:12.682236215Z",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "172.18.0.0/16",
                    "Gateway": "172.18.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {
            "085d4969cfb26cd19e9519ab29a992001bd77aced5af8e38c98d8e83883233a4": {
                "Name": "thirsty_bardeen",
                "EndpointID": "6675d8196569e3426d0db24b2ef3b1128470206c460b4e0127a91e0be4b7b0a5",
                "MacAddress": "02:42:ac:12:00:02",
                "IPv4Address": "172.18.0.2/16",
                "IPv6Address": ""
            },
            "086d73e04b743d333b17e6df9d17bad8d1d2b20909878d239b97ef291fa62a6d": {
                "Name": "db",
                "EndpointID": "16340a3c166bc7c5233c8b8b6f213a01825caecd62da1270b7fc8968719a8821",
                "MacAddress": "02:42:ac:12:00:03",
                "IPv4Address": "172.18.0.3/16",
                "IPv6Address": ""
            }
        },
        "Options": {},
        "Labels": {}
    }
]

repos/docker-essentials/intro-containers on  main ?!
❯ docker ps
CONTAINER ID   IMAGE               COMMAND                  CREATED         STATUS         PORTS                                           NAMES
086d73e04b74   mongo:3             "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes   0.0.0.0:27017->27017/tcp, :::27017->27017/tcp   db
085d4969cfb2   my-app-with-mongo   "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes   0.0.0.0:3000->3000/tcp, :::3000->3000/tcp       thirsty_bardeen
```






