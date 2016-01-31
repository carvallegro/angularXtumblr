'use strict';

/**
 * @ngdoc directive
 * @name myTumblrApp.directive:inPostConversation
 * @description
 * # inPostConversation
 */
angular.module('myTumblrApp').directive('inPostConversation', function () {
    return {
      template: '<div class="hashtag-section">'+
                '<span ng-repeat="h in $parent.post.tags">#{{h}}</span>' +
                '</div>'+
                '<h3 class="conv-title">{{$parent.post.title}}</h3>' +
                '<div ng-repeat="c in $parent.post.conversation" class="subtitle conv">{{c.name}} : {{c.phrase}}</div>',
      restrict: 'E',
      scope: {
         post: '=post'
      }
    };
  });
