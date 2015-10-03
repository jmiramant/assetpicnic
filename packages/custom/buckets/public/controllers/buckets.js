'use strict';

/* jshint -W098 */
angular.module('mean.buckets').controller('BucketsController', ['$scope', 'Global', 'Buckets',
  function($scope, Global, Buckets) {
    $scope.global = Global;
    $scope.package = {
      name: 'buckets'
    };
  }
]);
