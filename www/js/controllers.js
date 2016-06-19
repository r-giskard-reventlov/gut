angular.module('starter.controllers', [])

    .controller('DashCtrl', function($scope) {})

    .controller('ChronologyCtrl', function($scope, Chronology, $state) {
        /*	
        $scope.takePicture = function (options) {
	    var options = {
		quality : 75,
		targetWidth: 200,
		targetHeight: 200,
		sourceType: 1
	    };
	    Camera.getPicture(options).then(
		function(imageData) {
		    $scope.picture = imageData;;
		},
		function(err) {
		    console.log(err);
		}
	    );
	};
        */
	console.log('chronology controller called');

	$scope.chronology = Chronology.get({id: 1});
	$scope.$on('chronology:changed', function() {
	    $scope.chronology = Chronology.get({id: 1});
	    // code to run each time view is entered
	});
	/*
	var c = Chronology.get({id: 1}, function() {
	    $scope.events = c.events;
	    console.log('viewing events: ' + JSON.stringify(c.events));
	});
	*/

	$scope.remove = function(event) {
	    console.log('request to remove event: ' + JSON.stringify(event));
	};
	
	$scope.navigateAddEventFoodForm = function() {
	    $state.go('tab.event-food-search');
 	};
    })

    .controller('ChatDetailCtrl', function($scope, $stateParams) {})

    .controller('EventFoodSearchCtrl', function($scope, Food, $state) {
	$scope.selectFood = function(food) {
	    console.log('selected food: ' + JSON.stringify(food));
	    $state.go('tab.event-food-confirm', { foodId: food.id });
	    
	};

	$scope.getFoods = function(food) {
	    console.log('searching for food: ' + food);
   	    $scope.foods = Food.query();
	};
    })

    .controller('EventFoodConfirmCtrl', function($scope, $stateParams, Food, Chronology, $state) {
	console.log('test.. food controller init, params [' + JSON.stringify($stateParams) + ']');
	console.log('food id: ' + $stateParams.foodId);
	
	$scope.food = Food.get({id: $stateParams.foodId});

	$scope.addEventToChronology = function() {
	    var c = Chronology.get({id: 1}, function() {
		console.log('chronology: ' + JSON.stringify(c));
		console.log('events: ' + JSON.stringify(c.events));
		console.log('event 1: ' + JSON.stringify(c.events[0]));
		e = {};
		e.eventId = c.events.length + 1;
		e.foodId = $scope.food.id;
		e.foodDescription = $scope.food.name;
		c.events.push(e);
		console.log('chronology after add: ' + JSON.stringify(c));
		console.log('adding food: ' + JSON.stringify($scope.food) + ' to chronology');
		c.$save().then(function() {
		    $scope.$emit('chronology:changed');
		    $state.go('tab.chronology', {}, { reload: true });
		});
	    });
	};
    })

    .controller('AccountCtrl', function($scope) {})
;


