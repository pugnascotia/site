---
title: Harness client-side JavaScript workflows with Spring, React and Webpack
date: 2015-12-09
layout: Post
---

*This post first appeared at [Black Pepper
Software](https://www.blackpepper.co.uk/blog/js-java-webpack-workflow)*


[A recent presentation by Sébastien
Deleuze](https://speakerdeck.com/sdeleuze/isomorphic-templating-with-spring-boot-nashorn-and-react)
showed how to get a Spring Java application to render
[React](https://facebook.github.io/react/) components on the server, resulting
in an isomorphic, or universal, application that renders identically both in a
browser and on the server. You can look at the [project on
GitHub](https://github.com/sdeleuze/spring-react-isomorphic).

This is great, but the state of JavaScript front-end development is far ahead
of this. One example is [Webpack](https://webpack.github.io/), which describes
itself as a module bundler.  Essentially, it takes your JavaScript code and
turns it into a single bundle of code, along with all its dependencies, be they
[CommonsJS](http://www.commonjs.org/) or
[AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md). This makes it
easier to ship your front-end code because you only have a single file to
import into the browser.  Webpack also supports advanced features such as
hot-reloading of changed code, code-splitting and on-demand loading, loaders
for CSS, LESS, and more. Webpack can massively speed up the cycle time of
making code changes and seeing the effect in the browser. You can also use it
with [BabelJS](https://babeljs.io/), allowing you to use newer syntax in your
JavaScript and still support older client browsers.

In this post, we take Sébastien Deleuze's repository and integrate Webpack
step-by-step. That will give us a single file of code that we can use on both
the client and server, which contains any package dependencies we care to
import. If you get stuck, you can refer to [my fork of the
repository](https://github.com/pugnascotia/spring-react-isomorphic) with all
the changes.

Once last thing before we start - make sure you have the [very latest version of
Java](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
installed. You can check with:

```sh
java -version
```

Build 1.8.045 _won't work_, you _must_ have 1.8.065 or later.

   1. Start by cloning the repository:

      ```sh
      git clone https://github.com/sdeleuze/spring-react-isomorphic.git
      cd spring-react-isomorphic
      ```

   2. It doesn't come with any node packaging, so let's create a new package. You can just accept all the default suggestions for the questions.

      ```sh
      npm init
      ```

   3. At a minimum, we'll need React, Babel (so that we can use ES6 syntax while still supporting older browsers) and Webpack, so let's install those:

      ```sh
      npm install --save-dev react react-dom babel-core@5.x babel-loader@5.x webpack
      ```

   4. Modify the scripts section of package.json to make it easier to run webpack:

      ```json
      "scripts": {
          ...
          "webpack": "webpack"
      }
      ```

   5. Next we need to create webpack.config.js. This is just a Node module, not
      JSON, so we can write pretty much whatever we want, so long as we export the
      config at the end. The following is a very basic example:

      ```js
      var path = require('path');
      var ROOT = path.resolve(__dirname, 'src/main/resources/static');
      var SRC  = path.resolve(ROOT, 'jsx');
      var DEST = path.resolve(ROOT, 'output');

      module.exports = {
          entry: SRC,
          resolve: {
              extensions: ['', '.js', '.jsx' ]
          },
          output: {
              path: DEST,
              filename: 'bundle.js',
              publicPath: '/output/'
          },
          module: {
              loaders: [
                  {
                      test: /.jsx?$/,
                      loaders: ['babel'],
                      include: SRC
                  }
              ]
          }
      };
      ```

   6. We could try running Webpack now, but there's a problem - Webpack will
      look for a file called index, possibly with .js or .jsx extensions, and
      it won't find it. Rather than reconfiguring Webpack, we'll rename client.js:

      ```sh
      git mv src/main/resources/static/jsx/client.js src/main/resources/static/jsx/index.js
      ```

   7. We can now run webpack:
      ```sh
      npm run webpack
      ```

   8. We have now created `src/main/resources/static/output/bundle.js`, but
      if we look at it, the file only contains `index.js`, along with the
      webpack infrastructure code. Where is the rest of it? The problem
      is that webpack relies on the NodeJS module mechanism to find and
      bundle dependencies, and our code isn't using it at all. We can fix
      that though - first edit `comment-form.js` and add the following at
      the start and end. Note that we're using [ES6 import
      syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
      here.

      ```js
      import React from 'react';

      // rest of file

      module.exports = CommentForm;
      ```

   9. Next, edit `comment-list.js`;

      ```js
      import React from 'react';
      import Comment from './comment';

      // rest of file

      module.exports = CommentList;

   10. Next, edit `comment.js`:

      ```js
      import React from 'react';

      // rest of file

      module.exports = Comment;
      ```

   11. Finally, edit `index.js`:
      ```js
      import React from 'react';
      import CommentForm from './comment-form';
      import CommentList from './comment-list';

      // rest of file
      ```

   12. If we run webpack again now, we can see that it's pulled in loads of
       code. Great! But there's a problem. If you examine the code
       carefully, you'll see that all it's essentially doing is defining an
       anonymous function and immediately invoking it over a number of
       arguments. How do we get access to our code, so that we can use it
       from a template in Spring? Executing it in a browser will be OK -
       the contents of `index.js` can just be executed to update the DOM, but
       this bundle must also function as a library, in the sense that our
       [EJS](http://www.embeddedjs.com/) (JavaScript template) can make
       calls into it when Spring renders the page template. The solution is
       threefold - firstly, we need to make our code safe to execute on
       both the client and the server (the original project doesn't include
       `client.js` (now `index.js`) when it constructs the JavaScript template
       engine). Secondly, we need to structure to expose functions to an
       external caller. Finally, we generate a webpack bundle in a
       "library" format.

   13. In order to make our code safe to run on the server, we need to
       protect the calls to `React.render()`. Change `index.js` as follows,
       so that we only directly invoke React if we're running in a browser:
       
       ```js
       if (typeof window !== 'undefined') {
         React.render(<CommentForm onCommentSubmit={ function(comment) {
           $.post('/', comment, null, 'json');
         } }/>, document.getElementById("navbar"));
       
         $.getJSON('/', function( data ) {
             React.render(<CommentList comments={ data }/>, document.getElementById("comments"));
         });
       }
       ```

   14. Next, we need to add entrypoints to our code. To do this, we'll take
       the JavaScript snippets from
       `src/main/resources/static/templates/index.ejs` and turn them into
       exported functions. Create the following functions in `index.js`,
       and export them as shown:

       ```js
       // rest of file...

       function renderCommentList(comments) {
         return React.renderToString(React.createElement(CommentList, { comments: comments} ));
       }

       function renderCommentForm() {
         return React.renderToString(React.createElement(CommentForm));
       }

       module.exports = {
         renderCommentList: renderCommentList,
         renderCommentForm: renderCommentForm
       };
       ```

   15. Having added entrypoints into our code, we can edit the EJS template
       to call them, instead of making React calls. Update the script
       imports in `index.ejs` to remove React and all the individual
       components and replace them all with our bundle. This will make
       `MyApp` available. Make sure you keep jQuery and Bootstrap though:

       ```html
       <script src="lib/js/jquery.min.js"></script>
       <script src="lib/js/bootstrap.min.js"></script>
       <script src="output/bundle.js"></script>
       ```

       Then change `index.ejs` as follows (we'll define `MyApp` in a moment):
       ```html
       ...
       <div id="navbar" class="navbar-collapse collapse">
           <%= MyApp.renderCommentForm() %>
       </div>
       ...
       <div id="comments" class="row"%>
           <% MyApp.renderCommentList(comments) %>
       </div>
       ...
       ```

   16. Webpack has the concept of bundling code as a "library", which is
       really just adjusting the final bundle so that it returns the
       appropriate object when executed, or creates a variable with a
       specific name that contains the exported functions. This is exactly
       what we'll do - we just have specify the name, and we do this by
       adding the
       "[library](https://webpack.github.io/docs/library-and-externals.html)"
       key into our `webpack.config.js`. The value you supply is the
       variable name that the JavaScript interpreter in Spring will see.

       ```js
         ...
         output: {
             path: DEST,
             filename: 'bundle.js',
             publicPath: '/output/',
             library: 'MyApp'
         },
         ...
       ```

   17. Run webpack again. This time we should have something we can load,
       and we can test this using Java 8's own JavaScript
       [interpreter](http://www.oracle.com/technetwork/articles/java/jf14-nashorn-2126515.html)
       as follows. Note that in order to do this, you'll also need to load
       the polyfill supplied with Sébastien's project.

       ```sh
       $ jjs
       jjs> load('./src/main/resources/static/polyfill.js')
       function print() { [native code] }
       jjs> load('./src/main/resources/static/output/bundle.js')
       jjs> MyApp
       [object Object]
       jjs> Object.keys(MyApp)
       commentList,commentForm
       ```

   18. Before we go further, you need to check that `polyfill.js` defines
       `console.error`. If it doesn't, you'll get weird execution errors
       when you try to call your exported functions outside of a browser
       (or NodeJS, for that matter), so update the file if necessary. You
       want to see:

       ```js
       var global = this;
       var console = {};
       console.debug = print;
       console.warn = print;
       console.log = print;
       console.error = print;
       ```

   19. You can also prove that you can call your exported methods (you can
       ignore the warning - it's telling us that we ought to be calling
       React a bit differently, but updating it is outside the scope of
       this post):

       ```html
       jjs> Test.commentForm()
       Warning: React.renderToString is deprecated. Please use ReactDOMServer.renderToString from require('react-dom/server') instead.
       <form class="navbar-form navbar-right" data-reactid=".1tyhxznik5" data-react-checksum="-1307205332"><div class="form-group" data-reactid=".1tyhxznik5.0"><input placeholder="Your name" class="form-control" data-reactid=".1tyhxznik5.0.0"/></div><div class="form-group" data-reactid=".1tyhxznik5.1"><input placeholder="Say something..." class="form-control " data-reactid=".1tyhxznik5.1.0"/></div><button type="submit" class="btn btn-success" data-reactid=".1tyhxznik5.2">Post comment</button></form>
       ```

   20. Now we're getting somewhere. The next step is to load the bundle
       instead of all the individual React resources, so let's edit
       `IsomorphicApplication.java` to set the correct scripts:

       ```java
       @Bean
       public ScriptTemplateConfigurer reactConfigurer() {
           ScriptTemplateConfigurer configurer = new ScriptTemplateConfigurer();
           configurer.setEngineName("nashorn");
           configurer.setScripts(
               "static/polyfill.js",
               "static/lib/js/ejs.min.js",
               "static/render.js",
               "static/output/bundle.js");
           configurer.setRenderFunction("render");
           configurer.setSharedEngine(false);
           return configurer;
       }
       ```

   21. Almost there. Modify `build.gradle` to call npm instead of
       processing React files itself, by following the editing directives
       in the following:

       ```gradle
       buildscript {
         ext {
           springBootVersion = '1.3.0.RELEASE'
         }
         repositories {
           mavenLocal()
           mavenCentral()

           // ADD THESE 3 LINES:
           maven {
             url "https://plugins.gradle.org/m2/"
           }
         }
         dependencies {
           classpath("org.springframework.boot:spring-boot-gradle-plugin:${springBootVersion}")
           classpath("io.spring.gradle:dependency-management-plugin:0.5.3.RELEASE")
           // ADD THIS LINE
           classpath("com.moowork.gradle:gradle-node-plugin:0.11")
         }
       }
       
       // REMOVE THESE 3 LINES
       plugins {
         id 'net.eikehirsch.react' version '0.3.1'
       }
       
       apply plugin: 'java'
       apply plugin: 'spring-boot'
       // ADD THIS LINE
       apply plugin: "com.moowork.node"
       
       jar {
         baseName = 'spring-react-isomorphic'
       }
       sourceCompatibility = 1.8
       targetCompatibility = 1.8
       
       repositories {
         mavenLocal()
         mavenCentral()
       }
       
       dependencies {
         compile("org.springframework.boot:spring-boot-starter-web")
         // REMOVE THIS LINE
         compile("org.webjars:react:0.13.1")
         testCompile("org.springframework.boot:spring-boot-starter-test")
       }
       
       jsx {
         sourcesDir = 'src/main/resources/static/jsx'
         destDir    = 'src/main/resources/static/output'
       }
       
       task wrapper(type: Wrapper) {
         gradleVersion = '2.3'
       }
       
       // REMOVE THIS LINE
       processResources.dependsOn('jsx')
       
       // ADD THE REMAINING LINES
       npm_run {
         args = ['webpack']
       }
       
       processResources.dependsOn('npminstall', 'npmrun')
       ```

   22. OK, fire it up (you'll need to [install
       gradle](https://docs.gradle.org/current/userguide/installation.html)
       if you don't already have it):

       ```sh
       gradle bootRun
       ```

   23. You could check in the browser that it's looking good, but it's more
       interesting to fetch the page on the command line - that way, you
       can be sure that there's definitely no client-side rendering
       happening:

       ```sh
       curl http://localhost:8080
       ```

## Automatic refreshing

Webpack has the ability to watch your files for changes, and automatically
apply changes in your browser, which can cut down your development cycle
time. Note that in order to use this feature, you must use a version of
Webpack that includes a Nashorn compatibility fix from me, [PR
1710](https://github.com/webpack/webpack/pull/1710). Any release later than
1.12.9 should be fine (at the time of writing, the patch has been accepted
but is awaiting release).

   1. Install `webpack-dev-server`. This is a proxy that sits between your
      browser and your server, updating the webpack bundle when files
      change, intercepting requests for the webpack bundle and prompting
      reloads when the bundle is updated.

      ```sh
      npm install --save-dev webpack-dev-server
      ```

   2. Add a script entry to package.json to run it. We use the `--inline`
      option so that the proxy is transparent (there is also an iframe
      option):

      ```js
      "scripts": {
          ...
          "webpack": "webpack",
          "watch": "webpack-dev-server --inline"
      }

   3. Configure the dev server by adding the following to
      webpack.config.js. The dev server will proxy any request not meant
      for it through to Spring:

      ```js
      {
        ...
        module: {
          ...
        },
        devServer: {
          port: 9090,
          proxy: {
              '/*': {
                  target: 'http://localhost:8080',
                  secure: false,
                  // node-http-proxy option - don't add /localhost:8080/ to proxied request paths
                  prependPath: false
              },
          },
          publicPath: 'http://localhost:9090/output/'
        }
      };
      ```

   4. Make sure the Spring server is still running, or start it if
      necessary. Then run the dev server:

      ```sh
      npm run watch
      ```

   5. Point your browser (I recommend
      [Chrome](https://www.google.com/chrome/) for this) at
      [http://localhost:9090/](http://localhost:9090). It shouldn't look
      any different yet.

   6. Edit comment.js and make a change, e.g. change the `<h2>` tags to
      `<h3>` tags, and save the file. Webpack should notice the changes and
      regenerate the bundle, and Chrome should reload automatically! (Vim
      users might want to check [this
      issue](https://github.com/nodejs/node-v0.x-archive/issues/3172) if the page doesn't update or
      updates erratically.)

      Note that React will notice any differences between the
      server-generated DOM and the DOM generated in the client. It will try
      to do the right thing, but you may see some alarming messages in your
      browser console. Thankfully, React produces descriptive errors in the
      console that actually tell you what the problem is.

## Hot Reloading

The changes above help to cut-down cycle time, but we can go one further
and have real, in-place code substitution without losing state in our
components. We'll use the
[babel-plugin-react-transform](https://github.com/gaearon/babel-plugin-react-transform)
module, which allows you to instrument React components in arbitrary ways,
and wrap our components with
[react-transform-hmr](https://github.com/gaearon/react-transform-hmr),
which implements Webpack's existing hot module reloading (HMR) support. You
can see an example of this in the
[react-transform-boilerplate](https://github.com/gaearon/react-transform-boilerplate)
project.

   1. Install the necessary modules:

      ```sh
      npm install --save-dev babel-plugin-react-transform react-transform-hmr
      ```

   2. We need to slightly change how we call webpack when generating a
      bundle for our JAR file. This is so that the HMR code isn't executed
      in Spring, as HMR in the server isn't supported and throws an
      exception. We also need to change how we start the dev server to
      enable the `HotModuleReplacementPlugin` plugin. Change `package.json` to
      set an environment variable when calling webpack, and pass an extra
      option to the dev server:

      ```js
      "scripts": {
        ...
        "webpack": "NODE_ENV=production webpack",
        "watch": "webpack-dev-server --hot --inline"
      }
      ```

   3. Create a `.babelrc` file, with the following contents. Notice that
      virtually all the configuration is inside an env block, so by setting
      `NODE_ENV` above, we control when this configuration is applied:

      ```js
      {
        "stage": 0,
        "env": {
          // only enable it when process.env.NODE_ENV is 'development' or undefined
          "development": {
            "plugins": ["react-transform"],
            "extra": {
              "react-transform": {
                "transforms": [{
                  "transform": "react-transform-hmr",
                  "imports": ["react"],
                  "locals": ["module"]
                }]
              }
            }
          }
        }
      }
      ```

   4. Rebuild and run the server, to make sure it still works.

   5. Run the Webpack server and navigate to http://localhost:9090/. You
      should open up the Chrome developer console so that you can see
      what's happening.

      ```sh
      npm run watch
      ```

   6. Edit `comment.js` and make a change. You should see Webpack applying
      the change without a full reload of the page!

There are other transforms that you could apply - for example,
[react-transform-catch-errors](https://github.com/gaearon/react-transform-catch-errors)
coupled with [redbox-react](https://github.com/KeywordBrain/redbox-react),
to display React errors as a "[red box of
death](https://www.npmjs.com/package/redbox-react)".

## Summary

In this post we took a project that rendered React in the server and
changed it to bundle the components and all required libraries into a
single artifact that can executed on both the client and the server. We
then implemented automatic reloading whenever a file is edited, then
implemented hot-updates so that our code is patched in the browser without
requiring a full page refresh.

These techniques become invaluable as the scale and complexity of an
application grows, and cuts down or eliminates much of the typical edit /
refresh / setup / test cycle during the development process.
