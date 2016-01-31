'use strict';

/**
 * @ngdoc directive
 * @name myTumblrApp.directive:includeReplace
 * @description
 * # includeReplace
 */
angular.module('myTumblrApp')
  .directive('includeReplace', function () {
    return {
      require: 'ngInclude',
      restrict: 'A', /* optional */
      link: function (scope, el) {
          el.replaceWith(el.children());
      }
    };
  });
