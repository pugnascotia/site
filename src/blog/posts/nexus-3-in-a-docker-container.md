---
title: Latest Nexus 3 milestone in Docker
date: 2015-11-05
layout: Post
---

*This post first appeared at [Black Pepper
Software](https://www.blackpepper.co.uk/blog/nexus-3-in-a-docker-container)*

If you're curious about the next version of [Sonatype's
Nexus](https://support.sonatype.com/entries/96157708), which has Docker
repository support among other things, you can try it out in a container
with the following Dockerfile:

```dockerfile
FROM sonatype/nexus:oss

ENV NEXUSVERSION 3.0.0-b2015091801
ENV JAVAHOME /usr/java/jdk1.7.0_76

ADD nexus-3.0.0-b2015091801-bundle.tar.gz /tmp

USER root

RUN rm -rf /opt/sonatype/nexus && \
    mv /tmp/nexus-3.0.0-b2015091801/ /opt/sonatype/nexus && \
    chown -R nexus /opt/sonatype/nexus

USER nexus

CMD /opt/sonatype/nexus/bin/karaf server
```

It builds on the official Docker image but uses the current official milestone. Download the milestone via link above, then build it with:

```sh
docker build --pull --tag sonatype/nexus:3.0.0-b2015091801 .
```

Now you can run it with:

```sh
docker run -d -p 8081:8081 --name nexus3 sonatype/nexus:3.0.0-b2015091801
```

Enjoy!
