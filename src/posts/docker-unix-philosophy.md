---
title: Docker And The Unix Philosophy
date: 2016-06-03
layout: Post
---

*This post first appeared at [Black Pepper
Software](https://www.blackpepper.co.uk/blog/docker-unix-philosophy)*

Everyone and their dog has heard of [Docker](https://www.docker.com/) and
containerization by now. The technology does present some amazing new
opportunities, but for me one of the most striking things is that it allows
us to get back to the Unix philosophy - [do one thing, and do it
well](http://en.wikipedia.org/wiki/Unix_philosophy#Do_One_Thing_and_Do_It_Well).

A well-containerized application has the minimum content necessary to
function. To build a full application, we compose a number of containers
together. We also want to use the exact same container in all our
environments, so that the code that we develop is the same code that we
test, and is the same code that we deploy. Taken together, this encourages
us to write smaller, focused applications built with composition and
configuration in mind. This is the same approach taken so successfully in
the early days of Unix with
[pipelines](http://en.wikipedia.org/wiki/Pipeline_%28Unix%29) (though a
composition of containers is clearly different to a one-way pipeline). That
also happens to be the crux of the recent trend towards
[microservices](http://en.wikipedia.org/wiki/Microservices).

Containers are no silver bullet, however. Breaking an existing
application's composition and deployment into a collection of containers
requires that you think carefully about how you deploy and configure your
applications. For example, instead of building a VM and provisioning it
with [Ansible](http://www.ansible.com/) to make it ready to execute your
code, you might need to think about how to pass an app's configuration to
it at runtime with some combination of environment variables and
volume-mapped configuration files, or perhaps you need some scripting so
that the container can bootstrap itself if necessary. For example, the
official MariaDB container contains an [entrypoint
script](https://github.com/docker-library/mariadb/blob/master/docker-entrypoint.sh)
that will create an installation, database, and user when first run.

If you haven't tried Docker yet, see their [10-minute interactive
tutorial](https://www.docker.com/tryit/).
