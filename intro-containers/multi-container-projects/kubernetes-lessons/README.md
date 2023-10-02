# Kubernetes Lessons

# What's Kubernetes? 

Is a container orchestrator plataform that abstracts (reduce the complexity) infrastructure complexity, prodives network, storage, scalabillity and hight availability features (it can distribute application components across multiple nodes), and helps you manage and scale containerized applications efficiently. It's a key technology in modern application development and deployment.

# When should I use Kubernetes? 

It's recommended to use Kubernetes when you have a complex applications with multiple components, services and microservices. It excels (excelente em portugues) at managing the orchestration and scaling of these components.


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

Check if it's everything working.

```shell 
kubectl get all
```

it should return with the pod status 1/1, which means that is running. If return 0 is not working.
Also, check the image status if there's no problem when you pull the image from docker hub.

If you prefer, use minikube dashboard.

```shell 
minikube dashboard
```

You should be able to access the app in your localhost:3000.

By the way, localhost:3000 didn't work for me. I don't know exactly the reasons, but I have to configure a tunnel with minikube.

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
**Useful [link](https://minikube.sigs.k8s.io/docs/handbook/accessing/#loadbalancer-access) to configure tunnel** 
