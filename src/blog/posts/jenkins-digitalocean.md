---
title: DigitalOcean and Jenkins
date: 2015-07-15
layout: Post
---

*This post first appeared at [Black Pepper
Software](https://www.blackpepper.co.uk/blog/jenkins-digitalocean)*

We recently decided to look into using a cloud provider for running our
continuous integration builds. We already use
[Jenkins](https://jenkins-ci.org/), so it made sense to try and extend that
first.

These days there are many cloud providers, offering a range of provisioning
models and price plans. One such provider is
[DigitalOcean](https://www.digitalocean.com/), whose “droplets” offer a
quick and easy way to get a pre-configuring machine up and running.  I spun
up a Docker-flavoured droplet and ran the [official Jenkins Docker
container](https://registry.hub.docker.com/_/jenkins/). After performing
the usual Jenkins first-time setup, I installed the DigitalOcean plugin via
the "Manage Plugins" page, then tried to configure a "Cloud" for
DigitalOcean.

That's when things got tricky. DigitalOcean have versions 1 and 2 of their
[API](https://developers.digitalocean.com/documentation/v2/), and the
plugin only supported v1, which will be retired shortly.  However, the
plugin uses a [Java API
library](https://github.com/jeevatkm/digitalocean-api-java) to do the
actual communication with DigitalOcean, and a newer version was available
that supported v2. So I rolled up my sleeves and updated the plugin. You
can checkout the fork from [our GitHub
account](https://github.com/BlackPepperSoftware/digitalocean-plugin), but a
pull request has already been accepted into the main repository and will
eventually see an official release. In the meantime, you can easily
checkout the source, build it and upload the plugin file to Jenkins. Go
open source!

Leaving aside the plugin rework, the whole process was pretty simple, and
being able to spin up and down Jenkins agents is great - we can save money
by not running machines 24x7, and we can increase our capacity as
necessary. Agility at its best :-)
