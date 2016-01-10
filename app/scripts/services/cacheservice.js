'use strict';

/**
 * Service permettant d'accéder au cache pour le tumblr avec le registre des posts
 * en cache et en playlist.
 * @ngdoc service
 * @name myTumblrApp.cacheService
 * @description
 * # cacheService
 * Service in the myTumblrApp.
 */
angular.module('myTumblrApp').service('cacheService', ['$cacheFactory', function ($cacheFactory) {
    var TRASH = "trash-cache";
    var PLAYLIST = "playlist-cache";

    var tumblrCache = $cacheFactory('tumblr-' + loadedData.userID + '-cache');
    var trashList = {};
    var playList = {};

    this.construct = function () {
        trashList = tumblrCache.get(TRASH);
        if (typeof trashList == 'undefined') {
            trashList = {};
        }

        playList = tumblrCache.get(PLAYLIST);
        if (typeof playList == 'undefined') {
            playList = {};
        }
    };

    this.save = function () {
        tumblrCache.put(TRASH);
        tumblrCache.put(PLAYLIST);
    };

    this.isTrashCached = function (idPost) {
        return (typeof trashList != 'undefined' && typeof trashList[idPost] != 'undefined');
    };

    this.isPlaylistCached = function (idPost) {
        return (typeof playList != 'undefined' && typeof playList[idPost] != 'undefined');
    };

    this.addToTrash = function (idPost) {
        trashList[idPost] = true;
        this.save();
    };

    this.addToPlaylist = function (idPost) {
        playList[idPost] = true;
        this.save();
    };

    this.removeFromTrash = function (idPost) {
        if (typeof trashList[idPost] == 'undefined') return;
        delete trashList[idPost];
        this.save();
    }

    this.removeFromPlaylist = function (idPost) {
        if (typeof playList[idPost] == 'undefined') return;
        delete playList[idPost];
        this.save();
    }
}]);