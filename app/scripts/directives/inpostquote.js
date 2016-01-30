'use strict';

/**
 * @ngdoc directive
 * @name myTumblrApp.directive:inPostQuote
 * @description
 * # inPostQuote
 */
angular.module('myTumblrApp').directive('inPostQuote', function () {
    return {
      template: '<p class="quote-text" ng-bind-html="$parent.post.text"><p>' +
                '<p class="quote-author" ng-bind-html="$parent.post.source"></p>',
      restrict: 'E',
      scope: {
         post: '='
      }
    };
  });
