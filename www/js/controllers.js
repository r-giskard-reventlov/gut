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

	$scope.events = Chronology.query();

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

    .controller('EventFoodConfirmCtrl', function($scope, $stateParams, Food) {
	console.log('test.. food controller init, params [' + JSON.stringify($stateParams) + ']');
	console.log('food id: ' + $stateParams.foodId);
	
	$scope.food = Food.get({id: $stateParams.foodId});

	$scope.addEventToChronology = function() {
	    console.log('adding food: ' + JSON.stringify($scope.food) + ' to chronology');
	};
    })

    .controller('AccountCtrl', function($scope) {})
;


