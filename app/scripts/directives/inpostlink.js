'use strict';

/**
 * @ngdoc directive
 * @name myTumblrApp.directive:inPostLink
 * @description
 * # inPostLink
 */
angular.module('myTumblrApp').directive('inPostLink', function () {
    return {
      template: '{{$parent.post.title}} - {{$parent.post.description}} - {{$parent.post.link}}',
      restrict: 'E',
      scope: {
         post: '='
      }
    };
  });
