angular.module('chronology.service', [])
    .factory('Chronology', function($resource) {
	return $resource('http://Terminus:3001/chronology/:id');
    })
