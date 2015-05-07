angular.module('starter.services', ['ngResource'])

    .service('BeaconService', function(Beacon){
        var beaconsInformation = [];

       var getBeaconInfo = function(){
           console.log()
           return beaconsInformation;

       }
        return {
            getBeaconInfo: getBeaconInfo
        };

    })

    .service('FlyerService', function (PouchDBListener) {
        var flyers1 = [];
        var adds1 = [];
        var storeName = "target";

        var addFlyer = function(flyer) {
            console.log('confirmed push')
            flyers1.push(flyer)
        }

        var deleteFlyer = function(id){
            for(var i = 0; i < flyers1.length; i++) {
                if(flyers1[i]._id === id) {
                    console.log('confirmed deletion')
                    flyers1.splice(i, 1);
                }
            }
        }

        var getAdds = function(){
            for(var i = 0; i < flyers1.length; i++) {
                if(flyers1[i].store === "target") {
                    console.log('this advertisement belongs to target')
                    adds1.push(flyers1[i]);
                }
            }
            return adds1
        }

        var getFlyers = function(){

            //it wont work in this function :/
            return flyers1;
        }

        var getFlyer = function(flyerId){
            for(var i = 0; i < flyers1.length; i++) {
                if(flyers1[i]._id === flyerId) {
                    return flyers1[i];
                }
            }
        }

        return {
            getAdds: getAdds,
            addFlyer: addFlyer,
            deleteFlyer: deleteFlyer,
            getFlyers: getFlyers,
            getFlyer: getFlyer
        };
    });