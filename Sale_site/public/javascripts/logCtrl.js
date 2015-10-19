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

    $scope.logIn = function(page) {

        function refresh(){
            $scope.log_name = '';
            $scope.log_pw = '';
        }

        $http.get('/users/users_info').success(function(response){

            var invalid = true; //determine if there is error on logging in or not

            for(var i = 0; i < response.length; i++){
                if($scope.log_name == response[i].Username){
                    if($scope.log_pw == response[i].Password){
                        invalid = false;
                        $http.post('/users/Authentication/login', response[i]).success(function(){
                            location.replace('/blog');
                        });
                    }
                }else if($scope.log_name == response[i].Email){
                    if($scope.log_pw == response[i].Password){
                        invalid = false;
                        $http.post('/users/Authentication/login', response[i]).success(function(){
                            location.replace('/blog');
                        });
                    }
                }
            }

            if(invalid){
                alert('Invalid Username/Email or Password! Try again!');
                refresh();
            }
        });
    }
});