(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProjectGridController', ProjectGridController);

    ProjectGridController.$inject = [
        'toastr',
        'ProjectFactory'
    ];

    /* @ngInject */
    function ProjectGridController(toastr, ProjectFactory) { //AssignmentFactory
        var vm = this;
        
        vm.project = [];
        vm.deleteProject = deleteProject;

        activate();        

        function activate() {
            // Initiates the student list from the dB server
            ProjectFactory.getAllProjects().then(
                function(data) {
                    vm.projects = data;
                },
                function(error) {
                    toastr.error('Error getting project list', 'Error');
                });
        }

        ///////// DELETE --> deleteProject()  //////////

        // Removes the user input from the project list
        function deleteProject(project) {
            vm.saving = true; 

            ProjectFactory.deleteProject(project).then(
                function() {
                    vm.saving = false;
                    toastr.success('Successfully removed project', 'Deleted');
                    // Call getAllProjects() ensure databae in sync 
                    ProjectFactory.getAllProjects().then(
                        function(data) {
                            vm.projects = data;
                        },
                        function(error) {
                            toastr.error('Error getting project list', 'Error');
                        });
                },
                function() {
                    toastr.error('Error deleting project', 'Error');
                }
            ); // ProjectFactory.deleteProject()
        } // deleteProject()               
    }
})();
