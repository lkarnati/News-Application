(function() {
angular.module("newsapp.news", []);

angular.module("newsapp.news").controller("newsController", newsController),
    newsController.$inject = ["$scope", "$rootScope", "$http", "$localStorage"]

    function newsController($scope, $rootScope, $http, $localStorage) {
        var newsCtrl = this;
        //set the value of user from localstorage
        if ($rootScope.user == null || typeof $rootScope.user === "undefined") {
            $rootScope.user = $localStorage.user;
        }
    }

}());