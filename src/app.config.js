'use strict';

module.exports = function (app) {
	app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
			$urlRouterProvider.otherwise('/'); //url invalid => redirect page /

			$stateProvider
				.state('index', {
					url: '/',
					template: require('./page/home.template.html'),
					controller: 'homeController'
				})
				.state('home', {    // Định ngĩa 1 state home
					url: '/home',  // khai báo Url hiển thị
					template: require('./page/home.template.html'),  // đường dẫn view
					controller: 'homeController'
				})
				.state('about', {
					url: '/about',
					template: require('./page/about.template.html'),
					controller: 'aboutController'
				})
				.state('contact', {
					url: '/contact',
					template: require('./page/contact.template.html'),
					controller: 'contactController'
				});
			/*	.state('/logout',{
			 url: '/contact',
			 templateUrl: 'page/contact.template.html',
			 controller: 'contactController',
			 resolve:{
			 $cookie.remove('token');
			 window.location.href = '/';
			 }
			 });*/

			$locationProvider.html5Mode(true);
		}
	);
};