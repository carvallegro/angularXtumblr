'use strict';

/**
 * @ngdoc directive
 * @name myTumblrApp.directive:inPostVideo
 * @description
 * # inPostVideo
 */
angular.module('myTumblrApp').directive('inPostVideo', function() {
  return {
    template: '<div class="video-content">' +
              '  <div class="v-content">' +
              '    <div class="video" ng-bind-html="$parent.post.player"></div>' +
              '  </div> ' +
              '  <div class="v-infos">' +
              '    <div class="v-infos-cont">' +
              '      <div class="hashtag-section">' +
              '        <span ng-repeat="h in $parent.post.tags">#{{h}}</span> ' +
              '      </div>' +
              '      <p class="subtitle caption" ng-bind-html="$parent.post.caption"></p>' +
              '    </div> ' +
              '  </div> ' +
              '</div> ',
    restrict: 'E',
    scope: {
      post: '='
    },
    compile: function(scope, element) {
      angular.element(element).ready(function() {
        // var iframe = angular.element(this).find('.video');
        // console.log (angular.element(iframe).html());
        // console.log(scope.post.player);
      });
      // .attr('height', '100%').attr('width', '100%')
    }
  };
});
