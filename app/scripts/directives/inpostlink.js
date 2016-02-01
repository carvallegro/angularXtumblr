'use strict';

/**
 * @ngdoc directive
 * @name myTumblrApp.directive:inPostLink
 * @description
 * # inPostLink
 */
angular.module('myTumblrApp').directive('inPostLink', function () {
    return {
      template: '<div class="hashtag-section">'+
                '<span ng-repeat="h in $parent.post.tags">#{{h}}</span>' +
                '</div>'+
                '<h3 class="url"><a href="{{$parent.post.link}}"><i class="i i-link-1"></i>{{$parent.post.title}}</a></h3>' +
                '<p class="subtitle url-desc" ng-bind-html="$parent.post.description"></p>',
      restrict: 'E',
      scope: {
         post: '='
      }
    };
  });
