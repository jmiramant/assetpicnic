'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var BucketSchema = new Schema({
  created: Date,
  updated: Date,
  category: [String],
  description: String,
  name: {
    type: String,
    required: true,
    unique: true
  }
});

mongoose.model('Bucket', BucketSchema);