# Multi-stage builds

Is used to optimize Dockerfiles, is a good way to read and maintain.

You can create smaller images with multi-stage, keep your infrasctructe more security and separate all the stages.

# How to use it 

To start with multi-stage builds, you need to specify the steps with multiples "FROM" statements in your Dockerfile.

For each "FROM" instruction you define a new stage of the build.

```shell 

# build stage
FROM node:12-stretch 
WORKDIR /build
COPY package-lock.json package.json ./
RUN npm install
COPY . .

# runtime stage
FROM alpine:3.10
RUN apk add --update nodejs
RUN addgroup -S node && adduser -S node -G node
USER node
RUN mkdir /home/node/code
WORKDIR /home/node/code
COPY --from=0 --chown=node:node /build .
CMD ["node", "index.js"]

```

# How it works? 
The build stage is an intermediate image, we only use this stage to install the dependecies. 

When this stage is finished it will go to the runtime stage. Basically will copy the dependencies from the first stage image to the runtime stage.

So the Build stage is only used to help to create the final image which is the Runtime stage. At the end of this process, will create a smaller image and the intermediate image wont be stored.

When you run docker images, you will see only the second stage. 

# Explicacao em portugues pelo chat gpt

## pergunta
Então, vamos colocar uma situacão. Supondo que eu nao esteja usando multi-stage, que eu coloque tudo em um unico arquivo com uma unica TAG  de FROM, isso vai gerar uma imagem maior? Enquanto com o multi-stage, isso vai gerar uma imagem menor porque eu separei as fases de build e de runtime?

## resposta
Exatamente, vamos entender melhor essa situacao.

Dockerfile de estágio único:
Vamos supor que você tem um Dockerfile como este, que não usa o multi-stage:

dockerfile
```shell
FROM node:12-stretch 
WORKDIR /app
COPY package-lock.json package.json ./
RUN npm install
COPY . .
CMD ["node", "index.js"]
```
#### Neste cenário:

- Você está usando uma imagem baseada em Debian Stretch com Node.js 12.
- Você instala todas as suas dependências usando npm install.
- Todo o código e dependências são mantidos na imagem final.

#### Esta imagem incluirá:

- O sistema operacional Debian Stretch.
- O Node.js e todas as suas dependências.
- Todas as ferramentas e bibliotecas adicionais que podem ter vindo com a imagem node:12-stretch.
- Todas as suas dependências de projeto (do npm install).
- Seu código.

### Dockerfile de multi-stage:

Agora, usando o Dockerfile de multi-stage que você forneceu anteriormente:

- No estágio de build:
    - Você está usando uma imagem baseada em Debian Stretch com Node.js 12.
    - Você instala todas as suas dependências usando npm install.
- No estágio de runtime:
    - Você usa a imagem minimalista Alpine.
    - Você copia apenas o código e as dependências necessárias do estágio de build.

A imagem final incluirá:

- O sistema operacional Alpine (que é muito menor em comparação com o Debian Stretch).
- O Node.js (instalado via apk).
- Apenas as dependências e o código do seu projeto, copiados do estágio de build.

### Conclusão:
Ao usar o multi-stage build:

Você se beneficia da capacidade de construir seu código em um ambiente completo (com todas as ferramentas necessárias), mas depois executá-lo em um ambiente muito mais enxuto e otimizado.

Sua imagem final será menor, pois você não está incluindo todas as ferramentas e dependências desnecessárias que foram necessárias apenas para a fase de construção.

Uma imagem menor resulta em tempos de implantação mais rápidos, menos espaço em disco usado, e potencialmente menos superfície de ataque do ponto de vista de segurança.

Então, para responder sua pergunta: Sim, geralmente ao usar o multi-stage, você acabará com uma imagem menor porque separou as fases de build e runtime, enquanto com um único estágio, você pode acabar com uma imagem significativamente maior contendo ferramentas e dependências desnecessárias para a execução de sua aplicação.
