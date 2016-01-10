'use strict';

/**
 * @ngdoc directive
 * @name myTumblrApp.directive:inPostPhoto
 * @description
 * # inPostPhoto
 */
angular.module('myTumblrApp').directive('inPostPhoto', function () {
    return {
      template: '<img ng-repeat="i in $parent.post.photos" src="{{i.url75}}" height="75" />' +
                '<p ng-bind-html="$parent.post.caption"></p>',
      restrict: 'E',
      scope: {
         post: '='
      }
    };
  });
