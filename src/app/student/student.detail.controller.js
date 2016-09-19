(function() {
    'use strict';

    angular
        .module('app')
        .controller('StudentDetailController', StudentDetailController);

    StudentDetailController.$inject = [
        '$stateParams',
        '$state',
        'toastr',
        'StudentFactory',
        'ProjectFactory',
        'AssignmentFactory'
    ];

    /* @ngInject */
    function StudentDetailController($stateParams, $state, toastr, StudentFactory, ProjectFactory, AssignmentFactory) { 
        var vm = this;
        // vm.grade = [ 'A', 'B', 'C', 'D', 'F' ];
        vm.student = {};
        // vm.project = [];

        vm.addAssignment = addAssignment;

        vm.saveStudent = saveStudent;

        activate();

        ////////////////

        function activate() {
            // init function
            if ($stateParams.studentId) {
                  // console.log($stateParams.studentId);
                StudentFactory.getStudentById($stateParams.studentId).then(
                    function(student) {
                        vm.student = student;
                    }
                );
            } else {
                vm.student = {};
        }

            // ProjectFactory.getAllProjects($stateParams.projectId).then( 
            //     function(project) {
            //         vm.project = project;
            //         // console.log(project);
            //     }
            // );
        }


//////////////// CREATE  --> saveStudent() ///////////////////////////
//                                                                  //
//  When saveStudent button is clicked, first checks if students    //
//  Inputfields are not null or throws error. Then makes copy of    //
//  input and saves to new update object. Then depending upon       //
//  if the user is adding a new student or editing a current        //
//  student to will go to StudentFactory.addStudent() or            // 
//  StudentFactory.editStudent() respectively.                      //
//                                                                  //
//////////////////////////////////////////////////////////////////////

        function saveStudent() {
            vm.saving = true;

            // Input validation for student input fields
            if (vm.student === undefined ||
                vm.student.firstName === undefined ||
                vm.student.lastName === undefined ||
                vm.student.emailAddress === undefined ||
                vm.student.telephone === undefined) {
                toastr.error('All fields must be filled out.', 'Error');
            } else {
                if (vm.student.studentId) {
                    // update student

                    var edit = angular.copy(vm.student);
                    var update = {
                        "firstName" : edit.firstName,
                        "lastName" : edit.lastName,
                        "emailAddress" : edit.emailAddress,
                        "telephone" : edit.telephone
                    };

                    StudentFactory.editStudent(vm.student.studentId, edit).then(
                    function() {
                        vm.saving = false;

                        StudentFactory.getAllStudents().then(
                            function (data) {
                                vm.student = data;
                            });
                    },
                    function() {
                        toastr.error('Error updating student', 'Error');
                    }
                );  // editStudent()
                } else {
                    // add student
                    StudentFactory.addStudent(vm.student).then(
                        function(student) {
                            vm.saving = false;
                            // Clears input after submission
                            vm.student = student;
                        },
                        function() {
                            toastr.error('Error saving student', 'Error');
                        }
                    );  // addStudent()
                }   
            }
        }  //  saveStudent()


        function addAssignment() {
           var projectId = vm.selectedProject.projectId;
           console.log(vm.selectedProject);
           // Input validation
            if (projectId === undefined) {
                toastr.error("Please select a project.");
            } else {
                var studentId = $stateParams.studentId; 
                var newAssignment = {
                    "studentId" : studentId,
                    "projectId" : projectId
                };
                
                AssignmentFactory.postAssignment(newAssignment).then(
                    function(assignment) {
                        vm.student.assignments.push(assignment);     
                    }
                );
            }  
        }   // addAssignment()
    } // StudentDetailController()
})();