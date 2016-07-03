angular.module('starter.controllers', [])

    .controller('DashCtrl', function($scope) {})

    .controller('ChronologyCtrl', function($scope, Chronology, $state) {
	
	// TODO : use an array to provide the order of the events,
	// also use an object to store each event as a property
	$scope.chronology = Chronology.get({id: 1});

	$scope.remove = function(event) {
	    console.log('request to remove event: ' + JSON.stringify(event));
	    c = Chronology.get({id: 1}, function() {
		eventIndex = _findEventIndexById(c, event);
		c.events.splice(eventIndex, 1);
		Chronology.save(c);
		$scope.chronology = c;
	    });
	};
	
	$scope.navigateAddEventFoodForm = function() {
	    $state.go('tab.event-food-search');
 	};

	// TODO : remove in favour of a object, need to also use an
	// array to provide order of events
	function _findEventIndexById(chronology, event) {
	    console.log(chronology);
	    for(i=0; i<chronology.events.length; i++) {
		e = chronology.events[i];
		console.log(e);
		if(e.id == event.id) {
		    return i;
		} 
	    }
	    return -1;
	}
    })

    .controller('ChatDetailCtrl', function($scope, $stateParams) {})

    .controller('EventFoodSearchCtrl', function($scope, Food, $state) {
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

	$scope.food = "";
	

	$scope.selectFood = function(food) {
	    console.log('selected food: ' + JSON.stringify(food));
	    $state.go('tab.event-food-confirm', { foodId: food.id });
	    
	};

	$scope.getFoods = function(food) {
	    console.log('searching for food: ' + food);
   	    $scope.foods = Food.query();
	};
    })

    .controller('EventFoodConfirmCtrl', function($scope, $stateParams, Food, Chronology, $state, uuid) {
	console.log('test.. food controller init, params [' + JSON.stringify($stateParams) + ']');
	console.log('food id: ' + $stateParams.foodId);
	
	$scope.food = Food.get({id: $stateParams.foodId});

	$scope.addEventToChronology = function() {
	    var c = Chronology.get({id: 1}, function() {
		e = {};
		e.id = uuid.v4();//guid(); //c.events.length + 1;
		e.foodId = $scope.food.id;
		e.foodDescription = $scope.food.name;
		c.events[c.events.length] = e;
		c.$save().then(function() {
		    $state.go('tab.chronology', {}, { reload: true });
		});
	    });
	};
    })

    .controller('AccountCtrl', function($scope) {})
;


