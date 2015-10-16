//Controller for login
app.controller('logCtrl', function($scope, $http){

    $scope.log_name = '';
    $scope.log_pw = '';
    $scope.error = false;
    $scope.errorMsg = '';

    $scope.logIn = function(page) {

        function refresh(){
            $scope.log_name = '';
            $scope.log_pw = '';
        }

        if($scope.log_name == '' || $scope.log_pw == '') {
            $scope.error = true;
            $scope.errorMsg = 'Information must be not completed! Try again!';
            //refreshing
            refresh();

        }else{
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
                    $scope.error = true;
                    $scope.errorMsg = 'Invalid username/email or password, please try again!';
                    //refreshing
                    refresh();
                }
            });
        }
    };
});