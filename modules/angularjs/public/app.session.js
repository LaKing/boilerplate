(function() {

    app.factory('session', ['$http', '$rootScope', 'socket', 'alertService', function($http, $rootScope, socket, alertService) {
        $rootScope.session = {};
        var session = {};
        session.load = function() {
            console.log("@session load");
            $http.get('/session')
                .then(function(res) {
                    $rootScope.session = res.data;
                    console.log("@load session-data:", $rootScope.session);
                    //alertService.add('success', 'session.load get-session-data');
                    // open the socket if the user is logged in
                    if ($rootScope.session.passport)
                        if ($rootScope.session.passport.user !== undefined) {
                            socket.connect();
                        }
                }, function errorCallback(response) {
                    console.log("error", response);
                    alert("Network error");
                });
        };

        session.save = function() {
            if (!$rootScope.session.data) return console.log("no session data");
            $http.post('/session-data', $rootScope.session.data)
                .then(function(res) {
                    console.log("post-session-data:", $rootScope.session.data);
                    //alertService.add('success', 'session.save post-session-data');
                }, function errorCallback(response) {
                    console.log("error", response);
                    alert("Network error");
                });
        };
        return session;
    }]);

})();