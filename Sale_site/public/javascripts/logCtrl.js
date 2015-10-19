//Controller for login
app.controller('logCtrl', function($scope, $http){

    $scope.username = '';
    $scope.login = false;
    $scope.log_name = '';
    $scope.log_pw = '';

    $http.get('/users/login_status').success(function(response){
        $scope.username = response.username;
        $scope.login = response.login;
    });

    $scope.logIn = function() {

        var data = {
            Username: $scope.log_name,
            Password: $scope.log_pw
        };

        $http.post('/users/Authentication/login', data).success(function (response) {
            if (response.login) {
                $scope.username = response.username;
                $scope.login = response.login;
                location.replace('/blog');
            } else {
                alert(response.Message);
                location.reload();
            }
        });
    }
});