angular.module('starter.controllers', ['starter.services'])

    .controller('AppCtrl', function($scope, $ionicModal, $timeout, Beacon) {
        localDB.sync(remoteDB, {live: true, retry: true})
            .on('error', function (err) {
                console.log("Syncing stopped in AppCtrl");
                console.log(err);
            })
            .on('paused', function () {
                console.log("Syncing paused in AppCtrl");
            })
            .on('active', function () {
                console.log("active in AppCtrl");
            })
            .on('denied', function (info) {
                console.log("User denied in AppCtrl");
                console.log(info);
            });
        $scope.phase = 0;

        $scope.major = 0;
        $scope.minor = 0;
        $scope.uuid = 0;

        $scope.beaconForm = {};

        $scope.startScanning = function(){
            $scope.phase = 1;
            Beacon.setCallback($scope.callback);
            Beacon.startRanging();
        };

        $scope.stopScanning = function(){
            $scope.phase = 0;
            Beacon.stopRanging();
        };

        $scope.callback = function(plugin){
            $scope.$apply(function(){
                Beacon.stopRanging();
                $scope.phase = 2;
                $scope.major = plugin.beacons[0].major;
                $scope.minor = plugin.beacons[0].minor;
                $scope.uuid = plugin.beacons[0].uuid;
            });
        };

        $scope.foundBeacon = function(){
            console.log("I am the callback!");
            Beacon.stopRanging();
        };

        $scope.helloBeaconScanner = function(){
            Beacon.setCallback($scope.foundBeacon);
            Beacon.startRanging();
        };


        // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})



    .controller('FlyersCtrl', function($scope, Beacon, $interval, FlyerService, PouchDBListener) {
        $scope.showAd = false;

        $scope.checkBeacon = function(){
            console.log("Checking beacon status");
            $scope.showAd = Beacon.getStatus() === 1;
        };
        $interval(function(){$scope.checkBeacon();}, 2000);


        $scope.$root.enableRight = false;

        $scope.$on('$stateChangeStart', function() {
            $scope.$root.enableRight = true;
        });

        $scope.shouldShowDelete = false;
        $scope.shouldShowReorder = false;
        $scope.listCanSwipe = true;


        $scope.flyers = FlyerService.getFlyers();

        $scope.$on('add', function(event, flyer) {
            console.log('a ADD caught');
            FlyerService.addFlyer(flyer);
        });

        $scope.$on('delete', function(event, id) {
            console.log('a DELETE caught');
            FlyerService.deleteFlyer(id);
        });

        $scope.delete = function(task) {
            localDB.get(task._id, function (err, doc) {
                localDB.remove(doc, function (err, res) {});
            });
        };
    })

.controller('FlyerCtrl', function($scope, FlyerService, $stateParams) {
        $scope.flyer = FlyerService.getFlyer($stateParams.flyerId)
    });


