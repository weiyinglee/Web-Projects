//Controller for register
app.controller('regCtrl', function($scope, $http){

    $scope.reg_email = '';
    $scope.reg_name = '';
    $scope.reg_pw = '';
    $scope.confirm_pw = '';
    $scope.error = false;
    $scope.errorMsg = '';

    $scope.reg = function(){

        function refresh(){
            $scope.reg_email = '';
            $scope.reg_name = '';
            $scope.reg_pw = '';
            $scope.confirm_pw = '';
        }

        //check if there is content in fields
        if($scope.reg_email == '' || $scope.reg_name == ''
            || $scope.reg_pw == '' || $scope.confirm_pw == ''){

            $scope.error = true;
            $scope.errorMsg = 'Information must be completed! Please Try again!';
            //refreshing
            refresh();
        }
        //check if two passwords are same
        else if($scope.reg_pw != $scope.confirm_pw){

            $scope.error = true;
            $scope.errorMsg = 'Two passwords are not the same, please try again!';
            //refreshing
            refresh();
        }
        else{

            var invalid = false; //determine if the user is good to register

            //check if the user is already existed, if not, then add to DB
            $http.get('/users/users_info').success(function(response){
                for(var i = 0; i < response.length; i++) {
                    if ($scope.reg_email == response[i].Email) {
                        invalid = true;
                        $scope.error = true;
                        $scope.errorMsg = 'This email has already been used!';
                        //refresh
                        refresh();
                        break;
                    } else if ($scope.reg_name == response[i].Username) {
                        invalid = true;
                        $scope.error = true;
                        $scope.errorMsg = 'This username has already been used!';
                        //refresh
                        refresh();
                        break;
                    } else if ($scope.reg_pw == response[i].Password) {
                        invalid = true;
                        $scope.error = true;
                        $scope.errorMsg = 'The password has already been used!';
                        //refresh
                        refresh();
                        break;
                    }
                }

                //everything set, POST data
                if(!invalid){

                    var data = {
                        Email: $scope.reg_email,
                        Username: $scope.reg_name,
                        Password: $scope.reg_pw
                    };

                    $http.post('/users/Authentication/reg', data).success(function(){
                        location.replace('/blog');
                    });
                }

            });
        }
    };

});