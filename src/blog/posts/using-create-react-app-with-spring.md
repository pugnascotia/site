---
title: Using create-react-app with Spring Boot
date: 2016-12-08
layout: Post
# Example of a top image
# hero: https://farm8.staticflickr.com/7479/15669216853_aa8e70eae1_o.jpg
---

*This post first appeared on [Black Pepper
Software](https://www.blackpepper.co.uk/blog/using-create-react-app-with-spring).*

[create-react-app](https://github.com/facebookincubator/create-react-app) is a
quick way to start building a frontend in ReactJS. It scaffolds up a Node
project with a dependency on 'react-scripts', which implement all the necessary
steps for an efficient, productive workflow. This post looks at how to use it
with Spring Boot, for serving up the frontend files in the first place, and for
providing an API to the client.

If you're impatient, you can skip to the [end result on GitHub](https://github.com/pugnascotia/spring-cra-demo).

You'll need the following prerequisites:

   * Java 8
   * NodeJS
   * Ideally [Yarn](https://yarnpkg.com/), but npm will also do.

## Installing create-react-app

Install `create-react-app` globally using one of the following commands. It
has to be global in order to run the command outside a Node project.

Note that it may not be obvious where the resulting command is installed.
On my Mac OSX machine with Node 7.2.0, the command was installed in
`/usr/local/Cellar/node/7.2.0/bin`.

```sh
# Preferred - it's faster
yarn global install create-react-app

# Also works:
npm install --global create-react-app
```

## Generate a Spring project

Use [Spring Initializr](http://start.spring.io/) to generate a new project.
You'll need to add 'Web' support at a minimum. I named my project
'cra-demo'. Unzip the generated project somewhere useful.

```sh
cd ~/src

# Clearly you'll need to use the right path!
unzip ~/Downloads/cra-demo.zip

cd cra-demo
```

## Generate a React frontend

Now we can generate our frontend:

```sh
cd src/main

# We'll put the frontend under src/main/app, in keeping with the Maven style
create-react-app app --verbose
```

## Building the frontend from Maven

Next we'll integrate how our frontend is built with the overall application
build to keep it simple. In order to do this we add two plugins to the POM.
Firstly, we use `frontend-maven-plugin` to do the following:

   * Install specific versions of Node and Yarn locally to the project
   * Perform a `yarn install` in our frontend project.
   * Perform a production frontend build during the `package` lifecycle phase.

Add the following to your POM under `project / build / plugins`:

```xml
<plugin>
    <groupId>com.github.eirslett</groupId>
    <artifactId>frontend-maven-plugin</artifactId>
    <version>1.2</version>
    <executions>
        <execution>
            <id>Install Node and Yarn</id>
            <goals>
                <goal>install-node-and-yarn</goal>
            </goals>
        </execution>

        <execution>
            <id>yarn install</id>
            <goals>
                <goal>yarn</goal>
            </goals>
            <configuration>
                <arguments>install</arguments>
            </configuration>
        </execution>

        <execution>
            <id>Frontend production build</id>
            <phase>package</phase>
            <goals>
                <goal>yarn</goal>
            </goals>
            <configuration>
                <arguments>run build</arguments>
            </configuration>
        </execution>
    </executions>
    <configuration>
        <nodeVersion>v7.2.0</nodeVersion>
        <yarnVersion>v0.18.0</yarnVersion>
        <installDirectory>.mvn</installDirectory>
        <workingDirectory>src/main/app</workingDirectory>
    </configuration>
</plugin>
```

Next we'll use `maven-resources-plugin` to copy the frontend build into the
general Maven build output, so that it is included in the final built artifact.
We copy into `target/classes` so that our frontend files are present in the
final JAR file.

```xml
<plugin>
    <artifactId>maven-resources-plugin</artifactId>
    <version>3.0.1</version>
    <executions>
        <execution>
            <id>Copy frontend production build to resources</id>
            <phase>package</phase>
            <goals>
                <goal>copy-resources</goal>
            </goals>
            <configuration>
                <outputDirectory>${basedir}/target/classes</outputDirectory>
                <resources>
                    <resource>
                        <directory>src/main/app/build/</directory>
                        <filtering>true</filtering>
                    </resource>
                </resources>
            </configuration>
        </execution>
    </executions>
</plugin>
```

## Run the project

Now you can build and execute the project as follows:

```sh
mvn clean package
java -jar target/cra-demo-0.0.1-SNAPSHOT.jar
```

You can check to see whether Spring is serving up your frontend by going to
[http://127.0.0.1:8080](http://127.0.0.1:8080/) in your browser. You should see the typical CRA welcome
page, saying 'Welcome to React'.

Note that if you included Spring Security in your Spring Initializr project,
you'll find the site is password protected - go remove it from your POM and
rebuild it.

## Upgrading

Development is ongoing on `create-react-app`, meaning that there are regular
releases of `react-scripts`. In order to benefit from these, you can follow the
[upgrade instructions in the project's repository](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#updating-to-new-releases).

## Conclusion

In this post we integrated a Spring Boot application with a project generated
using `create-react-app`. We're now in a position to start building our
frontend in React and our APIs in Java. Also, because we used
`create-react-app`, we can upgrade our frontend's dependency on `react-scripts`
and benefit from improvements to its build process. You can see the
[end result on GitHub](https://github.com/pugnascotia/spring-cra-demo).

There's a lot that this application doesn't do. For a more complete React +
Java example, see
[pugnascotia/spring-react-boilerplate](https://github.com/pugnascotia/spring-react-boilerplate).
