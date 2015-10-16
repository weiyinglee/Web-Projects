//Controller for blog
app.controller('blogCtrl', function($scope, $http){

    $scope.post_title = '';
    $scope.post_msg = '';
    $scope.postError = false;
    $scope.postErrorMsg = '';
    $scope.comment = '';
    $scope.preCount = 0;
    $scope.myCount = 0;

    $http.get('/users/user_posts').success(function(response){
        $scope.blogList = response;
    });

    $http.get('/users/my_posts').success(function(response){
        $scope.myBlogList = response;
    });

    $scope.addPost = function(){
        //check if the content is empty
        if($scope.post_title == '' || $scope.post_msg == ''){
            $scope.postError = true;
            $scope.postErrorMsg = 'Fields can not be empty!';
        }else{
            //POST data into DB
            var data = {
                PostTitle: $scope.post_title,
                Message: $scope.post_msg
            };
            $http.post('/users/Posts/post', data).success(function(){
                location.reload();
            });
        }
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