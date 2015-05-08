// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var localDB = new PouchDB('ads');
var remoteDB = new PouchDB('http://54.149.42.95:5984/ads', {cache : false});

angular.module('starter', ['ionic', 'starter.controllers'])

    .factory('PouchDBListener', ['$rootScope', function($rootScope) {
        localDB.changes({
            live: true,
            continuous: true,
            onChange: function(change) {
                if (!change.deleted) {
                    $rootScope.$apply(function() {
                        localDB.get(change.id, function(err, doc) {
                            $rootScope.$apply(function() {
                                if (err) console.log(err);
                                $rootScope.$broadcast('add', doc);
                            })
                        });
                    })
                } else {
                    $rootScope.$apply(function() {
                        $rootScope.$broadcast('delete', change.id);
                    });
                }
            }
        });

        return true;

    }])
    .factory("Beacon", function(){
        var beacon = {};

        beacon.beaconRegion = null;
        beacon.delegate = null;
        beacon.status = 0;
        beacon.proximity = "not detected";

        beacon.helloWorld = function(){
            //console.log("HELLO WORLD!");
        };

        beacon.startedMonitoring = function(plugin){
            //console.log("I am inside of the beacon monitoring");

        };

        beacon.getProximity = function(){
            console.log("getting beacon proximity state");
          return beacon.proximity;
        };

        beacon.getStatus = function(){
            //console.log("The beacon status is " + beacon.status);
            return beacon.status;
        };

        beacon.didstartRanging = function(plugin){
            if(plugin.beacons[0].proximity == "ProximityImmediate"){
                console.log("found a beacon thats Immediate!");
                beacon.status = 1;
                beacon.proximity = "Immediate";
            } else if (plugin.beacons[0].proximity == "ProximityNear"){
                console.log("found a beacon thats nearby!");
                beacon.status = 1;
                beacon.proximity = "Nearby";
            } else {
                console.log("beacon is not close enough");
                beacon.status = 0;
                beacon.proximity = "far away";
            }

        };

        beacon.didEnterRegion = function(plugin){
            console.log("Hello, from beacon!");
            beacon.status = 1;
        };

        beacon.didExitRegion = function(plugin){
            console.log("Goodbye, from beacon!");
            beacon.status = 0;
        };

        return beacon;
    })


.run(function(Beacon,$ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }






var delegate = new cordova.plugins.locationManager.Delegate();

delegate.didDetermineStateForRegion = function (pluginResult) {

    cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
        + JSON.stringify(pluginResult));
};

delegate.didStartMonitoringForRegion = function (pluginResult) {
    console.log(JSON.stringify(pluginResult));
    console.log("attempting to monitor");
    Beacon.startedMonitoring(pluginResult);
};

delegate.didRangeBeaconsInRegion = function (pluginResult) {
    console.log("In Region");
    console.log(JSON.stringify(pluginResult));
    Beacon.didstartRanging(pluginResult);
};

delegate.didEnterRegion = function(pluginResult) {
    console.log("entered region");
    Beacon.didEnterRegion(pluginResult);
};

delegate.didExitRegion = function(pluginResult){
    Beacon.didExitRegion(pluginResult);
};

var uuid = '2F234454-CF6D-4A0F-ADF2-F4911BA9FFA6'; // mandatory
var identifier = 'radbeacon'; // mandatory
//var minor = 0; // optional, defaults to wildcard if left empty
//var major = 0; // optional, defaults to wildcard if left empty

// throws an error if the parameters are not valid
var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid);

cordova.plugins.locationManager.setDelegate(delegate);

cordova.plugins.locationManager.requestWhenInUseAuthorization();
/*
cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
    .fail(console.error)
    .done();
    */


 cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
 .fail(console.error)
 .done();

    });


})

.controller('control',function($scope,Beacon,$interval){
    /*
     $scope.button = {
     text: "Start Monitoring",
     status: 0, //0 for off, 1 for on
     icon: "ion-eye",
     };
     */


    $scope.showAd = false;

    $scope.checkBeacon = function(){
        if(Beacon.getStatus() == 1){
            $scope.showAd = true;
        }
        else{
            $scope.showAd = false;
        }
    };

    $interval(function(){$scope.checkBeacon();}, 2000);
    /*
     $scope.pushButton = function(){
     if($scope.button.status == 0){
     $scope.button.status = 1;
     $scope.button.text = "Stop Monitoring";
     $scope.button.icon = "ion-eye-disabled";

     //start beacon
     }else{
     $scope.button.status = 0;
     $scope.button.text = "Start Monitoring";
     $scope.button.icon = "ion-eye";
     }
     };
     */
})




//states

 .config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

      .state('app', {
          url: "/app",
          abstract: true,
          templateUrl: "templates/menu.html",
          controller: 'AppCtrl'
      })

      .state('app.flyers', {
          url: "/adds",
          views: {
              'menuContent': {
                  templateUrl: "templates/adds.html",
                  controller: 'FlyersCtrl'
              }
          }
      })

      .state('app.flyer', {
          url: "/adds/:flyerId",
          views: {
              'menuContent': {
                  templateUrl: "templates/add.html",
                  controller: 'FlyerCtrl'
              }
          }
      })

      .state('app.beacon', {
          url: "/beacon",
          views: {
              'menuContent': {
                  templateUrl: "templates/sessions.html",
                  controller: 'beaconCtrl'
              }
          }
  });
  // if none of the above states are matched, use this as the fallback
 $urlRouterProvider.otherwise('/app/adds');
});


