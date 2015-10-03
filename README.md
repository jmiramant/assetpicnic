## Asset Picnic

## Prerequisite packages

* Mean currently works with either grunt or gulp..
```
$ npm install -g gulp
// and bower
$ npm install -g bower
```

## Installation
To start with MEAN install the `mean-cli` package from NPM.
This will add the *mean* command which lets you interact (install, manage, update ...) your Mean based application.

### Install the MEAN CLI

```bash
$ npm install -g mean-cli
$ mean init <myApp>
$ cd <myApp> && npm install
```

### Invoke node with a task manager
Mean supports the gulp task runner for various services which are applied on the code.
To start your application run -
```bash
$ gulp
```

Alternatively, when not using `gulp` (and for production environments) you can run:
```bash
$ node server
```
Then, open a browser and go to:
```bash
http://localhost:3000
```
## Technologies

### The MEAN stack

MEAN is an acronym for *M*ongo, *E*xpress.js , *A*ngular.js and *N*ode.js

<dl class="dl-horizontal">
<dt>MongoDB</dt>
<dd>Go through MongoDB Official Website and proceed to its Great Manual, which should help you understand NoSQL and MongoDB better.</dd>
<dt>Express</dt>
<dd>The best way to understand express is through its Official Website, particularly The Express Guide; you can also go through this StackOverflow thread for more resources.</dd>
<dt>AngularJS</dt>
<dd>Angular's Official Website is a great starting point. CodeSchool and google created a <a href="https://www.codeschool.com/courses/shaping-up-with-angular-js">great tutorial</a> for beginners, and the angular videos by <a href="https://egghead.io/">Egghead</a>.</dd>
<dt>Node.js</dt>
<dd>Start by going through Node.js Official Website and this StackOverflow thread, which should get you going with the Node.js platform in no time.</dd>
</dl>

### Additional Tools
* <a href="http://mongoosejs.com/">Mongoose</a> - The mongodb node.js driver in charge of providing elegant mongodb object modeling for node.js
* <a href="http://passportjs.org/">Passport</a> - An authentication middleware for Node.js which supports authentication using a username and password, Facebook, Twitter, and more.
* <a href="http://getbootstrap.com/">Twitter Bootstrap</a> - The most popular HTML, CSS, and JS framework for developing responsive, mobile first projects.
* <a href="http://angular-ui.github.io/bootstrap/">UI Bootstrap</a> - Bootstrap components written in pure AngularJS

**Server**

Packages are registered in the **app.js**
Defines package name, version and `mean=true` in the **package.json**

All of the Server side code resides in the `/server` directory.

    Server
    --- config        # Configuration files
    --- controllers   # Server side logic goes here
    --- models        # Database Schema Models
    --- routes        # Rest api endpoints for routing
    --- views         # Swig based html rendering

**Client**

All of the Client side code resides in the `/public` directory.

    public
    --- assets        # JavaScript/CSS/Images (not aggregated)
    --- controllers   # Angular controllers
    --- config        # Contains routing files
    --- services      # Angular services (also directive and filter folders)
    --- views         # Angular views

All JavaScript within `public` is automatically aggregated with the exception of files in `public/assets`, which can be manually added using the `aggregateAsset()` function.

Files within the `public` directory of the package can be accessed externally at `/[package-name]/path-to-file-relative-to-public`. For example, to access the `Tokens` Angular controller, `tokens/controllers/tokens.js`.

###Registering a Package

In order for a Package to work it needs to be registered. By doing this you make the package system aware that you are ready and that other packages are able to depend on you. The packages are registered from within `app.js`.

When registering you are required to declare all your dependencies in order for the package system to make them available to your package.

```javascript
// Example of registering the MyPackage
MyPackage.register(function(app, auth, database) {
  // ...

});
```
This app has 3 pre registered dependencies:
  - `app` Makes the express app available .
  - `auth` Includes some basic authentication functions
  - `database` Contains the Mongoose database connection

> All dependencies specified must be registered in order to use them

###Express Routes
All routing to server side controllers is handled by express routes. The package system uses the typical express approach. The package system has a route function that passes along the package object to the main routing file typically `server/routes/myPackage.js`

  By default the Package Object is passed to the routes along with the other arguments
  `MyPackage.routes(app, auth, database);`


Example from the `server/routes/myPackage.js`

