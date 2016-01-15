'use strict';

/**
 * Post Controller
 *
 * Gère les données du tumblr. Les infos de l'auteur et le chargement de tous les posts sur la page.
 *
 * @ngdoc function
 * @name myTumblrApp.controller:PostcontrollerCtrl
 * @description
 * # PostcontrollerCtrl
 * Controller of the myTumblrApp
 */
angular.module('myTumblrApp').controller('PostcontrollerCtrl', ['$scope', '$http', '$sce', 'tumblrService', 'cacheService', function ($scope, $http, $sce, $tumblrService, $cacheService) {
    /*
     * Array de tous les posts
     */
    var posts = $scope.posts = [];

    /*
     * Informations générales du tumblr
     */
    var title = $scope.title = "TITLE";
    var author = $scope.author = "AUTHOR";
    var description = $scope.description = "DESCRIPTION";

    /*
     * Paramètres à transférer au tumblr.
     */
    var ajaxParam = $scope.ajaxParam = {
        start: 0,
        num: 10
    };

    var endOfFeed = false;
    /*
     * Tous les types de post
     */
    var T = $scope.T = {
            conv: 'conversation',
            link: 'link',
            quote: 'quote',
            photo: 'photo',
            reg: 'regular',
            audio: 'audio',
            video: 'video',
        }
        /*
         * Récupère un post au format JSON et l'ajoute dans un 
         * format correct à l'array.
         */
    $scope.addPost = function (post) {
        var newPost = {
            id: post.id,
            isTrash: $cacheService.isTrashCached(post.id),
            isPlaylist: $cacheService.isPlaylistCached(post.id),
            date: post.date,
            tags: post.tags,
            url: post.url,
            reblog: post["reblog-key"],
            tags: post.tags
        };

        if (post.type == T.conv) {
            newPost.type = T.conv;
            newPost.title = post['conversation-title'];
            newPost.conversation = post.conversation;
        } else if (post.type == T.link) {
            newPost.type = T.link;
            newPost.title = post['link-text'];
            newPost.url = post['link-url'];
            newPost.description = post['link-description'];
        } else if (post.type == T.quote) {
            newPost.type = T.quote;
            newPost.text = post['quote-text'];
            newPost.source = post['quote-source'];
        } else if (post.type == T.photo) {
            newPost.type = T.photo;
            newPost.caption = $sce.trustAsHtml(post['photo-caption']);
            newPost.photos = [{
                offset: 'o0',
                w: post.width,
                h: post.height,
                url75: post['photo-url-75'],
                url100: post['photo-url-100'],
                url250: post['photo-url-250'],
                url400: post['photo-url-400'],
                url500: post['photo-url-500'],
                url1000: post['photo-url-1000']
            }];
            post.photos.forEach(function (data) {
                newPost.photos.push({
                    offset: data.offset,
                    w: data.width,
                    h: data.height,
                    url75: data['photo-url-75'],
                    url100: data['photo-url-100'],
                    url250: data['photo-url-250'],
                    url400: data['photo-url-400'],
                    url500: data['photo-url-500'],
                    url1000: data['photo-url-1000']
                });
            });
        } else if (post.type == T.audio) {
            newPost.type = T.audio;
            newPost.artist = post['id3-artist'];
            newPost.album = post['id3-album'];
            newPost.title = post['id3-music'];
            newPost.caption = post['audio-caption'];
            newPost.plays = post['audio-plays'];
            newPost.player = $sce.trustAsHtml(post['audio-player']);
            newPost.embed = $sce.trustAsHtml(post['audio-embed']);
        } else if (post.type == T.video) {
            newPost.type = T.video;
            newPost.caption = $sce.trustAsHtml(post['video-caption']);
            newPost.url = $sce.trustAsHtml(post['video-source']);
            newPost.player = $sce.trustAsHtml(post['video-player']);
            newPost.player500 = $sce.trustAsHtml(post['video-player-500']);
            newPost.player250 = $sce.trustAsHtml(post['video-player-250']);
        } else {
            newPost.type = T.reg;
            newPost.title = post['regular-title'];
            newPost.body = $sce.trustAsHtml(post['regular-body']);
        }

        $scope.posts.push(newPost);
    };

    /*
     * Méthode appelée au chargement de la page. 
     * Récupère les infos principales et charge les premiers posts.
     */
    $scope.init = function () {
        $cacheService.construct();
        $tumblrService.info(function (data) {
            $scope.title = data.title;
            $scope.author = data.name;
            $scope.description = data.description;
        });

    }

    /*
     * Récupère et charge les posts puis incrémente start de num.
     */
    $scope.loadPosts = function () {
        if (endOfFeed) {
            return;
        }
        console.log($scope.ajaxParam.start + " - " + $scope.ajaxParam.num);

        $tumblrService.posts($scope.ajaxParam, function (posts) {
            posts.forEach(function (post) {
                $scope.addPost(post);
            });

            if (tumblr_api_read.posts.length > 0) {
                endOfFeed = true;
                $scope.ajaxParam.start = $scope.ajaxParam.start + $scope.ajaxParam.num;
            }
        });
    };

    /*
     * Ajoute/Supprime l'objet du cache Trash
     */
    $scope.trash = function (idPost) {
        if ($cacheService.isTrashCached(idPost)) {
            $cacheService.addToTrash(idPost);
        } else {
            $cacheService.removeFromTrash(idPost);
        }
    }

    /*
     * Ajoute/Supprime l'objet du cache Playlist
     */
    $scope.playlist = function (idPost) {
        if ($cacheService.isPlaylistCached(idPost)) {
            $cacheService.addToPlaylist(idPost);
        } else {
            $cacheService.removeFromPlaylist(idPost);
        }
    }
}]);