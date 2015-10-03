'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Buckets = new Module('buckets');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Buckets.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Buckets.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Buckets.menus.add({
    title: 'buckets example page',
    link: 'buckets example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Buckets.aggregateAsset('css', 'buckets.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Buckets.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Buckets.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Buckets.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Buckets;
});
