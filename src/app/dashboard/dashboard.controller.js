(function() {
    'use strict';

    angular
        .module('app')
        .controller('DashController', DashController);

    DashController.$inject = 
        [
            'StudentFactory', 
            'ProjectFactory', 
            'AssignmentFactory', 
            '$stateParams',
            'toastr'
        ];

    /* @ngInject */
    function DashController(StudentFactory, ProjectFactory, AssignmentFactory, $stateParams, toastr) { 

        var vm = this; //jshint ignore:line

        vm.students = [];
        vm.projects = [];
        vm.assignments = [];

        var dashData = {};

        activate();

        ////////////////

        function activate() {
            // initializing function automatically getting data when page loads.   
            StudentFactory.getAllStudents().then(
                function(response) {
                    console.log(response);
                    vm.students = response;
            });

            ProjectFactory.getAllProjects().then(
                function(response){
                    console.log(response);
                    vm.projects = response;
            });

            AssignmentFactory.getAllAssignments().then(
                function(response) {
                    console.log(response);    
                    vm.assignments = response;
            });
        }
    }
})();