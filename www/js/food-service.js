angular.module('food.service', [])
    .factory('Food', function($resource) {
	return $resource('http://Terminus:3001/foods/:id');
    })
