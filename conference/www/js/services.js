angular.module('starter.services', ['ngResource'])

/* .factory('Session', function ($resource) {
    return $resource('http://localhost:5000/sessions/:sessionId');
}); */
.factory('Add', function ($resource) {
    return $resource('http://localhost:5000/adds/:addId');
});
