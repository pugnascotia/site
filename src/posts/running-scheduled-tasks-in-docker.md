---
title: Running scheduled tasks in Docker
date: 2016-08-01
layout: Post
---

*This post first appeared on [Black Pepper
Software](https://www.blackpepper.co.uk/blog/running-scheduled-tasks-in-docker).*

## The Problem

The adoption rate of [Docker](https://www.docker.com/) has been phenomenal, and
in my opinion is becoming the de-facto method for packaging and distributing
applications on Linux.  However there is one area that is still more difficult
than I'd like - running programs on a schedule.

Historically the answer in UNIX environments has been to use
[`cron`](https://en.wikipedia.org/wiki/Cron). Indeed, there are a variety of
guides on the web for running cron in a container. cron is not suited to being
containerised, however:

   * It requires configuration files to specify what jobs to run
   * It records its output to log files
   * It expects to run as a demon process

Most cron containers seek to wrap up cron to satisfy the above, but it's
complicated for what we actually want with a container, which is simply:

   * Execute a program repeatedly on a schedule
   * Print all output to the console

That isn't too much to ask, is it?

## Introducting mantra

To that end, I wrote a very short program in [Go](https://golang.org/) called
[`mantra`](https://golang.org/). It uses a slightly modified version of the
excellent [`robfig/cron`](https://github.com/pugnascotia/cron) package, and
allows you to simply specify the schedule that you want and the program you
want to run on the command line. Standard output and standard error are shared
between `mantra` and the process it runs, which makes capturing output by Docker
a breeze.  Here's a simple example - echo a string every 10 seconds (this
assumes echo is available as a binary on your system):

```sh
mantra "*/10 * * * * *" echo "Hello, mantra"
```

I've released `mantra` as version 0.0.1, and I've love any and all feedback.
Raise an issue in the [Github repository](https://github.com/pugnascotia/mantra)
if you have any problems or questions.

## Other options

I intentionally haven't talked about more advanced solutions such as
[Chronos](https://mesos.github.io/chronos/) from
[Mesos](https://mesos.apache.org/), since that's overkill
for the simplest use-cases.
