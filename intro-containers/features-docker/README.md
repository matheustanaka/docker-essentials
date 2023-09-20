# Bind Mounts

Bind Mounts are a type of storage that allows you to mount a specific directory or file from the machine directly into a container.

This creates a two-way binding where any changes made in the mounted directory or file inside the container are reflected on the host, and vice versa.

To use bind mounts you need to specify the path of your local folder or file. Example:

```shell
docker run -v /path/on/local:/path/in/container my-image
```

This would mount the directory at <b>/path/on/host</b> on your host machine to <b>/path/in/container</b> inside the container.

## Why use Bind Mounts? 

Bind Mounts are important to persist your data, when you shutdown your container you will loose everything that you worked. Using Bind Mounts you will store the data of the directory that was mounted inside your container. For every change inside the directory that was mounted will reflect the same in the container directory.

- <b>Development</b>: Bind mounts are particularly useful during development. For example, you can mount your application code into a container, and as you make changes to the code on your host machine, those changes are immediately available inside the container without needing to rebuild the image or recreate the container.

- <b>Persistence</b>: While bind mounts can be used for persistence, it's important to note that Docker has another feature, named volumes, which are often better suited for persisting data in a more managed way.

- <b>Configuration</b>: Bind mounts can be used to provide configuration files or secrets from the host into the container at runtime.

## Analogy about Bind mounts

Bind Mounts will open a portal between your host machine and the container, where you will share a specific directory, for example, the /bin folder. For every change that you made outside the container will reflect on the container folder, the same happens when you change inside the container, it will reflect to your host machine.

With Bind Mounts, the container will be able to see only the directory that was shared. In this case, the /bin directory. Any other directory won't be able to see, the container could not access it.

Let's explain what the command below does.

```shell 
docker run --mount type=bind,source="$(pwd)"/build,target=/usr/share/nginx/html -p 8080:80 nginx
```

- **--mount**: Sepcify a storage option, indicating that a file or directory will be mounted from the host to the container.
- **type=bind**: Define the type of mount bind, it could be volume or any other.
- **source="$(pwd)"/bind**: Sharing the path of the directory that will be used inside the container.
- **target=/usr/share/nginx/html**: Determines the location inside the Docker container where the **source** directory will be mounted.
