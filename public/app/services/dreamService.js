/**
 * Created by mitrikyle on 4/2/16.
 */

angular.module('dreamService', [])

.factory('Dream', function($http) {
        // create a new object
        var dreamFactory = {};

        // get all dreams
        dreamFactory.all = function() {
            return $http.get('/api/dreams/');
        };

        // create a new dream
        dreamFactory.create = function(dreamData) {
            return $http.post('/api/dreams/', dreamData);
        };

        //upvote a dream
        dreamFactory.upvote = function(id) {
            return $http.put('/api/dreams/upvote/' + id);
        };

        //downvote a dream
        dreamFactory.downvote = function(id) {
            return $http.put('/api/dreams/downvote/' + id);
        };

        // return our entire dreamFactory object
        return dreamFactory;

    });