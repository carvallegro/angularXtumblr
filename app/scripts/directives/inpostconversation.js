'use strict';

/**
 * @ngdoc directive
 * @name myTumblrApp.directive:inPostConversation
 * @description
 * # inPostConversation
 */
angular.module('myTumblrApp').directive('inPostConversation', function () {
    return {
      template: '{{$parent.post.title}}' +
                '<div ng-repeat="c in $parent.post.conversation"><b>{{c.name}} :</b> {{c.phrase}}</div>',
      restrict: 'E',
      scope: {
         post: '=post'
      }
    };
  });
