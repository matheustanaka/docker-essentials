# Alpine Linux

Alpine linux is a smaller container version, which is an alternative to ubuntu (913MB). If we compare them, you will see that alpine linux is a distro with 5MB.

node:12-alpine itself is about 80MB.

## Why we need to use smaller containers? 

- Cheaper: mainly if you are using private container registries like Docker HUB and Azure container registry. They charge by how much storage you are using.

- Security: having less things in your container means you are less susceptible to bugs. For example, there's a NPM exploit that's going around that allows hackers to get root access to your container. If you don't have Python in your container, you are not vulnerable.


