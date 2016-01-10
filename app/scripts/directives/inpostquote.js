'use strict';

/**
 * @ngdoc directive
 * @name myTumblrApp.directive:inPostQuote
 * @description
 * # inPostQuote
 */
angular.module('myTumblrApp').directive('inPostQuote', function () {
    return {
      template: '{{$parent.post.text}} - {{$parent.post.source}}',
      restrict: 'E',
      scope: {
         post: '='
      }
    };
  });
