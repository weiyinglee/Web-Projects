//Controller for blog
app.controller('blogCtrl', function($scope, $http){

    $scope.username = '';
    $scope.login = false;
    $scope.post_title = '';
    $scope.post_msg = '';
    $scope.comment = '';
    $scope.preCount = 0;
    $scope.myCount = 0;

    $http.get('/users/login_status').success(function(response){
        $scope.username = response.username;
        $scope.login = response.login;
    });

    $http.get('/users/user_posts').success(function(response){
        $scope.blogList = response;
    });

    $http.get('/users/my_posts').success(function(response){
        $scope.myBlogList = response;
    });

    $scope.addPost = function(){
        //POST data into DB
        var data = {
            PostTitle: $scope.post_title,
            Message: $scope.post_msg
        };
        $http.post('/users/Posts/post', data).success(function(){
            location.reload();
        });
    };

    $scope.commentPost = function(id){

        var data = {
            Comment: $scope.comment
        };

        $http.post('/users/Posts/comment/' + id, data).success(function(response){
            location.reload();
        });
    };



});