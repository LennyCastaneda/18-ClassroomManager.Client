(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProjectDetailController', ProjectDetailController);

    ProjectDetailController.$inject = [
        '$stateParams',
        '$state',
        'toastr',
        'StudentFactory',
        'ProjectFactory',
        'AssignmentFactory'
    ];

    /* @ngInject */
    function ProjectDetailController($stateParams, $state, toastr, StudentFactory, ProjectFactory, AssignmentFactory) {
        var vm = this;
        // Properties
        vm.projectId = $stateParams.projectId;

        // vm.student = {};
        // vm.project = {};
        // vm.assignment = {};
        // vm.grade = [];

        vm.allProjects = {};
        vm.allStudents = {};
        vm.allGrades = [];
        
        // Methods
        vm.addAssignment = addAssignment;
        vm.saveProject = saveProject;
        // vm.toggleEdit = toggleEdit;
        vm.editGrade = editGrade;
        vm.deleteAssignment = deleteAssignment;

        activate();

        function activate() {
            // init function
            StudentFactory.getAllStudents().then( 
                function(data) {
                    vm.allStudents = data;
                    console.log(data);
                },
                function(error) {
                    console.log(error);
            });
            
            AssignmentFactory. getAllAssignments($stateParams.assignmentGrade).then(
                function(data) {
                    vm.allGrades = data;
                    console.log(data);
                },
                function(error) {
                    console.log(error);
            });

            if ($stateParams.projectId) {
                // console.log($stateParams.studentId);
                ProjectFactory.getProjectById($stateParams.projectId).then(
                    function(data) {
                        vm.project = data;
                        console.log(data);
                    });
            } else {
                vm.project = {};
            }
        
                ProjectFactory.getAllProjects($stateParams.projectId).then( 
                    function(data) {
                        vm.allProjects = data;
                        console.log(data);
                    });
        }


        //////////////// CREATE - UPDATE ////////////////

        function saveProject() {
            vm.saving = true;

            // Input validation for project input fields
            if (vm.project === undefined ||
                vm.project.name === undefined ||
                vm.project.description === undefined ) {
                toastr.error('All fields must be filled out.', 'Error');
            } else {
                if (vm.project.projectId) {
                    // update project
                
                   var edit = angular.copy(vm.project);
                    var update = {
                        "name" : edit.name,
                        "description" : edit.description
                    };

                    ProjectFactory.editProject(vm.project.projectId, edit).then(
                    function() {
                        vm.saving = false;

                        ProjectFactory.getAllProjects().then(
                            function (data) {
                                vm.project = data;
                            });
                    });  // editStudent()
                } else {
                    ProjectFactory.addProject(vm.project).then(
                        function(project) {
                            vm.saving = false;
                            // Clears input after submission
                            vm.project = project;
                    });  // addStudent()
                }
            }
        } // saveProject()


        function addAssignment() {
            var studentId = vm.selectedStudent.studentId;
            console.log(vm.selectedStudent);
            
            // var grade = vm.assignmentGrade.grade;
            // console.log(vm.assignmentGrade);
            
            // Input validation
            if (studentId === undefined) {
                toastr.error("Please select a student and assign grade.");
            } else {

                // var projectId = $stateParams.projectId; 
            var assignment = {
                "studentId" : vm.newAssignment.studentId,
                "projectId" : vm.project.projectId
            };
    
            AssignmentFactory.postAssignment(assignment).then(
                function(newAssignment) {
                    vm.project.assignments.push(newAssignment);    
                });
               
                assignment = {};
            }
        }   // addAssignment()

    
            // function toggleEdit() {
            //     if (!vm.editMode) {
            //         vm.editingProject = angular.copy(vm.project);
            //     }
            //     vm.editMode = !vm.editMode;
            // }


            function editGrade(assignment, grade){
                var i = 0;
                var newGrade = {  'studentId' : assignment.studentId, 
                                    'projectId' : assignment.projectId,
                                    'assignmentGrade' : vm.assignGrade};
              
              AssignmentFactory.editAssignment(newGrade).then(
                function() {
                  for(i=0; i < vm.project.assignments.length; i++)
                  {
                    if(vm.project.assignments[i].studentId == assignment.studentId && 
                        vm.project.assignments[i].projectId == assignment.projectId)
                    {
                        vm.project.assignments[i].assignmentGrade = vm.assignGrade;
                    }
                }
                },
                function() {
                    toastr.error('Error changing grade', 'Error');
                });
            }

            function deleteAssignment(assignment) {
              var projectId = vm.project.projectId;
              var studentId = assignment.student.studentId;

              AssignmentFactory.deleteAssignment(studentId, projectId).then(
                function(){
                    var index = vm.project.assignments.indexOf(assignment);
                    vm.project.assignments.splice(index, 1);

                },
                function(){
                    toastr.error('Error deleting assigned student', 'Error');
                });
            }
    } // ProjectDetailController()
})();