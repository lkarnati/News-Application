(function() {

angular.module("newsapp.news").controller("sourceController", sourceController),
    sourceController.$inject = ["$scope", "$rootScope", "$http", "$state", "$localStorage"]

    function sourceController($scope, $rootScope, $http, $state, $localStorage) {
        var sourceCtrl = this;
        sourceCtrl.getAllSources = getAllSources;
        sourceCtrl.selectSourceList = selectSourceList;
        sourceCtrl.resetSourceList = resetSourceList;

        _initialize();

        function _initialize() {
            sourceCtrl.sourceList = [];
            sourceCtrl.getAllSources();
            sourceCtrl.selectedSourceList = [];
            sourceCtrl.isValid = false;
            //sourceCtrl.selectedSourceList = $rootScope.selectedSourceList;

        }

        //get all sources available and tick them if previously selected
        function getAllSources(callback) {
             $http.get('/api/sources')
               .then(
                 function (response) {
                    console.log(response);
                    sourceCtrl.sourceList = response.data.sources;
                    if ($rootScope.selectedSourceList == null) {
                        $rootScope.selectedSourceList = $localStorage.selectedSourceList;
                    }
                    if (typeof $rootScope.selectedSourceList !== "undefined" && $rootScope.selectedSourceList.length > 0) {
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

        function resetSourceList() {
            sourceCtrl.selectedSourceList=[];
            sourceCtrl.isValid = true;
            $rootScope.selectedSourceList = sourceCtrl.selectedSourceList;
            $localStorage.selectedSourceList = sourceCtrl.selectedSourceList;
        }
        // set the tiles on selection and if number of selected values is less than 5
        function selectSourceList(selectedSourceList) {
            console.log(sourceCtrl.selectedSourceList);
            if(sourceCtrl.selectedSourceList.length > 5) {
                sourceCtrl.isValid = false;
                return;
            } else {
                sourceCtrl.isValid = true;
                $rootScope.selectedSourceList = sourceCtrl.selectedSourceList;
                $localStorage.selectedSourceList = sourceCtrl.selectedSourceList;
                //console.log($rootScope.selectedSourceList);
            }
        }

    }

}());