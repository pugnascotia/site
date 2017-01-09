---
title: Internet Explorer ignores fonts over SSL
date: 2016-01-19
layout: Post
---

*This post first appeared at [Black Pepper Software](https://www.blackpepper.co.uk/blog/ie-ignores-fonts-over-ssl)*

So we hit an interesting issue today - Internet Explorer 11 wouldn't load fonts
via a [Spring Boot](http://projects.spring.io/spring-boot/) application, but
only when Nginx was being used as a proxy.  IE would request the font file e.g.
a [WOFF](https://en.wikipedia.org/wiki/Web_Open_Font_Format) file, then seem to
ignore it and try another e.g. a [TTF](https://en.wikipedia.org/wiki/TrueType)
and [EOT](https://en.wikipedia.org/wiki/Embedded_OpenType), and finally give
up, meaning our [Bootstrap
icons](http://getbootstrap.com/components/#glyphicons) weren't being displayed.
After a lot of head scratching and comparing headers between Spring and Nginx,
we found that what made the difference was whether
[SSL](https://en.wikipedia.org/wiki/SSL) was used or not.  Fetching fonts from
Nginx without SSL worked fine.

A quick google turned up [a relevant Stackoverflow
answer](http://stackoverflow.com/a/18200121). It turns out when IE fetches a
font over SSL, if the [cache
headers](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching?hl=en)
state that the font should not be cached, then IE will simply ignore the font .
The component responsible for adding the cache headers is [Spring
Security](http://projects.spring.io/spring-security/) - you can tell Spring
Security to avoid handling matching resource requests at all (and therefore
avoid adding caching headers) with e.g.:

```java
@Configuration
@Order(SecurityProperties.ACCESSOVERRIDEORDER)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/fonts/*");
    }

    // rest of config...
  }
```

If you then want to then allow resources to be cached, you could use a
[WebMvcConfigurerAdapter](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/servlet/config/annotation/WebMvcConfigurerAdapter.html),
e.g.:

```java
@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/fonts/**").setCachePeriod(3600);
    }
}
```

While we can hope that [Microsoft's Edge
browser](https://www.microsoft.com/en-gb/windows/microsoft-edge) will
eventually bring resolve these kinds of issues, for anyone supporting older
versions of IE (and that's pretty much everyone) it's important to be aware of
these kinds of issues, and even more important, to test your code!
