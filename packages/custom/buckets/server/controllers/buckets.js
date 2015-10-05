var mongoose = require('mongoose'),
Bucket = mongoose.model('Bucket');
AWS = require('aws-sdk');

module.exports = function(Circles, app) {

    return {
        all: function (req, res, next) {
              var buckets = [];

              var credentials = {id: 'AKIAJLTXKA47KHVDLRLQ', secret: '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'};

              AWS.config.update({accessKeyId: credentials.id, secretAccessKey: credentials.secret});

              var s3 = new AWS.S3();

              s3.listBuckets(function(err, data) {
                if (err) {
                  console.log(err, err.stack);
                  res.send(err);
                } else {
                  buckets = data['Buckets'].map(function (b) {return b['Name']});
                  res.send(buckets);
                }
              });
        },
        checkAmazonAuth: function(req, res, next) {
          if ('notAuthed') {
            this.fetchBuckets();
          } else {
            this.fetchBuckets();
          }
        },

        fetchBuckets: function(req, res, next) {
            var buckets = [];

            var credentials = {id: 'AKIAJLTXKA47KHVDLRLQ', secret: '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'};

            AWS.config.update({accessKeyId: credentials.id, secretAccessKey: credentials.secret});

            var s3 = new AWS.S3();

            s3.listBuckets(function(err, data) {
              if (err) {
                console.log(err, err.stack);
                res.send(err);
              } else {
                buckets = data['Buckets'].map(function (b) {return b['Name']});
                res.send(buckets);
              }
            });
        }
    }

};