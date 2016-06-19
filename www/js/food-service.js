angular.module('food.service', [])
    .factory('Food', function($resource) {
	return $resource('http://Terminus:3000/foods/:id');//, {food: '@id'});
    })
