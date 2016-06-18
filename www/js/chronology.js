angular.module('chronology.service', [])
    .factory('Chronology', function($resource) {
	return $resource('http://localhost:3001/chronology/:id');
    })
