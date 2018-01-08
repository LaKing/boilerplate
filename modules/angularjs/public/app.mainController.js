(function() {

    app.controller('mainController', ['$scope', '$http', '$rootScope', 'socket', 'alertService', 'session', '$window', function($scope, $http, $rootScope, socket, alertService, session, $window) {

        session.load();

        $scope.action = function() {
            session.save();
            alertService.add('success', 'Saved in action.');
        };

        $scope.termekek = {};
        $scope.rendeles = {};

        // json betöltés socket.io nélkül, sima get requestként
        $http.get('/valami.json')
            .then(function(res) {
                $scope.termekek = res.data;
                console.log("valami:", $scope.termekek);
            }, function errorCallback(response) {
                console.log("error", response);
                alert("Hálózati hiba! ?");
            });

    }]);

})();
