'use strict';

/**
 * @ngdoc function
 * @name myTumblrApp.controller:UicontrollerCtrl
 * @description
 * # UicontrollerCtrl
 * Controller of the myTumblrApp
 */
angular.module('myTumblrApp').controller('UicontrollerCtrl',[ '$scope', function ($scope) {
    this.isMenuOpen=$scope.isMenuOpen=false;
  }]);