```javascript
// The Package is past automatically as first parameter
module.exports = function(MyPackage, app, auth, database) {

  // example route
  app.get('/myPackage/example/anyone', function (req,res,next) {
    res.send('Anyone can access this');
  });
};
```

###Angular Routes
The angular routes are defined in `public/routes/myPackage.js`. Just like the latest version of mean, the packages  use the `$stateProvider`

```javascript
$stateProvider
  .state('myPackage example page', {
    url: '/myPackage/example',
    templateUrl: 'myPackage/views/index.html'
  });
```

> The angular views are publically accessible via templateUrl when
> prefixed with the package name

###Menu System

Packages are able to hook into an existing menu system and add links to various menus integrated within Mean.

Each link specifies its `title`, `template`, `menu` and `role` that is allowed to see the link. If the menu specified does not exist, a new menu will be created. The menu object is made accessible within the client by means of a *menu angular service* that queries the menu controller for information about links.

Below is an example how to add a link to the main menu from `app.js`

```javascript
//We are adding a link to the main menu for all authenticated users
MyPackage.menus.add({
  title: "myPackage example page",
  link: "myPackage example page",
  roles: ["authenticated"],
  menu: "main"
});
```
###Html View Rendering
The packages come built in with a rendering function allowing packages to render static html. The default templating engine is *swig*. The views are found in `server/views` of the package and should end with the `.html` suffix

Below is an example rendering some simple html

```javascript
app.get('/myPackage/example/render', function (req,res,next) {
  MyPackage.render('index', {packageName:'myPackage'}, function (err, html) {
    //Rendering a view from the Package server/views
    res.send(html);
  });
});
```

###Overriding the default layouts
One is able to override the default layout of the application through a custom package.

Below is an example overriding the default layout of system and instead using the layourts found locally within the package

```javascript
MyPackage.register(function(system, app) {
  app.set('views', __dirname + '/server/views');
  // ...
```

> Please note that the package must depend on `System` to ensure it is
> evaluated after `System` and can thus override the views folder

### Overriding views
You may override public views used by certain core packages.  To create a custom home page, you would create a custom package and modify the script in it's public folder like so:

```javascript
angular.module('mean.mycustompackage', ['mean.system'])
.config(['$viewPathProvider', function($viewPathProvider) {
  $viewPathProvider.override('system/views/index.html', 'mycustompackage/views/myhomepage.html');
}]);
```

This will render *mycustompackage/views/myhomepage.html* as the home page.

### Environmental Settings

There is a shared environment config: __all__

* __root__ - This the default root path for the application.
* __port__ - DEPRECATED to __http.port__ or __https.port__.
* __http.port__ - This sets the default application port.
* __https__ - These settings are for running HTTPS / SSL for a secure application.
* __port__ - This sets the default application port for HTTPS / SSL. If HTTPS is not used then is value is to be set to __false__ which is the default setting. If HTTPS is to be used the standard HTTPS port is __443__.
* __ssl.key__ - The path to public key.
* __ssl.cert__ - The path to certificate.

There are three environments provided by default: __development__, __test__, and __production__.
Each of these environments has the following configuration options:

* __db__ - This is where you specify the MongoDB / Mongoose settings
* __url__ - This is the url/name of the MongoDB database to use, and is set by default to __mean-dev__ for the development environment.
* __debug__ - Setting this option to __true__ will log the output all Mongoose executed collection methods to your console.  The default is set to __true__ for the development environment.
* __options__ - These are the database options that will be passed directly to mongoose.connect in the __production__ environment: [server, replset, user, pass, auth, mongos] (http://mongoosejs.com/docs/connections.html#options) or read [this] (http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html#mongoclient-connect-options) for more information.
* __app.name__ - This is the name of your app or website, and can be different for each environment. You can tell which environment you are running by looking at the TITLE attribute that your app generates.
* __Social OAuth Keys__ - Facebook, GitHub, Google, Twitter. You can specify your own social application keys here for each platform:
  * __clientID__
  * __clientSecret__
  * __callbackURL__
* __emailFrom__ - This is the from email address displayed when sending an email.
* __mailer__ - This is where you enter your email service provider, username and password.

To run with a different environment, just specify NODE_ENV as you call gulp:
```bash
$ NODE_ENV=test gulp
```
If you are using node instead of gulp, it is very similar:
```bash
$ NODE_ENV=test node server
```
To simply run tests
```bash
$ npm test
```
