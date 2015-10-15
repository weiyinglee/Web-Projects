app.controller('blogCtrl', function($scope, $http){

    $scope.posting = '';
    $scope.edit_content = '';
    $scope.show = false;

    $http.get('/api/users/login_status').success(function(response){
        if(response.Name != '') {
            $scope.name = response.Name;
        }
    });

    $http.get('/api/users/users_posts').success(function(response){
        $scope.post = response;
    });

    $scope.edit = function(id){
        $scope.show = true;
        $http.get('/api/users/users_posts/' + id).success(function(response){
            $scope.editPost = response;
            $scope.edit_content = response.Content;
        });

    };
    $scope.postMsg = function(){

        var data = {
            Content: $scope.posting
        };

        $http.post('/api/users/post_data', data).success(function(response){
            location.reload();
        });
    };
    $scope.postDel = function(id) {
        $http.delete('/api/users/post_data/' + id).success(function (response) {
            location.reload();
        });
    };
    $scope.update = function(id){

        var data = {
            Content: $scope.edit_content
        };

        $http.put('/api/users/post_data/' + id, data).success(function(response){
            location.reload();
        });
    };
});
