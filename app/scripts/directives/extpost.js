'use strict';

/**
 * @ngdoc directive
 * @name myTumblrApp.directive:extPost
 * @description
 * # extPost
 */
angular.module('myTumblrApp').directive('extPost', function () {
     return {
      template: '<li id="{{$post.id}}"> ' +
      			' <p>{{post.type}} - {{post.date}} - {{post.tags}} - {{post.reblog}}' +
                '    <input type="checkbox" ng-model="post.isTrash" ng-change="trash(post.id)">Montrer</p>' +
                '    <div ng-include="post.type">' +
                ' </p></li>',
      restrict: 'E',
      scope: {
         post: '=post'
      }
      // link: function postLink(scope, element, attrs) {
      //   element.text('this is the postDefault directive');
      // }
    };
  });
