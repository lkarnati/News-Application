(function() {
angular.module("newsapp.login", []);

angular.module("newsapp.login").controller("loginController", loginController),
    loginController.$inject = ["$scope", "$rootScope", "$http", "$state", "$localStorage"]

    function loginController($scope, $rootScope, $http, $state, $localStorage) {

        var loginCtrl = this;
        loginCtrl.verify = verify;

        _initialize();

        function _initialize() {
            $rootScope.user = {};
            $rootScope.user.username = "";
            $rootScope.user.password = "";
            loginCtrl.error = {};
            loginCtrl.errorFlag = false;
        }

        //verify login with username and password
        function verify() {
            $http.post('/api/login', $rootScope.user)
               .then(
                 function (response) {
                   if (response.data === "Username or password is incorrect. Please Try again") {
                       loginCtrl.error.message = response.data;
                       loginCtrl.errorFlag = true;
                   } else {
                        loginCtrl.errorFlag = false;
                        $rootScope.user.name = response.data.name;
                        //setting the user info in local storage to preserve during reload
                        $localStorage.user = $rootScope.user;
                        //go to source page if success
                        $state.go("news.source");
                   }
                 },
                 function (error) {
                   console.log(error);
                 });
        }


    }

}());