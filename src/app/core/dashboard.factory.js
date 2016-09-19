(function() {
    'use strict';

    angular
        .module('app')
        .factory('DashboardFactory', DashboardFactory);

    DashboardFactory.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function DashboardFactory($http, $q, apiUrl) {
        var service = {
            getDashData: getDashData
        };

        return service;

///////// READ  --> getDashData()   //////////

        function getDashData() {
          var defer = $q.defer(); 

            $http.get(apiUrl + '/assignments/').then(
                function(response) {
                    defer.resolve(response.data);
               },
               function(error) {
                   defer.reject(error);
               }
           );

           return defer.promise;
        }
    }
})();