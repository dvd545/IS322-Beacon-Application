angular.module('starter.services', ['ngResource'])

/* .factory('Session', function ($resource) {
    return $resource('http://localhost:5000/sessions/:sessionId');
}); */
.factory('Add', function ($resource) {
    return $resource('http://localhost:5000/adds/:addId');
})

/*.factory('Flyer', function($resource){
    return $resource('http://54.149.42.95:8080/flyers/:flyerId');
});*/