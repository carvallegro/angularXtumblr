'use strict';

/**
 * @ngdoc directive
 * @name myTumblrApp.directive:inPostQuote
 * @description
 * # inPostQuote
 */
angular.module('myTumblrApp').directive('inPostQuote', function () {
    return {
      template: '<div class="hashtag-section">'+
                '<span ng-repeat="h in $parent.post.tags">#{{h}}</span>' +
                '</div>'+
                '<h3 class="quote-text" ng-bind-html="$parent.post.text"></h3>' +
                '<p class="subtitle quote-author" ng-bind-html="$parent.post.source"></p>',
      restrict: 'E',
      scope: {
         post: '='
      }
    };
  });
