'use strict';

/**
 * @ngdoc directive
 * @name myTumblrApp.directive:inPostVideo
 * @description
 * # inPostVideo
 */
angular.module('myTumblrApp').directive('inPostVideo', function () {
    return {
      template: '<div class="video" ng-bind-html="$parent.post.player"></div>',
      restrict: 'E',
      scope: {
         post: '='
      },
      link: function (scope, element) {
        angular.element(element).find('iframe').prop('height', '100%').prop('width', '100%');
      }
    };
  });
