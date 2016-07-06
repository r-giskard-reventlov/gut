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

    .controller('EventFoodScanCtrl', function(Camera, $scope) {

	$scope.obj = {};
	
	var options = {
	    quality : 75,
	    targetWidth: 200,
	    targetHeight: 200,
	    sourceType: 1,
	    destinationType: 1,
	    encodingType: 0
	};
	Camera.getPicture(options).then(
	    function(imageUrl) {
		$scope.pictureOfLabel = imageUrl;
	    },
	    function(err) {
		console.log(err);
	    }
	);

	// do POST on upload url form by http / html form
	$scope.update = function(obj) {
	    //if (!$scope.data.uploadurl)
	    //{
		// error handling no upload url
	    //	return;
	    //}
	    if (!$scope.pictureOfLabel)
	    {
		// error handling no picture given
		return;
	    }
	    var options = new FileUploadOptions();
	    options.fileKey="ffile";
	    console.log($scope.pictureOfLabel);
	    options.fileName=$scope.pictureOfLabel.substr($scope.pictureOfLabel.lastIndexOf('/')+1);
	    options.mimeType="image/jpeg";
	    var params = {};
	    params.foodName = obj.foodName; // some other POST fields
	    options.params = params;

	    //console.log("new imp: prepare upload now");
	    var ft = new FileTransfer();
	    ft.upload(
		$scope.pictureOfLabel,
		//encodeURI($scope.data.uploadurl),
		encodeURI("http://localhost/gut/food"),
		function(r) {
		    console.log("upload success");
		},
		function(error) {
		    console.log("upload error source " + error.source);
		    console.log("upload error target " + error.target);
		},
		options
	    );

	    
	};

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
	
    })

    .controller('EventFoodSearchCtrl', function(Camera, $scope, Food, $state) {
	$scope.food = "";

	$scope.navigateScanFood = function() {
	    $state.go('tab.event-food-scan');
 	};

	$scope.selectFood = function(food) {
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


