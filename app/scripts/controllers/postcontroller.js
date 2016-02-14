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
angular.module('myTumblrApp').controller('PostcontrollerCtrl', ['$scope', '$http', '$sce', '$timeout', '$interval', '$q', 'tumblrService', 'cacheService',
  function($scope, $http, $sce, $timeout, $interval, $q, $tumblrService, $cacheService) {

  /*
   * Array de tous les posts
   */
  var posts = $scope.posts = []; // jshint ignore:line

  /*
   * Informations générales du tumblr
   */
  var infos = $scope.infos = { // jshint ignore:line
    title: 'TITLE',
    author: 'author',
    description: 'descr'
  };

  /*
   * Paramètres à transférer au tumblr.
   */
  var loadingData = $scope.loadingData = { // jshint ignore:line
    start: 0,
    num: 6,
    lastLength: 6,
    busy : false
  };

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
  };

  /*
   * Méthode appelée au chargement de la page.
   * Récupère les infos principales et charge les premiers posts.
   */
  $scope.init = function() {
    angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 500);
    $cacheService.construct();
    $tumblrService.info(function(data) {
      $scope.infos.title = data.title;
      $scope.infos.author = data.name;
      $scope.infos.description = data.description;
    });

  };

  /*
   * Récupère et charge les posts puis incrémente start de num.
   */
  $scope.loadPosts = function() {
    if ($scope.loadingData.lastLength < $scope.loadingData.num || $scope.loadingData.busy) {
      return;
    }
    $scope.loadingData.busy = true;

    $tumblrService.posts($scope.loadingData, function(posts) {
      var index = 0;
      $interval(function(){
        if (index >= posts.length) {
          return;
        }
        addPost(posts[index]);
        ++index;
      }, 300, posts.length);

      // jscs:disable
      $scope.loadingData.lastLength = tumblr_api_read.posts.length; // jshint ignore:line
      $scope.loadingData.start = $scope.loadingData.start + $scope.loadingData.num;
      // jscs:enable
      $scope.loadingData.busy = false;
      $scope.$emit('posts:filtered');

    }.bind(this));
  };

  /*
   * Ajoute/Supprime l'objet du cache Trash
   */
  $scope.trash = function(idPost) {
    if ($cacheService.isTrashCached(idPost)) {
      $cacheService.addToTrash(idPost);
    } else {
      $cacheService.removeFromTrash(idPost);
    }
  };

  /*
   * Ajoute/Supprime l'objet du cache Playlist
   */
  $scope.playlist = function(idPost) {
    if ($cacheService.isPlaylistCached(idPost)) {
      $cacheService.addToPlaylist(idPost);
    } else {
      $cacheService.removeFromPlaylist(idPost);
    }
  };

  /**
   * Renvoit la date au format Long
   */
  function toDateLong(str) {
    return new Date(str).getTime();
  }

  /**
   * Formate le champs des tags pour les prefixé d'un # et les espacer
   */
  function tagArray(tags) {
    if ( Object.prototype.toString.call( tags ) !== '[object Array]' ) {
      return [];
    }
    var result = [];
    tags.forEach(function(entry) {
      entry.split(' ').forEach(function(e) {
        result.push(e);
      });
    });
    return result;
  }

  /*
   * Récupère un embeddedPlayer et modifie ses champs width et height.
   */
  function adaptFrameSize(html) {
    html = html.replace(/(width=")\d+("\W+height=")\d+/, '$1100%$2100%');
    return html;
  }

  /*
   * Récupère un post au format JSON et l'ajoute dans un
   * format correct à l'array.
   */
  function addPost (post) {
    createPost (post);
    var promise = asyncPost(post);
    promise.then(
      function (output) { // success
        $scope.posts.push(output);
      },
      function (error) { // error
        console.error(error);
      }
    );
  }

  function asyncPost (tPost) {
    var deferred = $q.defer();

    $timeout(function() {
      var newPost = createPost(tPost);
      if (newPost !== null) {
        deferred.resolve(newPost);
      } else {
        deferred.reject('Error Generating tumblr Post');
      }
    }, 500);

    return deferred.promise;
  }

  function createPost (post) {
    var newPost = {
      id: post.id,
      isTrash: $cacheService.isTrashCached(post.id),
      isPlaylist: $cacheService.isPlaylistCached(post.id),
      date: toDateLong(post.date),
      tags: tagArray(post.tags),
      url: post.url,
      reblog: post['reblog-key']
    };

    if (post.type === T.conv) {
      newPost.type = T.conv;
      newPost.title = post['conversation-title'];
      newPost.conversation = post.conversation;
    } else if (post.type === T.link) {
      newPost.type = T.link;
      newPost.title = post['link-text'];
      newPost.link = post['link-url'];
      newPost.description = post['link-description'];
    } else if (post.type === T.quote) {
      newPost.type = T.quote;
      newPost.text = post['quote-text'];
      newPost.source = post['quote-source'];
    } else if (post.type === T.photo) {
      newPost.type = T.photo;
      newPost.caption = $sce.trustAsHtml(post['photo-caption']);
      newPost.photos = [];
      post.photos.forEach(function(data) {
        newPost.photos.push({
          offset: data.offset,
          w: data.width,
          h: data.height,
          caption: data.caption,
          url75: data['photo-url-75'],
          url100: data['photo-url-100'],
          url250: data['photo-url-250'],
          url400: data['photo-url-400'],
          url500: data['photo-url-500'],
          url1280: data['photo-url-1280']
        });
      });
    } else if (post.type === T.audio) {
      newPost.type = T.audio;
      newPost.artist = post['id3-artist'];
      newPost.album = post['id3-album'];
      newPost.title = post['id3-music'];
      newPost.caption = post['audio-caption'];
      newPost.plays = post['audio-plays'];
      newPost.player = $sce.trustAsHtml(post['audio-player']);
      newPost.embed = $sce.trustAsHtml(adaptFrameSize(post['audio-embed']));
    } else if (post.type === T.video) {
      newPost.type = T.video;
      newPost.caption = $sce.trustAsHtml(post['video-caption']);
      newPost.url = post['video-source'];
      newPost.player = $sce.trustAsHtml(adaptFrameSize(post['video-player']));
      newPost.player500 = $sce.trustAsHtml(post['video-player-500']);
      newPost.player250 = $sce.trustAsHtml(post['video-player-250']);
    } else {
      newPost.type = T.reg;
      newPost.title = post['regular-title'];
      newPost.body = $sce.trustAsHtml(post['regular-body']);
    }

    // Gestion de la class pour la grid
    switch (post.type) {
      case T.video:
      case T.photo:
        newPost.pClass = 'gr-w';
        break;
      default:
        newPost.pClass = 'gr';
        break;
    }

    return newPost;
  }
}]);
