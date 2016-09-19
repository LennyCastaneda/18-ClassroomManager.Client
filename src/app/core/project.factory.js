(function() {
    'use strict';

    angular
        .module('app')
        .factory('ProjectFactory', ProjectFactory);

    ProjectFactory.$inject = ['$http', '$q', 'toastr', 'apiUrl'];

    /* @ngInject */
    function ProjectFactory($http, $q, toastr, apiUrl) {
        var service = {
            addProject: addProject,
            getAllProjects: getAllProjects,
            getProjectById: getProjectById,
            editProject: editProject,
            deleteProject: deleteProject
        };

        return service;


///////// CREATE  --> addProject()   //////////

        function addProject(newProject) { 
            var defer = $q.defer();

            $http.post(apiUrl + '/projects/', newProject).then(
                function(response) {
                    defer.resolve(response.data);
                    toastr.success('Project successfully added to database', 'Saved'); 
              },
               function(error) {
                    toastr.error('Error adding new project', 'Error');
                    defer.reject(error);
               }
           );

           return defer.promise;

        }   // addProject()



//////// READ  --->   getAllProjects()   ////////

        function getAllProjects() {
            var deferred = $q.defer();     

            // Get API and with property extension
        	$http.get(apiUrl + '/projects/').then(
                function(response) {   
                    deferred.resolve(response.data);
                    // toastr.success('All projects insync with database.', 'Success');
                    // console.log(response.data);
            },
            function(error) {
                deferred.reject(error);
                toastr.error('Error getting all projects', 'Error');
                console.log(error);
            });
            
            return deferred.promise;

        } //  getAllProjects() function



//////// READ  --->   getProjectById()   ////////

        function getProjectById(id) {
            var deferred = $q.defer();     

            $http.get(apiUrl + '/projects/' + id).then(
                function(response) {   
                    deferred.resolve(response.data);
                    // console.log(response.data);
            },
            function(error) {
                deferred.reject(error);
                toastr.error('Error getting project by Id\'s', 'Error');
                console.log(error);
            });

           return deferred.promise;

        } //  getProjectById() function



//////// UPDATE  --->  editProject()   ////////

        function editProject(project, id) {
            var defer = $q.defer();
            $http.put(apiUrl + '/projects/' + project, id).then(
                function(response) {
                    toastr.success('Successfully edited project', 'Updated');
                    defer.resolve(response.data);
               },
               function(error) {
                    toastr.error('Error updating project to database', 'Error');
                   defer.reject(error);
               }
            );

            return defer.promise;

        }   //  editProject() function



//////// DELETE --->  deleteProject()   ////////

        function deleteProject(id) {
           var defer = $q.defer();   
           $http.delete(apiUrl + '/projects/' + id).then(
                function(response) {
                    defer.resolve(response.data);
               },
               function(error) {
                toastr.error('Error deleting project', 'Error');
                   defer.reject(error);
               }
            );

            return defer.promise;

        }   //  deleteProject() function

    }
})();