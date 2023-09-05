# Search about EXPOSE and network inside container and outside of it
EXPOSE tag basically declare the port that you are using, but if you don't use the "-p" flag in the command, it will not expose the port.

Ok, maybe you will ask yourself, why should i use? 

Use expose is a good way to document what you are doing, and instead of use the flag "-p 3000:3000" you can just pass "-P" in Uppercase that take all of the ports your exposed with "EXPOSE" and will map them to random ports on the host.

## About ports inside docker container and outside

The flag -p 3000:3000

- The first 3000 (before the colon) is the port number on your host machine.
- The second 3000 (after the colon) is the port number inside the container.

In your context:

The Node.js application inside the container is listening on port 3000 (inside the container).
You want to access this application from your host machine using port 3000.
By using -p 3000:3000, you're effectively saying:

"When something on my host machine communicates with port 3000, forward that communication to port 3000 inside the container."

### Extra

- Port mappings are flexible. If you wanted the Node.js app to be accessible on port 8000 on your host, but it's still running on port 3000 inside the container, you'd use -p 8000:3000.


# Search about docker layers
THE ORDER OF DOCKERFILE INSTRUCTIONS MATTERS (PAY ATTENTION)

### Cached Layers

When you run a build, the builder attempts to reuse layers from earlier builds. If a layer of an image is unchanged, then the builder picks it up from the build cache. If a layer has changed since the last build, that layer, and all layers that follow, must be rebuilt.

It's like git, if you add one more line into the project, only that line that was changed will be commited and generate a new "version" or a layer. 

