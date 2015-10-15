app.controller('logCtrl', function($scope, $http){

    $scope.name = 'There';

    $http.get('/api/users/login_status').success(function(response){
        $scope.login = response.login;
        if($scope.login) {
            $scope.name = response.Name;
        }
    });

    $scope.userName = '';
    $scope.userPw = '';

    $scope.logUser = function(){
        var data = {
            Username: $scope.userName,
            Password: $scope.userPw
        };
        $http.post('/api/users/Authentication', data).success(function(response){
            if(response.Success){
                location.replace('/');
            }else{
                alert(response.Message);
                location.reload();
            }
        });
    };
});
