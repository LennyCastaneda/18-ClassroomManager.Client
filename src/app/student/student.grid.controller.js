(function() {
    'use strict';

    angular
        .module('app')
        .controller('StudentGridController', StudentGridController);

    StudentGridController.$inject = 
	    [
		    '$stateParams', 
		    '$state', 
		    'toastr', 
		    'StudentFactory'
	    ];

    /* @ngInject */
    function StudentGridController($stateParams, $state, toastr, StudentFactory) {
        var vm = this;
        // vm.ngBootBox = $ngBootbox;
        var edit = {};
        vm.students = [];

        vm.editStudent = editStudent;
        vm.viewDetails = viewDetails;
        vm.deleteStudent = deleteStudent;

        activate();



//////////////// CREATE ////////////////

        function activate() {
        	// Adds the user input to the table
			vm.addNew = function() {
				vm.saving = true;
				StudentFactory.addStudent(vm.newStudent).then(
					function() {
						vm.saving = false;
						toastr.success('Successfully added a student', 'Saved');
						// Clears input after submission
						vm.newStudent.name = null;
						vm.newProject.id = 0;
		    			// vm.newProject.groupRefId = 0;
						//Called the get function to insure the list is in sync 
						//with the database index
						StudentFactory.getAllStudents().then(
				    		function (data) {
				    			vm.students = data;
				    		},
				    		function(error) {
				                toastr.error('Error getting student list', 'Error');
			    		});
					},
					function() {
						toastr.error('Error saving student', 'Error');
					}
				);
			};

		}

///////// READ --> studentDetails()  //////////

		function viewDetails(id) {
            $state.go("student.viewDetails", {"studentId": id});
        }
			// Initiates the student list from the dB server
	    	StudentFactory.getAllStudents().then(
	    		function (data) {
	    			vm.students = data;
	    		},
	    		function(error) {
	                toastr.error('Error getting student list', 'Error');
    		});



/////////// UPDATE --> editStudent()  //////////
        
    	// Updates the user input from the student list
		function editStudent(id, student){				
			vm.saving = true;
			edit = angular.toJson(student); //Removes the $$hashkey syntax
			StudentFactory.editStudent(id, edit).then(
				function() {
					vm.saving = false;
					toastr.success('Successfully edited student', 'Updated');
					//Called the get function to insure the list is in sync 
					//with the database index
					StudentFactory.getAllStudents().then(
			    		function (data) {
			    			vm.students = data;
			    		},
			    		function(error) {
			                toastr.error('Error getting student list', 'Error');
		    		});
				},
				function() {
					toastr.error('Error updating student', 'Error');
				}
			);
		}


///////// DELETE --> deleteStudent()  //////////

		// Removes the user input from the student list
		function deleteStudent(student){
			vm.saving = true; 

			StudentFactory.deleteStudent(student).then(
				function() {
					vm.saving = false;
					toastr.success('Successfully removed student', 'Deleted');
					// Call getAllStudents() ensure databae in sync 
					StudentFactory.getAllStudents()
						.then(
			    		function (data) {
			    			vm.students = data;
			    		},
			    		function(error) {
			                toastr.error('Error getting student list', 'Error');
		    		});
				},
				function() {
					toastr.error('Error deleting student', 'Error');
				}
			); // StudentFactory.deleteStudent()

		} // deleteStudent()	
     }
})();