(function() {

    app.run(function($rootScope, $location) {

        // rootscope functions and variables
        $rootScope.page = "main";
        $rootScope.pageuri = "/main.html";

        $rootScope.go2 = function(page) {
            if (page === "payment") $rootScope.pageuri = "/payment.html?u=" + Date.now();
            else $rootScope.pageuri = "/" + page + ".html";
            $rootScope.page = page;
            $location.hash(page);
        };

        $rootScope.$on('$locationChangeSuccess', function() {

            var hash = $location.hash().toLowerCase().replace(/[őóö]/ig, "o").replace(/[úűü]/ig, "u").replace(/á/ig, "a").replace(/é/ig, "e").replace(/í/ig, "i").replace(/\s+/g, '-');

            if (hash === '') return;
            if (hash.substring(0, 5) === 'admin')
                if (!$rootScope.session.is_admin) $rootScope.go2('login');
                
            $rootScope.go2(hash);
        });

        if ($location.absUrl().indexOf("/admin") > 0) $rootScope.admin = true;

    });


})();
