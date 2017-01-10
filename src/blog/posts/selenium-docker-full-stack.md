---
title: Running Selenium tests against a Docker stack
date: 2015-10-27
layout: Post
---

*This post first appeared at [Black Pepper
Software](https://www.blackpepper.co.uk/blog/selenium-docker-full-stack)*

In case you missed it, it's possible to perform your Selenium acceptance
tests using Docker containers all the way down.

Let's say you have the following stack of containers:

   * A MongoDB database
   * A Spring Boot app
   * An Nginx frontend

You can run your ATs through the whole stack by adding in a Selenium
container, e.g.
[`selenium/standalone-firefox`](https://hub.docker.com/r/selenium/standalone-firefox/)
(there are others on [Docker Hub](https://hub.docker.com/u/selenium/)), and
linking it to nginx. Let's make this concrete with a (simplified)
[docker-compose](https://docs.docker.com/compose/) example, where we build
our app from a Dockerfile in the current directory:

```dockefile
db:
    image: mongo:3.1
    command: mongod --storageEngine wiredTiger
app:
    build: .
    links:
        - db
web:
    image: nginx
    links:
        - app
    volumes:
        - ./config/nginx/:/etc/nginx/conf.d/
selenium:
    image: selenium/standalone-firefox
    environment:
        # Required to avoid container startup hanging sometimes in
        # some environments
        JAVA_OPTS: -Djava.security.egd=file:/dev/./urandom
    links:
        - web
    ports:
        - "4444:4444"
```

You bring up the container stack and everything can communicate the way it
should. The only port we've exposed is the Selenium web driver's remote API
port, which can access from Java as follows:

```java
WebDriver driver = new RemoteWebDriver(new URL("http://localhost:4444/wd/hub"), DesiredCapabilities.firefox());
```

But we can take this one step further, and run our acceptance tests in a
container too, as follows (here our acceptance tests are run by the
`verify` lifecycle phase):

```sh
docker run \
   --rm \
   --workdir /usr/src/app \
   --volume "$PWD/..":/usr/src/app \
   --volume "$HOME/.m2/":/root/.m2/ \
   --link selenium \
   maven:3.3-jdk-8 \
   mvn -B verify
```

Now we don't have to expose port 4444 in the Selenium container above. We
also have to change our Java code to:

```java
WebDriver driver = new RemoteWebDriver(new URL("http://selenium:4444/wd/hub"), DesiredCapabilities.firefox());
```

And there you have it - containers all the way down. The benefit of this is
that it forces you to run each component as separate unit (a micro-service,
if you will!), which keeps you honest when you're configuring your services -
you can't rely on a service or configuration magically being in the
right place. Scaling the stack to multiple machines then becomes natural.
