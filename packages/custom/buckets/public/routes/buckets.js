'use strict';

angular.module('mean.buckets').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('buckets example page', {
      url: '/buckets/example',
      templateUrl: 'buckets/views/index.html'
    });
  }
]);
