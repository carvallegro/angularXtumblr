'use strict';

/**
 * @ngdoc directive
 * @name myTumblrApp.directive:inPostAudio
 * @description
 * # inPostAudio
 */
angular.module('myTumblrApp').directive('inPostAudio', function () {
    return {
      template: '{{$parent.post.artist}} - {{$parent.post.album}} - {{$parent.post.title}} - {{$parent.post.caption}} - {{$parent.post.url}} - {{$parent.post.plays}}' +
                '<div ng-bind-html="$parent.post.embed"></div>',
      restrict: 'E',
      scope: {
         post: '='
      }
    };
  });
