(function() {
    'use strict';

    angular
        .module('app', [ 
        	'ui.router',
            'ngAnimate',
            'toastr',
            'ngBootbox'
        ])
        // Create config function w/router & state providers allowing API transmission. 
        .config(appConfig);

    appConfig.$inject = [ "$urlRouterProvider", "$stateProvider"];


        // Configure application's pages with route & stateprovider.
        function appConfig($urlRouterProvider, $stateProvider) { 
            // Set root url to default
        	$urlRouterProvider.otherwise('dashboard');

            // Create 5 different states representing 5 separate html pages in addition to the index.html.
        	$stateProvider


    /////// DASHBOARD STATE  ////////
    
        		// Dashboard page
        		.state('dashboard', {
        			url: '/dashboard',
        			controller: 'DashController as dashboard',
        			templateUrl: '/app/dashboard/dashboard.html'
        		})


    ///////// STUDENT STATE  /////////

        		// Student parent page
        		.state('student', {
        			url: '/student',
        			abstract: true,
        			template: '<div ui-view></div>'
        		})
	        		// Student grid page
	        		.state('student.grid', {
	        			url: '/grid',
	        			controller: 'StudentGridController as studentGrid',
	        			templateUrl: '/app/student/student.grid.html'
	        		})
	        		// Student detail page
	        		.state('student.detail', {
	        			url: '/detail?studentId',
	        			controller: 'StudentDetailController as studentDetail',
	        			templateUrl: '/app/student/student.detail.html'
	        		})


    /////////// PROJECT STATE  ///////////

        		// Project parent page
        		.state('project', {
        			url: '/project',
        			abstract: true,
        			template: '<div ui-view></div>'
	        	})
	        		// Project grid page
	        		.state('project.grid', {
	        			url: '/grid',
        				controller: 'ProjectGridController as projectGrid',
	        			templateUrl: '/app/project/project.grid.html'
	        		})
	        		// Project detail page
	        		.state('project.detail', {
	        			url: '/detail?projectId',
	        			controller: 'ProjectDetailController as projectDetail',
	        			templateUrl: '/app/project/project.detail.html'
	        		});
        }
})();