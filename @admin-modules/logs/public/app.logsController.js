(function() {

    app.factory('socket', ['$rootScope', function($rootScope) {
        var socket = io.connect();
        socket.on('disconnect', function() {
            $window.location.reload();
        });
        return {
            on: function(eventName, callback) {
                socket.on(eventName, function() {
                    var args = arguments;
                    $rootScope.$apply(function() {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function(eventName, data, callback) {
                socket.emit(eventName, data, function() {
                    var args = arguments;
                    $rootScope.$apply(function() {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            }
        };
    }]);


    app.controller('logsController', ['$scope', '$rootScope', 'socket', '$sce', '$window', function($scope, $rootScope, socket, $sce, $window) {
		
      	$scope.logdata = '...';	
      
        socket.on('logs', function(data) {
            $scope.logdata = $sce.trustAsHtml(data);
            $window.scrollTo(0, document.body.scrollHeight);

        });

    }]);

})();
