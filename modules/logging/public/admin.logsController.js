/*jshint esnext: true */

(function() {

    function convert_to_object(arri) {
        let log = {};
        log.r = 250;
        log.g = 250;
        log.b = 0;
        log.a = 0.8;

        log.type = arri.substring(0, 3);
        if (log.type === 'MSG') log.r = 0;
        if (log.type === 'ERR') log.g = 0;

        log.timestamp = arri.substring(4, 23);

        /*
        log.year = Number(arr[i].substring(4, 8));
        log.month = Number(arr[i].substring(9, 11));
        log.day = Number(arr[i].substring(12, 14));
        log.hour = Number(arr[i].substring(15, 17));
        log.minute = Number(arr[i].substring(18, 20));
        log.second = Number(arr[i].substring(21, 23));
        */

        log.string = arri.substring(24);

        return log;
    }

    app.controller('logsController', ['$scope', '$http', '$rootScope', 'socket', 'alertService', function($scope, $http, $rootScope, socket, alertService) {

        $scope.admin_logs = [];

        socket.on('admin-logs', function(data) {
            console.log("socket: settings", data);
            var log = convert_to_object(data);
            $scope.admin_logs.push(log);
            alertService.add('success', log.string.substring(0, 40));

        });

        $http.get('/admin-logs.json')
            .then(function(res) {

                $scope.admin_logs = [];

                //$rootScope.forms = res.data;
                //console.log("admin-logs:", res.data);
                var arr = res.data;
                for (i = 0; i < arr.length; i++) $scope.admin_logs.push(convert_to_object(arr[i]));

            }, function errorCallback(response) {
                console.log("error", response);
                alert("##&en Network-error ##&hu Hálózati hiba! ##");
            });

    }]);

})();