angular.module('food.service', [])
    .factory('Food', function($resource) {
	return $resource('http://localhost:3000/foods/:food', {food: '@food'});
    })
