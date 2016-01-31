'use strict';

/**
 * @ngdoc directive
 * @name myTumblrApp.directive:extPost
 * @description
 * # extPost
 */
angular.module('myTumblrApp').directive('extPost', function () {
     return {
      template: '<div class="{{post.pClass}}" id="{{post.id}}">' +
                '  <div class="content" ng-include="post.type" include-replace></div>' +
      			    '  <div class="footer">' +
                '    <span class="left">{{post.date | date:\'longDate\'}}</span>' +
                '    <span class="right">' +
                '     <a href="#"><i class="i i-mail"></i></a> ' +
                '     <a href="#"><i class="i i-facebook"></i></a> ' +
                '     <a href="#"><i class="i i-twitter"></i></a> ' +
                '    </span>' +
                '  </div>' +
                '</div>',
      restrict: 'E',
      replace: true,
      scope: {
         post : '=post'
      }
    };
  });
  // {{post.tags}} - {{post.reblog}}
  // '    <input type="checkbox" ng-model="post.isTrash" ng-change="trash(post.id)">Montrer</p>' +
  // '    <input type="checkbox" ng-model="post.isPlaylist" ng-change="playlist(post.id)">Playlist</p>' +
