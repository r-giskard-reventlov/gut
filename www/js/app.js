// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic',
			   'ngResource',
			   'starter.controllers',
			   'starter.services',
			   'camera.service',
			   'food.service',
			   'chronology.service',
			   'angular-uuid'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
	if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
	    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
	    cordova.plugins.Keyboard.disableScroll(true);
	}
	if (window.StatusBar) {
	    StatusBar.styleDefault(); // org.apache.cordova.statusbar required
	}
    });
})

.config(function($stateProvider, $urlRouterProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('tab', { // setup an abstract state for the tabs directive
	url: '/tab',
	abstract: true,
	templateUrl: 'templates/tabs.html'
    })
    .state('tab.dash', {     // Each tab has its own nav history stack:
	url: '/dash',
	views: {
	    'tab-dash': {
		templateUrl: 'templates/tab-dash.html',
		controller: 'DashCtrl'
	    }
	}
    })
    .state('tab.chronology', {
	url: '/chronology',
	cache: false,
	views: {
            'tab-chronology': {
		templateUrl: 'templates/tab-chronology.html',
		controller: 'ChronologyCtrl'
            }
	}
    })
    .state('tab.event-food-search', {
	url: '/chronology/event/food-search',
	cache: false,
	views: {
            'tab-chronology': {
		templateUrl: 'templates/event-food-search.html',
		controller: 'EventFoodSearchCtrl'
            }
	}
    })
    .state('tab.event-food-scan', {
	url: '/chronology/event/food-scan',
	cache: false,
	views: {
            'tab-chronology': {
		templateUrl: 'templates/event-food-scan.html',
		controller: 'EventFoodScanCtrl'
            }
	}
    })
    .state('tab.event-food-confirm', {
	url: '/chronology/event/food-confirm',
	views: {
            'tab-chronology': {
		templateUrl: 'templates/event-food-confirm.html',
		controller: 'EventFoodConfirmCtrl'
            }
	},
	params: {
	    foodId: null
	}
    })
    .state('tab.chat-detail', {
	url: '/chronology/:eventId',
	views: {
            'tab-chronology': {
		templateUrl: 'templates/event.html',
		controller: 'EventCtrl'
            }
	}
    })
    .state('tab.account', {
	url: '/account',
	views: {
	    'tab-account': {
		templateUrl: 'templates/tab-account.html',
		controller: 'AccountCtrl'
	    }
	}
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dash');
});
