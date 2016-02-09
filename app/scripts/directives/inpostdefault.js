'use strict';

/**
 * @ngdoc directive
 * @name myTumblrApp.directive:inPostDefault
 * @description
 * # inPostDefault
 */
angular.module('myTumblrApp').directive('inPostDefault', function () {
    return {
      template: '<div class="hashtag-section">'+
                '<span ng-repeat="h in $parent.post.tags">#{{h}}</span>' +
                '</div>'+
                '<h3 class="default">{{$parent.post.title}}</h3>' +
                '<div class="subtitle default" ng-bind-html="$parent.post.body"></div>', 
      restrict: 'E',
      scope: {
         post: '='
      }
    };
  });
