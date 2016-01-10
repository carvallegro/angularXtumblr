'use strict';

/**
 * @ngdoc directive
 * @name myTumblrApp.directive:inPostVideo
 * @description
 * # inPostVideo
 */
angular.module('myTumblrApp').directive('inPostVideo', function () {
    return {
      template: '{{$parent.post.caption}} - {{$parent.post.url}}' +
                '<div ng-bind-html="$parent.post.player250"></div>',
      restrict: 'E',
      scope: {
         post: '='
      }
    };
  });
