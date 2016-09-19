(function() {
    'use strict';

    angular
        .module('app')
        .factory('AssignmentFactory', AssignmentFactory);

    AssignmentFactory.$inject = ['$http', '$q', 'toastr', 'apiUrl'];

    /* @ngInject */
    function AssignmentFactory($http, $q, toastr, apiUrl) {			
        var service = {
            postAssignment: postAssignment,
            getAllAssignments: getAllAssignments,
            getAssignmentById: getAssignmentById,
            editAssignment: editAssignment,
            deleteAssignment: deleteAssignment
        };

        return service;



///////// CREATE  -->  postAssignment()   ////////
  
        function postAssignment(assignment) {
            var deferred = $q.defer();   
  
            $http.post(apiUrl + '/assignments/', assignment).then(
                function(response) {    
                    deferred.resolve(response.data);
                    toastr.success('Assignment added to database.', 'Success');
                },
                function(error) {
                    deferred.reject(error);
                    toastr.error('Student assigned to project.', 'Error');
                    console.log(error);
                });

           return deferred.promise;

        } //  postAssignment() function 



//////// READ  --->    getAllAssignments()   ////////
  
        function getAllAssignments() {
            var deferred = $q.defer();     

            $http.get(apiUrl + '/assignments/').then(
                function(response) {    
                    deferred.resolve(response.data);
                    // toastr.success('All assignments insync with database', 'Success');  
                },
                function(error) {
                    deferred.reject(error);
                    toastr.error('Error getting assignments from database.', 'Error');
                    console.log(error);
                });

            return deferred.promise;

        } //  getAllAssignments() function 



//////// READ  ---> getAssignmentById()   ////////

        function getAssignmentById(id) {
            var deferred = $q.defer();     

            $http.get(apiUrl + '/assignments/' + id).then(
                function(response) {                   
                    deferred.resolve(response.data);
                    toastr.success('Successfully added assignment.', 'Success');  
            },
                function(error) {
                    deferred.reject(error);
                    toastr.error('This student already has this project assigned.', 'Error');
                    console.log(error);
            });

           return deferred.promise;

        } //  getAssignmentById() function



//////// UPDATE  --->  editAssignment()   ////////

        function editAssignment(assignment) {
            var defer = $q.defer();

            $http.put(apiUrl + '/assignments/' + assignment.studentId + '/' + assignment.projectId, assignment).then(
                function(response) {
                    defer.resolve(response.data);
                    toastr.success('Successfully saved grade.', 'Success');  
               },
                function(error) {
                    deferred.reject(error);
                    toastr.error('This student already has this project assigned.', 'Error');
                    console.log(error);
            });

           return defer.promise;

        }   //  editStudent() function



/////// DELETE  --->  deleteAssignment()   ////////

        function deleteAssignment(studentId, projectId) {
            var defer = $q.defer();             

            $http.delete(apiUrl + '/assignments/' + studentId + '/' + projectId).then(
                function(response) {
                    defer.resolve(response.data);
                    toastr.success('Successfully deleted student from this assignment', 'Saved');
               },
                function(error) {
                    deferred.reject(error);
                    toastr.error('Error deleting student from assignment', 'Error');
                    console.log(error);
            });

           return defer.promise;

        }   //  deleteAssignment() function
    }
})();