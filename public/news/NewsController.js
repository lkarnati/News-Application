(function() {
angular.module("newsapp.news", []);

angular.module("newsapp.news").controller("newsController", newsController),
    newsController.$inject = ["$scope", "$rootScope", "$http", "$localStorage"]

    function newsController($scope, $rootScope, $http, $localStorage) {
        var newsCtrl = this;
        $rootScope.loginPage = false;
        console.log($rootScope.user);
        if ($rootScope.user == null || typeof $rootScope.user === "undefined") {
            console.log($localStorage.user);
            $rootScope.user = $localStorage.user;
        }
    }

}());