(function() {

angular.module("newsapp.news").controller("articleController", articleController),
    articleController.$inject = ["$scope", "$rootScope", "$http", "$state", "$stateParams", "$localStorage"]

    function articleController($scope, $rootScope, $http, $state, $stateParams, $localStorage) {
        var articleCtrl = this;
        articleCtrl.getArticlesBySource = getArticlesBySource;
        articleCtrl.setRemoveFav = setRemoveFav;
        articleCtrl.setRemoveFavDialog = setRemoveFavDialog;
        articleCtrl.cancelFav = cancelFav;
        articleCtrl.getFavArticles = getFavArticles;
        articleCtrl.getFavArticlesOnly = getFavArticlesOnly;

        _initialize();

        function _initialize() {
            articleCtrl.sourceId = $stateParams.sourceId;
            articleCtrl.showFav = $stateParams.showFav;
            if (!$stateParams.showFav && $stateParams.sourceId != null) {
                articleCtrl.getArticlesBySource(articleCtrl.sourceId);
                //setting the sourceId in local storage to preserve during reload
                $localStorage.sourceId = $stateParams.sourceId;
            } else if ($stateParams.showFav) {
                articleCtrl.getFavArticlesOnly();
            } else  {
                articleCtrl.sourceId = $localStorage.sourceId
                articleCtrl.getArticlesBySource(articleCtrl.sourceId);
            }

        }

        function getArticlesBySource(sourceId) {
            $http.get('/api/articlesbysource/'+ sourceId)
               .then(
                 function (response) {
                    articleCtrl.articles = response.data;
                    articleCtrl.getFavArticles();
                    console.log(response);
                 },
                 function (error) {
                   console.log(error);
                 });
        }

        function getFavArticlesOnly() {
            $http.get('/api/getfavarticles/')
               .then(
                 function (response) {
                    console.log(response);
                    articleCtrl.articles = response.data;
                 },
                 function (error) {
                   console.log(error);
                 });
        }

        function getFavArticles() {
                    $http.get('/api/getfavarticles/')
                   .then(
                     function (response) {
                        articleCtrl.favArticles = response.data;
                        for (var i=0; i< articleCtrl.articles.length; i++) {
                             for(var j=0; j< articleCtrl.favArticles.length; j++) {
                                if(articleCtrl.favArticles[j].title === articleCtrl.articles[i].title) {
                                    articleCtrl.articles[i].favourite = true;
                                    break;
                                } else {
                                    articleCtrl.articles[i].favourite = false;
                                }
                             }
                         }

                     },
                     function (error) {
                       console.log(error);
                     });
                }

        function cancelFav(article) {
            articleCtrl.article.favourite = !articleCtrl.article.favourite;
        }


        function setRemoveFav(article) {
             if (articleCtrl.article.favourite) {
                $http.post('/api/savearticle', {id: article.source.id, name: article.source.name, title: article.title, publishedAt: article.publishedAt,
                 description: article.description, author: article.author, urlToImage: article.urlToImage})
                   .then(
                     function (response) {
                        //articleCtrl.articles = response.data;
                        //articleCtrl.getArticlesBySource(articleCtrl.sourceId);
                        //console.log(response);
                     },
                     function (error) {
                       console.log(error);
                     });
             } else {
                $http.delete('/api/removearticle/'+article.title)
                   .then(
                     function (response) {
                        //articleCtrl.articles = response.data;
                        //articleCtrl.getArticlesBySource(articleCtrl.sourceId);
                        //console.log(response);
                     },
                     function (error) {
                       console.log(error);
                     });
             }
        }

        function setRemoveFavDialog(article) {
            article.favourite = !article.favourite;
            articleCtrl.article = article;
            //add fav
            if (article.favourite) {
                articleCtrl.article.heading = "Set as Favourite"
                articleCtrl.article.content = "Are you sure you want to set this article as favourite?"


            } else { //remove fav
                articleCtrl.article.heading = "Remove as Favourite"
                articleCtrl.article.content = "Are you sure you want to remove this article as favourite?"
            }
            $('#myModal').modal('show');
        }



    }

}());