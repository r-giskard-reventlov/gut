angular.module('starter.controllers', [])

    .controller('DashCtrl', function($scope) {})

    .controller('ChronologyCtrl', function($scope, Camera, $state) {
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
	$scope.navigateAddEventFoodForm = function() {
	    $state.go('tab.event-entry');
	};
	
	$scope.events = [
	    {
		id: 1,
		time: "24/12/1982 10:50:32",
		type: "EATEN",
		food: "Beef burger"
	    },
	    {
		id: 2,
		time: "25/12/1982 08:30:32",
		type: "EATEN",
		food: "Pizza"
	    },
	    {
		id: 3,
		time: "26/12/1982 15:12:45",
		type: "EATEN",
		food: "Beef burger"
	    },
	    {
		id: 4,
		time: "27/12/1982 12:40:32",
		type: "EATEN",
		food: "Cheese"
	    }
	];

    })

    .controller('ChatDetailCtrl', function($scope, $stateParams) {})

    .controller('EventCtrl', function($scope, Food) {
	$scope.event = {
	    id: 1,
	    time: "24/12/1982 10:50:32",
	    type: "EATEN",
	    food: "Beef burger"
	};

	$scope.searchFood = function(food) {
	    //alert('change');
	    console.log('searching for food: ' + food);
   	    $scope.foods = Food.query();
	    /*
	    $http.get('data.json').success(function(data, status, headers, config) {
		$scope.items = data.data;
	    }).error(function(data, status, headers, config) {
		console.log("No data found..");
	    });
	    */
	};

	
	$scope.addEvent = function(event) {
	    console.log('added event');
	};

	$scope.remove = function(event) {
	    alert('test remove');
	};
    })

    .controller('AccountCtrl', function($scope) {});


