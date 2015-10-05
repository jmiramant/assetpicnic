'use strict';

module.exports = function(Buckets, app, auth, database) {

  var buckets = require('../controllers/buckets')(Buckets, app);

  app.use(buckets.checkAmazonAuth);

  app.get('/api/buckets/all', buckets.all);

};
