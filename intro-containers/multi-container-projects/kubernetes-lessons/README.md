# Kubernetes Lessons

# What's Kubernetes? 
# Why should I use Kubernetes? 
# How it works? 


# What's Kompose? 

Kompose is a tool that converts docker-compose files into a Kubernetes file. Is Conversion tool that transformrs Docker Compose to container orchestrators such as Kubernetes.

### How to use it? 

```shell 
# You have to stay in the same directory of docker-compose
kompose convert
```

The command above will create 4 files.

    db-deployment.yaml
    db-service.yaml
    web-deployment.yaml
    web-tcp-service.yaml

With these files created it's time to deploy our app.

```shell 
kubectl apply -f db-deployment.yaml -f db-service.yaml -f web-deployment.yaml -f web-tcp-service.yaml
```

It will create our pods and services. 

You should be able to access the app in your localhost:3000.

By the way, localhost:3000 won't work for me. I don't know exactly the reasons but I have to configure a tunnel with minikube.

- tunnel configurtion

```shell 
# this command should have a isolated window to run
minikube tunnel
```

Then, you have to verify the LoadBalancer external IP to be able to access the application

- First, we need to verify the external ip

```shell 
kubectl get svc
```

- then, you will be able to access the url

```shell 
# The port 3000 was defined inside our docker-compose.
http://EXTERNAL_IP:3000
```
