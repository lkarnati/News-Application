(function() {
    'use strict';
        // Declare app level module which depends on filters, and services
        angular.module('newsapp', [
            'ui.router',
            'ui.bootstrap',
            'newsapp.login',
            'newsapp.news',
            'isteven-multi-select',
            'angular-loading-bar',
            'ngStorage'
        ])
         .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
             cfpLoadingBarProvider.includeSpinner = true;
           }])
         .config(['$stateProvider', '$urlRouterProvider',  function($stateProvider, $urlRouterProvider) {
                    $urlRouterProvider
                        .otherwise('/login');
                    $stateProvider
                        .state('login', { //login verification
                            url: '/login',
                            templateUrl: 'login/login.html',
                            controller: 'loginController',
                            controllerAs: 'loginCtrl'
                        })
                        .state('news', { // has header and footer
                            url: '/news',
                            abstract:true,
                            templateUrl: 'news/news.html',
                            controller: 'newsController',
                            controllerAs: 'newsCtrl'
                        })
                        .state('news.source', { // to select the sources
                            url: '/source',
                            templateUrl: 'news/source.html',
                            controller: 'sourceController',
                            controllerAs: 'sourceCtrl'
                        })
                        .state('news.article', { //to display all articles and saved articles
                            url: '/article',
                            templateUrl: 'news/article.html',
                            controller: 'articleController',
                            controllerAs: 'articleCtrl',
                            params: {
                                sourceId: null,
                                showFav: false
                            }
                        })

         }])
}());