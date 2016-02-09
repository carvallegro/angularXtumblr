'use strict';
// jscs:disable
/**
 * Tumblr Service
 *
 * Utilisé pour aller chercher les informations générales
 * sur la page ainsi que les différents posts.
 *
 * @ngdoc service
 * @name myTumblrApp.tumblrService
 * @description
 * # tumblrService
 * Service in the myTumblrApp.
 */
angular.module('myTumblrApp').service('tumblrService', function () {
    //https://www.tumblr.com/docs/en/api/v1

    /**
     * Va chercher les posts à partir du numéro start et en
     * ramène num (éléments de params). Quand la requête ajax est validée,
     * alors on éxecute successCallback
     */
    this.posts = function (params, successCallback) {
        jQuery.ajax({ // jshint ignore:line
            url: loadedData.tumblrURL,  // jshint ignore:line
            dataType: 'script',
            data: params,
            error: loadedData.ajaxError, // jshint ignore:line
            success: function (data, textStatus, jqXHR) { // jshint ignore:line
                successCallback(tumblr_api_read.posts); // jshint ignore:line
            }
        });
    };

    /**
     * Va chercher les informations du tumblr et aucun post.
     * Quand la requête ajax est validée, alors on éxecute successCallback
     */
    this.info = function (successCallback) {
        jQuery.ajax({ // jshint ignore:line
            url: loadedData.tumblrURL, // jshint ignore:line
            dataType: 'script',
            data: {
                start: 0,
                num: 0
            },
            error: loadedData.ajaxError, // jshint ignore:line
            success: function (data, textStatus, jqXHR) { // jshint ignore:line
                successCallback(tumblr_api_read.tumblelog); // jshint ignore:line
            }
        });
    };
});
// jscs:enable

/*var tumblr = $http.get('https://carvallegro.tumblr.com/api/read/json', {
        dataType : 'script/javascript',
        withCredentials: true,
        params : {
            start: ajaxParam.start,
            num: ajaxParam.num},
        headers: {
            'Accept': 'application/json, text/javascript',
            'Content-Type': 'application/json; charset=utf-8'
        },
    });
    tumblr.success(function(data, status, headers, config) {
        console.log (data);
        console.log (tumblr_api_read);
    });
    tumblr.error(function(data, status, headers, config) {
        console.error("AJAX failed!");
    });*/
