# chat-web

Web application for [chat microservice](https://hub.docker.com/repository/docker/darkpearl/chat-service) usage.

## Setup

Install dependencies

```bash
npm install
```

Compiles and hot-reloads for development

```bash
npm run serve
```

Env. variables

- `VUE_APP_ROOT_API` : chat microservice API url


## Usage

### Run docker image
```bash
docker run -it -p 8080:80 -e "VUE_APP_ROOT_API={chat-service-url}" --name chat-web darkpearl/chat-web
```

See [full  docker-compose example](deploy) in deploy directory.

API will be running at [http://localhost:1337](http://localhost:1337)

Web App will be running at [http://localhost:8080](http://localhost:8080)
