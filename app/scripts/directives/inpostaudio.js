'use strict';

/**
 * @ngdoc directive
 * @name myTumblrApp.directive:inPostAudio
 * @description
 * # inPostAudio
 */
angular.module('myTumblrApp').directive('inPostAudio', function () {
    return {
      template: '<div ng-bind-html="$parent.post.embed"></div>',
      restrict: 'E',
      scope: {
         post: '='
      }
    };
  });
