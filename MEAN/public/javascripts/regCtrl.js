app.controller('regCtrl', function($scope, $http){
    $scope.regName = '';
    $scope.regPw = '';
    $scope.confirmPw = '';
    $scope.errorMsg = '';

    $scope.btnDisabled = function(){
        if($scope.regName == '' || $scope.regPw == '' || $scope.confirmPw == ''){
            $scope.errorMsg = '';
            return true;
        }else if($scope.confirmPw != $scope.regPw){
            $scope.errorMsg = 'Two passwords are not the same!';
            return true;
        }else{
            $scope.errorMsg = '';
            return false;
        }
    };
    $scope.regUser = function(){
        var data = {
            Username: $scope.regName,
            Password: $scope.regPw
        };
        $http.post('/api/users/Register', data).success(function(response){
            if(response.Success){
                location.replace('/');
            }else{
                alert(response.Message);
                location.reload();
            }
        });
    };
});