(function() {
    'use strict';

    angular
        .module('app')
        .factory('StudentFactory', StudentFactory);

    StudentFactory.$inject = ['$http', '$q', 'toastr', 'apiUrl'];

    /* @ngInject */
    function StudentFactory($http, $q, toastr, apiUrl) {
        var service = {
            addStudent: addStudent,
            getAllStudents: getAllStudents,
            getStudentById: getStudentById,
            editStudent: editStudent,
            deleteStudent: deleteStudent
        };

        return service;



///////// CREATE  --> addStudent()   //////////

        function addStudent(newStudent) {
            var defer = $q.defer(); 

            $http.post(apiUrl + '/students/', newStudent).then(
                function(response) {
                    defer.resolve(response.data);
                    toastr.success('Added student to database', 'Saved');
               },
               function(error) {
                   defer.reject(error);
                   toastr.error('Adding student to database failed.', 'Error');
                }
           );

           return defer.promise;
        }



//////// READ  --->   getAllStudents()   ////////
  
        function  getAllStudents() {
            // Assign $q.defer function to deferred var.
            var deferred = $q.defer();     
            
            // Get API and with property extension
            $http.get(apiUrl + '/students/').then(
                function(response) {   
                    deferred.resolve(response.data);
                    // toastr.success('All students insync with database.', 'Success');  
                    // console.log(response.data);
            },
            function(error) {
                deferred.reject(error);
                    toastr.error('Getting students from database failed.', 'Error');
                    console.log(error);
            });
            
            return deferred.promise;

        } //  getAllStudents() function



//////// READ  --->  getStudentById()   ////////
  
        function getStudentById(id) {
            var deferred = $q.defer(); 

	        $http.get(apiUrl + '/students/' + id).then(
                function(response) {   
    	        	deferred.resolve(response.data);
    	        	// console.log(response.data);
	        },
	        function(error) {
	        	deferred.reject(error);
                    toastr.error('Getting students from database failed.', 'Error');
                    console.log(error);
	        });

	       return deferred.promise;

        } //  getStudentById() function



//////// UPDATE  --->  editStudent()   ////////

        function editStudent(student, id) {
            var defer = $q.defer();

            $http.put(apiUrl + '/students/' + student, id).then(
                function(response) {
                    toastr.success('Successfully edited student', 'Updated');
                    defer.resolve(response.data);
               },
               function(error) {
                    toastr.error('Updating student in database failed.', 'Error');
                    console.log(error);
               }
           );

           return defer.promise;

        }   //  editStudent() function



//////// DELETE  --->  deleteStudent()   ////////

        function deleteStudent(studentId) {
            var defer = $q.defer();  
              
            $http.delete(apiUrl + '/students/' + studentId).then(
                function(response) {
                    defer.resolve(response.data);
               },
               function(error) {
                    toastr.error('Deleting student from database failed.', 'Error');
                    console.log(error);
               }
           );

           return defer.promise;

        }   //  editStudent() function
    }
})();