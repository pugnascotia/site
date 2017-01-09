---
title: Managing React state and routing in Spring
date: 2016-01-12
layout: Post
---

*This post first appeared on [Black Pepper
Software](https://www.blackpepper.co.uk/blog/spring-react-redux-routing).*

*_Note_: the demo boilerplate project has moved on significantly since this
post was first written!*

In my last React post, we took a basic isomorphic React + Java application
and changed it to use Webpack to bundle all the JavaScript. However, any
non-trivial application is going to have more than a single page. Real
applications typically have:

   * Significantly more complex state to manage and probably persist with some backend.
   * Multiple pages or views, with a hierarchy of sub-views underneath them.

These concerns are orthogonal but related, since when you have multiple
pages, you want each page to retain its state even when the corresponding
React components are unmounted. The picture is further complicated when you
involve server-side rendering, because we also need to:

   * Pass state to our components when rendering on the server
   * Pass state in a consumable format from the server to the client as
     part of the response (sometimes called "dehydrating")
   * Initialise the client's state with data from the server (sometimes called "hydrating")

In this post, I'll cover some of the issues with supporting these
requirements, and finish by demonstrating an implementation.

## Managing State

Fundamentally, sharing state between the server and the client is just
supplying appropriate data structures to the React application to
initialise itself. This is straightforward enough, but it still leaves the
question of how to then manage state in the client, and for that we'll use
[Redux](http://redux.js.org/).

### Redux

Redux is a popular state-management library, completely separate from React
but often used alongside it. It represents state using a single immutable
object tree. Instead of an application directly manipulating state, it
raises "actions" (events, essentially), which are "reduced" (in the
[functional programming
sense](https://en.wikipedia.org/wiki/Fold_(higher-order_function))) to
produce a new state tree. This fits well with React, since we can consider
a rendered React component to be the application of a function ([in the
mathematical sense](https://en.wikipedia.org/wiki/Function_(mathematics)))
of some state and properties, so when the Redux tree updates, we simply
re-render the React component. Redux has [excellent
documentation](http://redux.js.org/), and the
author, Dan Abramov, has created a [comprehensive video tutorial series on
egghead.io](https://egghead.io/series/getting-started-with-redux).

Redux is
[one](https://medium.com/@dan_abramov/the-evolution-of-flux-frameworks-6c16ad26bb31)
implementation of Facebook's [Flux](http://facebook.github.io/flux/)
pattern. It really is a pattern, rather than a framework or a library, as
it describes an approach to how data should flow through an application,
and there are multiple implementations.  Flux is an example of [Command
Query
Seperation](http://martinfowler.com/bliki/CommandQuerySeparation.html), in
that it separates reading and writing application state. It's also similar
to [Event Sourcing](http://martinfowler.com/eaaDev/EventSourcing.html),
because there are no writes to update application state. Instead, an event
is raised, perhaps with some data payload, which describes something that
has happened to the system.

### Sharing State From The Server

We somehow need to get our data on the server into Redux on the client as a
single object. The
[spring-react-isomorphic](https://github.com/pugnascotia/spring-react-isomorphic)
project from my last post uses an [EJS](http://ejs.co/) template and simply
passes data directly into individual functions to render components, but
that won't work with Redux since it needs all the state in one go. We can
reuse part of that project, however—in order for data to be supplied to EJS
when rendering the template, the render function first transforms all the
values from the Spring view model into the properties of a single object.
In other words, this object is our state!  All we need to do is serialize
it and pass it to the client.

There is a small problem, however. If we were using, say, NodeJS on the
server, we would probably just serialize the state object using
`JSON.stringify`. This function exists in Nashorn, but it doesn't handle
POJOs well (by design - see the [discussion on the nashorn-dev OpenJDK
mailing
list](http://mail.openjdk.java.net/pipermail/nashorn-dev/2013-September/002012.html)
and [this presentation, from slide
82](http://www.slideshare.net/SpringCentral/serverside-javascript-with-nashorn-and-spring)
for more). Instead, we can use
[Jackson](http://wiki.fasterxml.com/JacksonHome) for serializing to JSON.
This has the added advantage that any Jackson annotations on our data
classes (e.g. for RESTful interactions) will be respected.

You can see my [revised JavaScript render code on
GitHub](https://github.com/pugnascotia/spring-react-boilerplate/blob/master/src/main/resources/static/js/render.es6.js) (it has other
changes unrelated to Redux, which I'll cover below). It takes the model
data, serialises it with Jackson, and provides it to the EJS template under
the `json` key. It also goes further by deserializing the JSON and providing
*that* value as the model data to the template under the `data` key. The
motivation for doing this is to ensure that React is dealing only with
JavaScript values, not the Java objects passed into the Spring model. This
provides a stronger guarantee that the client and server React rendering is
the same.

Finally, the EJS template incorporates the JSON with the following. This is
picked up when the React app [executes on the
client](https://github.com/pugnascotia/spring-react-boilerplate/blob/master/src/main/js/index.js#L32).

```html
<script type="text/javascript">
window.INITIAL_STATE = <%= json %>;
</script>
```

### Sharing Authentication State

One important pieces of state that we need to share is the user's
authentication status. In a simple application, we can model this in JSON
as follows:

```js
// Anonymous user
{
  "auth": {
    "signedIn": false,
    "roles": [ "ROLE_ANONYMOUS" ]
  }
}

// Authenticated user
{
  "auth": {
    "signedIn": true,
    "roles": [ "ROLE_USER" ]
  }
}
```

So long as we always add the necessary values to our `Model` in Spring
whenever we render a view, any server-rendered page will share the current
authentication status. The client can then modify the UI according to the
user's roles. In the demo app, this is extracted to the
[State](https://github.com/pugnascotia/spring-react-boilerplate/blob/master/src/main/java/com/pugnascotia/reactdemo/utils/State.java) class.

## Page Routing

### react-router

[`react-router`](https://github.com/rackt/react-router) describes itself
as, "complete routing library for React".  From the GitHub page; "React
Router keeps your UI in sync with the URL. It has a simple API with
powerful features like lazy code loading, dynamic route matching, and
location transition handling built right in." Essentially, it lets us show
different components to the user, depending upon the URL. For a description
of routing in single-page apps, see [Routing URLs in Static Web
Apps](https://staticapps.org/articles/routing-urls-in-static-apps/).

As with Redux, plenty of examples already exist showing how to use
react-router, including [server-side
rendering](https://github.com/rackt/react-router/blob/latest/docs/guides/advanced/ServerRendering.md).
However, there are some points that we need to consider when using a Spring
backend.

### Accessing The Full Request URL

Firstly, we need to pass the requested URL to react-router in order to
render on the server. To handle this, the demo app recreates the full URL
in the
[State](https://github.com/pugnascotia/spring-react-boilerplate/blob/master/src/main/java/com/pugnascotia/reactdemo/utils/State.java)
class and puts it into the model as `__requestPath`. The double-underscore
prefix is used as a convention by the [render
function](https://github.com/pugnascotia/spring-react-boilerplate/blob/master/src/main/resources/static/js/render.es6.js),
which indicates that the value should be not be included in the application
state but instead be made available to EJS to apply in the template, in
this case as requestPath.

### Universal Routes

Secondly, in order for the application to be "universal", every route
supported by react-router must also be supported by Spring. You can see an
example of this in
[CommentController](https://github.com/pugnascotia/spring-react-boilerplate/blob/master/src/main/java/com/pugnascotia/reactdemo/comments/CommentController.java),
which supports both the `/` and the `/add` paths on the same method.

This point raises some interesting questions—for example, how much state
unrelated to the current URL should be passed to the client? A small app
could just include all required state, but this would become unwieldy for a
large app, or in fact be impossible for something like a search app. The
correct approach will depend on the complexity of the application and the
amount of state to share. Some amount of on-demand loading will likely be
necessary.

### Routing And Errors

Spring Boot provides a ["whitelabel" error
page](http://docs.spring.io/spring-boot/docs/1.3.1.RELEASE/reference/htmlsingle/#howto-customize-the-whitelabel-error-page)
for rendering [404](https://en.wikipedia.org/wiki/HTTP_404) or
[500](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#5xx_Server_Error)
responses. We could reuse this mechanism by providing an `error.ejs`
template, but then we would have no opportunity to customise the view's
model, and therefore no chance to initialize the app's state.

Instead, we can take control of the error handling by defining a controller
that implements the `ErrorController` interface and maps the `/error` request
path. This lets us continue to use a single EJS template and tailor the
model passed to the render function. In particular, we can pass the details
of the error to the Redux state object under the "errors" key (note that in
production, you'd want to be careful about [leaking implementation
details](https://www.owasp.org/index.php/Information_Leakage)).

Next we have to define a route so that react-router can handle the error.
This turns out to be as simple as specifying a wildcard route, `*`, and
telling react-router to render an
[Error](https://github.com/pugnascotia/spring-react-boilerplate/blob/master/src/main/js/components/Errors.js)
component. This component checks the Redux state for an HTTP error code,
supplied by Spring, and picks an appropriate message to render.

## Summary

This post has covered at a high-level how to put in place some of the
necessary components for a complex React application while still supporting
server-side rendering in Spring. This brings the benefits of isomorphism,
such as improved initial client-side render time and visibility of the page
to clients that can't or won't execute JavaScript.

You can see all the above in action in the
[spring-react-boilerplate](https://github.com/pugnascotia/spring-react-boilerplate/)
project on GitHub. Pull requests welcome!
