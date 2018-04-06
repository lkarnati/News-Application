(function() {

angular.module("newsapp.news").controller("sourceController", sourceController),
    sourceController.$inject = ["$scope", "$rootScope", "$http", "$state"]

    function sourceController($scope, $rootScope, $http, $state) {
        console.log("hi !!!!!!")
        var sourceCtrl = this;
        sourceCtrl.getAllSources = getAllSources;
        sourceCtrl.selectSourceList = selectSourceList;
        sourceCtrl.getArticles = getArticles;


        _initialize();

        function _initialize() {
            sourceCtrl.sourceList = [];
            sourceCtrl.getAllSources();
            sourceCtrl.selectedSourceList = [];
            sourceCtrl.isValid = false;
            //sourceCtrl.selectedSourceList = $rootScope.selectedSourceList;

        }

        function getAllSources(callback) {
             $http.get('/api/sources')
               .then(
                 function (response) {
                    console.log(response);
                    sourceCtrl.sourceList = response.data.sources;
                    console.log(sourceCtrl.sourceList);
                    console.log($rootScope.selectedSourceList);
                    if (typeof $rootScope.selectedSourceList !== "undefined" && $rootScope.selectedSourceList.length > 0) {
                        console.log("entering");
                        for (i = 0; i < $rootScope.selectedSourceList.length; i++) {
                            for (j = 0; j < sourceCtrl.sourceList.length; j++) {
                                if ($rootScope.selectedSourceList[i].id === sourceCtrl.sourceList[j].id) {
                                    sourceCtrl.isValid = true;
                                    sourceCtrl.sourceList[j]['ticked'] = true;
                                    break;
                                }
                            }
                        }
                    }

                 },
                 function (error) {
                   console.log(error);
                 });
        }

        function selectSourceList(selectedSourceList) {
            console.log(selectedSourceList)
            if(selectedSourceList.length > 5) {
                sourceCtrl.isValid = false;
                return;
            } else {
                sourceCtrl.isValid = true;
                $rootScope.selectedSourceList = selectedSourceList;
                console.log($rootScope.selectedSourceList);
            }
        }

        function getArticles(sourceId) {
            $state.go('news.article', {"sourceId": sourceId});
        }

    }

}());