'use strict';

/**
 * @ngdoc directive
 * @name myTumblrApp.directive:inPostDefault
 * @description
 * # inPostDefault
 */
angular.module('myTumblrApp').directive('inPostDefault', function () {
    return {
      template: '{{$parent.post.title}} -' +
                '<div ng-bind-html="$parent.post.body"></div>',
      restrict: 'E',
      scope: {
         post: '='
      }
    };
  });
