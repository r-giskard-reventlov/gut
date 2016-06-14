angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('SnapCtrl', function($scope, Camera) {
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

    $scope.test = [1, 2, 3];
})

.controller('ChatDetailCtrl', function($scope, $stateParams) {})

.controller('AccountCtrl', function($scope) {});
